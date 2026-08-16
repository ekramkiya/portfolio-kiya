import { Globe2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500 text-primary-foreground shadow-sm transition-transform duration-300 group-hover:-rotate-6">
            <Globe2 className="size-5" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Web Global <span className="text-primary">Horizon</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth?returnTo=/dashboard">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <a href="/#contact">Start a project</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
