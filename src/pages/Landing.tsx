import { useMutation } from "convex/react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Braces,
  Check,
  Clock,
  Code2,
  Database,
  ExternalLink,
  Github,
  Globe,
  Landmark,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Palette,
  Send,
  Server,
  ShoppingBag,
  Sparkles,
  TerminalSquare,
  Twitter,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.09 },
  }),
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-8 bg-primary/50" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
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
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground shadow-sm transition-transform duration-300 group-hover:-rotate-6">
            E
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Ekram Kiya<span className="text-primary">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth?returnTo=/dashboard">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <a href="#contact">Hire me</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — animated terminal + floating skill chips                     */
/* ------------------------------------------------------------------ */

function useTypewriter(text: string, speed = 55, startDelay = 450) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!text) return;
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return text.slice(0, count);
}

const TERMINAL_LINES = [
  { text: "✓ Application scaffolded in 14.8s", icon: <Check className="size-3.5" /> },
  { text: "✓ 12 migrations applied · PostgreSQL connected", icon: <Check className="size-3.5" /> },
  { text: "$ php artisan serve", icon: <TerminalSquare className="size-3.5" /> },
  { text: "✓ Atelier running at http://127.0.0.1:8000", icon: <Zap className="size-3.5" /> },
];

function TerminalCard() {
  const command = "composer create-project laravel/laravel atelier";
  const typed = useTypewriter(command, 55, 500);
  const done = typed.length >= command.length;
  const [showLines, setShowLines] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setShowLines(true), 380);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <div className="relative">
      {/* layered ghost cards behind the terminal */}
      <div
        aria-hidden
        className="absolute -inset-2 -rotate-2 rounded-2xl border bg-card/60 opacity-60"
      />
      <div
        aria-hidden
        className="absolute -inset-2 rotate-1.5 rounded-2xl border bg-card/40 opacity-40"
      />

      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/5">
        <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-destructive/80" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            atelier — zsh
          </span>
        </div>
        <div className="min-h-[210px] bg-foreground/[0.025] p-5 font-mono text-[13px] leading-7">
          <p className="text-muted-foreground">
            <span className="text-primary">~/projects</span> ${" "}
            {typed}
            {!done && (
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-primary" />
            )}
          </p>
          {done &&
            showLines &&
            TERMINAL_LINES.map((line, i) => (
              <motion.p
                key={line.text}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.22 }}
                className={cn(
                  "flex items-center gap-2",
                  line.text.startsWith("$") ? "text-muted-foreground" : "text-emerald-600 dark:text-emerald-400",
                )}
              >
                {line.icon}
                {line.text}
              </motion.p>
            ))}
          {done && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}

const HERO_CHIPS: { label: string; className: string; dot: string }[] = [
  { label: "Laravel", className: "-left-3 top-10 lg:-left-10", dot: "bg-red-500" },
  { label: "React", className: "-right-2 top-4 lg:-right-8", dot: "bg-sky-400" },
  { label: "Django", className: "-right-3 bottom-24 lg:-right-12", dot: "bg-emerald-600" },
  { label: "PostgreSQL", className: "-left-2 bottom-16 lg:-left-8", dot: "bg-indigo-500" },
  { label: "Tailwind", className: "bottom-0 right-16", dot: "bg-cyan-500" },
];

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:pb-28 lg:pt-40">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2.5 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
          >
            Full-stack developer crafting{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-sky-600 bg-clip-text text-transparent">
              fast, elegant
            </span>{" "}
            web apps.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          >
            I&apos;m Ekram — a developer who ships production-grade products with
            Laravel, Django and React. From REST APIs to polished interfaces,
            I design and build web software end to end.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="gap-2">
              <a href="#projects">
                View my work
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href="#contact">
                <Send className="size-4" />
                Get in touch
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary/70" /> Remote · Worldwide
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="size-3.5 text-primary/70" /> 5+ years shipping
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="size-3.5 text-primary/70" /> Laravel · Django · React
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <TerminalCard />
          {HERO_CHIPS.map((chip, i) => (
            <motion.div
              key={chip.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
              className={cn("absolute", chip.className)}
            >
              <div
                className={cn(
                  "animate-float flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-semibold shadow-md",
                  i % 2 === 1 && "animate-float-slow",
                )}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <span className={cn("size-2 rounded-full", chip.dot)} />
                {chip.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

const MARQUEE_ITEMS = [
  "Laravel",
  "Django",
  "React",
  "Tailwind CSS",
  "PostgreSQL",
  "PHP",
  "Python",
  "JavaScript",
  "Django REST Framework",
  "SQL",
  "HTML",
  "CSS",
];

function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y bg-card/60 py-4">
      <div className="marquee-track flex w-max items-center gap-10 pr-10">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center gap-10"
          >
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground/70"
              >
                {item}
                <span className="size-1.5 rounded-full bg-primary/40" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

const SKILL_GROUPS = [
  {
    icon: Palette,
    title: "Frontend",
    description: "Interfaces that feel instant — semantic markup, fluid layouts and reactive UIs.",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    tint: "bg-primary/10 text-primary",
  },
  {
    icon: Server,
    title: "Backend",
    description: "Maintainable server code, clean architecture and battle-tested frameworks.",
    items: ["PHP", "Python", "Laravel", "Django", "Django REST Framework"],
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Database,
    title: "Data & APIs",
    description: "Relational modeling, optimized queries and APIs other teams love to consume.",
    items: ["SQL", "PostgreSQL", "REST APIs", "Migrations & Seeding"],
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
];

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="My stack"
          title="A full toolkit, end to end"
          description="Frontend to database — the technologies I reach for every day to plan, build and ship web products."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="group relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={cn(
                  "mb-5 flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  group.tint,
                )}
              >
                <group.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {group.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-secondary/60 px-3 py-1 text-xs font-medium transition-colors group-hover:border-primary/30"
                  >
                    <span className="size-1 rounded-full bg-primary/60" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    title: "Nimbus Commerce",
    tag: "E-commerce platform",
    description:
      "Headless storefront with a Laravel API, real-time inventory and a React checkout tuned for conversion.",
    tech: ["Laravel", "React", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-indigo-500 via-indigo-600 to-blue-700",
    icon: ShoppingBag,
  },
  {
    title: "Ledger API",
    tag: "Fintech REST API",
    description:
      "A Django REST Framework service handling payments, webhooks and reporting for thousands of daily transactions.",
    tech: ["Django", "DRF", "PostgreSQL", "JWT"],
    gradient: "from-teal-500 via-emerald-600 to-cyan-700",
    icon: Landmark,
  },
  {
    title: "Pulse Dashboard",
    tag: "Admin analytics",
    description:
      "A real-time operations dashboard with role-based access, rich charts and lightning-fast table queries.",
    tech: ["Laravel", "React", "Tailwind CSS", "PostgreSQL"],
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    icon: BarChart3,
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={index}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
    >
      <div
        className={cn(
          "relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br",
          project.gradient,
        )}
      >
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
        <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-black/15 blur-2xl" />
        <project.icon className="relative size-16 text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
        <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {project.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="font-medium">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4 border-t pt-4 text-sm font-medium">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary/80"
          >
            Case study
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink className="size-3.5" />
            Live demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects I&apos;m proud of"
            description="A few recent builds across e-commerce, APIs and internal tooling — each shipped to production and used by real users."
          />
          <Reveal delay={0.2} className="shrink-0">
            <Button asChild variant="outline" className="gap-2">
              <a href="#contact">
                Start a project
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

const EXPERIENCE = [
  {
    period: "2023 — Present",
    role: "Senior Full-stack Developer",
    company: "Independent / Product studio",
    description:
      "Lead engineer on production Laravel applications — payments, APIs, admin consoles and React frontends used by thousands of daily users.",
    highlight: "Laravel · React · PostgreSQL",
  },
  {
    period: "2021 — 2023",
    role: "Backend Engineer",
    company: "Fintech startup",
    description:
      "Built and scaled Django REST Framework APIs handling payments, reporting and integrations, with a focus on security and query performance.",
    highlight: "Django · DRF · PostgreSQL",
  },
  {
    period: "2019 — 2021",
    role: "Web Developer",
    company: "Digital agency",
    description:
      "Shipped client websites and internal tools — from pixel-perfect Tailwind interfaces to PHP backends and database schemas.",
    highlight: "HTML · CSS · JavaScript · PHP",
  },
];

function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Journey"
                title="Experience that ships"
                description="Years of building, breaking and shipping web software — from early freelance days to leading full product builds."
              />
              <Reveal delay={0.25}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["PHP", "Python", "Laravel", "Django", "React"].map((t) => (
                    <Badge key={t} className="font-medium">
                      <Sparkles className="size-3" />
                      {t}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <div className="relative lg:col-span-3">
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
            <div className="flex flex-col gap-8">
              {EXPERIENCE.map((entry, i) => (
                <motion.div
                  key={entry.period}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  className="relative pl-8"
                >
                  <span className="absolute left-0 top-1.5 flex size-3.5 items-center justify-center">
                    <span className="absolute size-3.5 rounded-full border-2 border-primary/40 bg-background" />
                    <span className="size-1.5 rounded-full bg-primary" />
                  </span>
                  <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary/80">
                    {entry.period}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{entry.role}</h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {entry.company}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                    {entry.description}
                  </p>
                  <span className="mt-4 inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Braces className="mr-1.5 size-3 text-primary/70" />
                    {entry.highlight}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

const CONTACT_ROWS = [
  {
    icon: Mail,
    label: "Email",
    value: "ekramkiya00@gmail.com",
    href: "mailto:ekramkiya00@gmail.com",
  },
  { icon: MapPin, label: "Location", value: "Remote · Worldwide" },
  { icon: Clock, label: "Response time", value: "Usually within 24 hours" },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "#contact" },
  { icon: Linkedin, label: "LinkedIn", href: "#contact" },
  { icon: Twitter, label: "Twitter", href: "#contact" },
];

function Contact() {
  const sendMessage = useMutation(api.contact.send);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      toast.error("Missing details", {
        description: "Please fill in your name, email and message.",
      });
      return;
    }

    setSending(true);
    try {
      await sendMessage({
        name,
        email,
        subject: subject || undefined,
        message,
      });
      toast.success("Message sent", {
        description: "Thanks for reaching out — I'll get back to you within a day.",
      });
      form.reset();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Couldn't send your message", {
        description: "Please try again in a moment.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Contact"
              title="Let&apos;s build something together"
              description="Have a product idea, a project in mind, or just want to talk shop about Laravel? My inbox is always open."
            />

            <div className="mt-8 flex flex-col gap-3">
              {CONTACT_ROWS.map((row, i) => (
                <Reveal key={row.label} delay={i * 0.08}>
                  <div className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3.5 shadow-sm">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <row.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {row.label}
                      </p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="text-sm font-semibold transition-colors hover:text-primary"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold">{row.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Follow along
                </span>
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-xl border bg-card text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    className="h-11"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    autoComplete="email"
                    className="h-11"
                    required
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="contact-subject" className="text-sm font-medium">
                  Subject <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder="Project inquiry"
                  className="h-11"
                />
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project, timeline and budget..."
                  rows={5}
                  className="min-h-32 resize-y"
                  required
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  I usually reply within 24 hours — no spam, ever.
                </p>
                <Button type="submit" size="lg" className="gap-2" disabled={sending}>
                  <Send className="size-4" />
                  {sending ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-display text-xs font-bold text-primary-foreground">
            E
          </span>
          <p className="text-sm text-muted-foreground">
            © 2026 Ekram Kiya. Crafted with Laravel thinking &amp; React energy.
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Code2 className="size-3.5 text-primary/70" />
            React · Tailwind · Convex
          </span>
          <Link to="/auth?returnTo=/dashboard" className="transition-colors hover:text-foreground">
            Inbox
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
