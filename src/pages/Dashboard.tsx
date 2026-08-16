import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import {
  Inbox,
  LogOut,
  Mail,
  MailOpen,
  MessageSquarePlus,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

import { api } from "@/convex/_generated/api";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?";
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const messages = useQuery(api.contact.list);
  const markRead = useMutation(api.contact.markRead);
  const remove = useMutation(api.contact.remove);

  const unread = messages?.filter((m) => !m.read).length ?? 0;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Portfolio inbox
            </p>
            <h1 className="mt-1 flex items-center gap-3 text-3xl font-bold tracking-tight">
              Inbox
              {unread > 0 && (
                <Badge className="rounded-full">{unread} new</Badge>
              )}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Messages sent through the contact form on your portfolio land here.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <ThemeToggle />
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          {messages === undefined &&
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="shadow-none">
                <CardContent className="px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-64" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}

          {messages && messages.length === 0 && (
            <Card className="shadow-none">
              <CardContent className="flex flex-col items-center px-6 py-16 text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MessageSquarePlus className="size-7" />
                </div>
                <h2 className="text-lg font-semibold">No messages yet</h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  When someone submits the contact form on your portfolio, their
                  message will show up here. Until then, enjoy the quiet.
                </p>
                <Button asChild variant="outline" className="mt-6 gap-2">
                  <Link to="/">Back to portfolio</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {messages?.map((message) => (
            <Card
              key={message._id}
              className={cn(
                "shadow-none transition-colors",
                !message.read && "border-primary/35 bg-primary/[0.02]",
              )}
            >
              <CardContent className="px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                        message.read
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/12 text-primary",
                      )}
                    >
                      {initialsOf(message.name)}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold">
                          {message.name}
                        </span>
                        {!message.read && (
                          <Badge variant="outline" className="border-primary/40 text-primary">
                            New
                          </Badge>
                        )}
                        <a
                          href={`mailto:${message.email}`}
                          className="truncate text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                          {message.email}
                        </a>
                      </div>
                      {message.subject && (
                        <p className="mt-1 text-sm font-medium">{message.subject}</p>
                      )}
                      <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                        {message.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-2 sm:flex-col sm:items-end sm:gap-2">
                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {format(new Date(message.createdAt), "MMM d, yyyy · h:mm a")}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer gap-1.5 text-muted-foreground"
                        onClick={() =>
                          markRead({ id: message._id, read: !message.read })
                        }
                      >
                        {message.read ? (
                          <Mail className="size-4" />
                        ) : (
                          <MailOpen className="size-4" />
                        )}
                        <span className="hidden sm:inline">
                          {message.read ? "Unread" : "Read"}
                        </span>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer gap-1.5 text-destructive hover:text-destructive"
                        onClick={() => remove({ id: message._id })}
                      >
                        <Trash2 className="size-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Inbox className="size-3.5" />
          Signed in as {user?.email ?? "guest"} · RequireAuth-protected route
        </footer>
      </div>
    </main>
  );
}
