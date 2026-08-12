import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Public: store a contact form submission from the portfolio landing page.
 */
export const send = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim().slice(0, 120);
    const email = args.email.trim().slice(0, 200);
    const subject = (args.subject ?? "").trim().slice(0, 200) || undefined;
    const message = args.message.trim().slice(0, 5000);

    if (!name || !email || !message) {
      throw new Error("Name, email and message are required.");
    }

    await ctx.db.insert("contactMessages", {
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: Date.now(),
    });
  },
});

/**
 * Protected: list contact messages, newest first. Only the signed-in owner
 * (any authenticated user on this deployment) can read the inbox.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return [];
    }
    return await ctx.db
      .query("contactMessages")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

/**
 * Protected: toggle the read state of a message.
 */
export const markRead = mutation({
  args: {
    id: v.id("contactMessages"),
    read: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    await ctx.db.patch(args.id, { read: args.read });
  },
});

/**
 * Protected: permanently delete a message.
 */
export const remove = mutation({
  args: {
    id: v.id("contactMessages"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    await ctx.db.delete(args.id);
  },
});
