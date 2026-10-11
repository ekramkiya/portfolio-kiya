import { Code2 } from "lucide-react";
import { Link } from "react-router";

import { NAV_LINKS } from "@/components/site-nav";

const EMAIL = "ekramkiya00@gmail.com";
const PHONE = "+93 775456359";
const LINKEDIN = "https://www.linkedin.com/in/ekramullah-kiya/";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-400 text-sm font-bold text-primary-foreground">
                EK
              </span>
              <span className="text-sm font-semibold tracking-tight">
                Ekramullah <span className="text-primary">Kiya</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Software Engineer &amp; Full-Stack Developer — building scalable
              SaaS applications, secure backends and optimized frontends with
              PHP, Laravel and React.js.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Explore
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
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Contact
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+93775456359"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {PHONE}
                  </a>
                </li>
                <li>
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Based in
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <span className="text-muted-foreground">
                    Kabul, Afghanistan
                  </span>
                </li>
                <li>
                  <Link
                    to="/auth?returnTo=/dashboard"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Message inbox
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Ekramullah Kiya. All rights reserved.
          </p>
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Code2 className="size-3.5 text-primary/70" />
            React · Tailwind · Convex
          </span>
        </div>
      </div>
    </footer>
  );
}
