import { Code2, Globe2 } from "lucide-react";
import { Link } from "react-router";

import { NAV_LINKS } from "@/components/site-nav";
import { SERVICES } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500 text-primary-foreground">
                <Globe2 className="size-5" />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                Web Global <span className="text-primary">Horizon</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A full-stack digital studio building web platforms, mobile apps,
              databases and AI automation for clients around the world.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Services
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services#${service.slug}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Studio
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Contact
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href="mailto:hello@webglobalhorizon.com"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    hello@webglobalhorizon.com
                  </a>
                </li>
                <li>
                  <Link
                    to="/auth?returnTo=/dashboard"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Client inbox
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Web Global Horizon. All rights reserved.
          </p>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Code2 className="size-3.5 text-primary/70" />
            React · Tailwind · Convex
          </span>
        </div>
      </div>
    </footer>
  );
}
