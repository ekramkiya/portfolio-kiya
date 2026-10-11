import { useMutation } from "convex/react";
import { motion, useScroll, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Brain,
  Briefcase,
  Check,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  HeartHandshake,
  Layers,
  Leaf,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  MessagesSquare,
  Monitor,
  Phone,
  Send,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EASE, fadeUp, Reveal, SectionHeading } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Profile data (from CV)                                              */ /* ------------------------------------------------------------------ */

const PROFILE = {
  firstName: "Ekramullah",
  lastName: "Kiya",
  fullName: "Ekramullah Kiya",
  initials: "EK",
  role: "Software Engineer & Full-Stack Developer",
  location: "Kabul, Afghanistan, 1014",
  email: "ekramkiya00@gmail.com",
  phone: "+93 775456359",
  phoneHref: "tel:+93775456359",
  linkedin: "https://www.linkedin.com/in/ekramullah-kiya/",
  summary:
    "Experienced Software Engineer with 3+ years in full-stack development, leading projects and managing teams to deliver scalable SaaS applications and dynamic web platforms. Skilled in PHP, Laravel, and React.js. Proven ability to build secure backends, robust APIs, and optimized frontends. Expertise in cloud AWS and CI/CD pipeline.",
};

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Typewriter hook                                                     */ /* ------------------------------------------------------------------ */

const TYPED_ROLES = [
  "Laravel & React.js apps",
  "scalable SaaS platforms",
  "secure backend APIs",
  "AWS & CI/CD pipelines",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";

    if (deleting) {
      if (text === "") {
        const reset = window.setTimeout(() => {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }, 250);
        return () => window.clearTimeout(reset);
      }
      const step = window.setTimeout(
        () => setText((prev) => prev.slice(0, -1)),
        26,
      );
      return () => window.clearTimeout(step);
    }

    if (text === word) {
      const hold = window.setTimeout(() => setDeleting(true), 1800);
      return () => window.clearTimeout(hold);
    }

    const step = window.setTimeout(
      () => setText(word.slice(0, text.length + 1)),
      55,
    );
    return () => window.clearTimeout(step);
  }, [text, deleting, index, words]);

  return text;
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */ /* ------------------------------------------------------------------ */

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
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-400 font-display text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-transform duration-300 group-hover:-rotate-6">
            {PROFILE.initials}
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {PROFILE.firstName}{" "}
            <span className="text-primary">{PROFILE.lastName}</span>
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
          <Button asChild size="sm" className="gap-1.5">
            <a href="#contact">
              Hire me
              <ArrowRight className="size-3.5" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */ /* ------------------------------------------------------------------ */

const TERMINAL_LINES: { command: string; output?: string; ok?: boolean }[] = [
  { command: "whoami", output: `${PROFILE.fullName} · ${PROFILE.role}` },
  {
    command: "cat stack.txt",
    output: "Laravel · React.js · Node.js · MySQL · MongoDB · AWS",
  },
  {
    command: "cat summary.txt",
    output: "3+ years shipping scalable SaaS apps, secure APIs & fast UIs.",
  },
  { command: "./status.sh", output: "● Open to freelance & remote projects", ok: true },
];

function TerminalCard() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10">
      <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-rose-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">
          ekramullah@portfolio — zsh
        </span>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.35, delayChildren: 0.5 } },
        }}
        className="space-y-3 p-5 font-mono text-[12.5px] leading-relaxed sm:p-6 sm:text-[13px]"
      >
        {TERMINAL_LINES.map((line) => (
          <motion.div
            key={line.command}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
            }}
          >
            <p className="flex items-center gap-2 text-muted-foreground">
              <span className="select-none text-primary">$</span>
              {line.command}
            </p>
            <p
              className={cn(
                "mt-1 break-words pl-5",
                line.ok ? "font-semibold text-primary" : "text-foreground",
              )}
            >
              {line.output}
            </p>
          </motion.div>
        ))}

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
          }}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <span className="select-none text-primary">$</span>
          <span className="animate-blink inline-block h-4 w-2 translate-y-0.5 bg-primary/80" />
        </motion.p>
      </motion.div>
    </div>
  );
}

const FLOATING_CHIPS = [
  { label: "Laravel", position: "-left-3 top-8 sm:-left-10", delay: "0s" },
  { label: "React.js", position: "-right-3 top-24 sm:-right-12", delay: "1.4s" },
  { label: "AWS", position: "-left-2 bottom-20 sm:-left-12", delay: "2.6s" },
  { label: "MySQL", position: "-right-2 bottom-10 sm:-right-10", delay: "3.8s" },
];

function Hero() {
  const typed = useTypewriter(TYPED_ROLES);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-24 lg:pt-40">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2.5 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Open to freelance &amp; remote opportunities
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-7 font-mono text-xs font-medium uppercase tracking-[0.28em] text-primary"
          >
            {PROFILE.location}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.2}
            className="mt-3 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {PROFILE.firstName}
            <br />
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-signal bg-clip-text text-transparent">
              {PROFILE.lastName}
              <span className="text-signal">.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.6}
            className="mt-5 text-lg font-semibold sm:text-xl"
          >
            {PROFILE.role}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.8}
            className="mt-1 font-mono text-sm text-muted-foreground sm:text-base"
          >
            I build{" "}
            <span className="font-semibold text-primary">{typed}</span>
            <span className="animate-blink ml-0.5 inline-block h-4 w-[3px] translate-y-0.5 bg-primary/80" />
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2.1}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground"
          >
            {PROFILE.summary}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2.4}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="gap-2">
              <a href="#contact">
                Get in touch
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href="#work">
                View my work
                <ArrowDown className="size-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2.7}
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <a href={`mailto:${PROFILE.email}`}>
                <Mail className="size-4 text-primary/70" />
                {PROFILE.email}
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <a href={PROFILE.phoneHref}>
                <Phone className="size-4 text-primary/70" />
                {PROFILE.phone}
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="size-4 text-primary/70" />
                LinkedIn
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="animate-glow pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative">
            <TerminalCard />
            {FLOATING_CHIPS.map((chip) => (
              <span
                key={chip.label}
                style={{ animationDelay: chip.delay }}
                className={cn(
                  "animate-float absolute z-10 hidden items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-semibold shadow-md sm:flex",
                  chip.position,
                )}
              >
                <span className="size-1.5 rounded-full bg-primary" />
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */ /* ------------------------------------------------------------------ */

const STATS = [
  { icon: Briefcase, value: "3+ yrs", label: "Full-stack experience" },
  { icon: Layers, value: "2", label: "Flagship platforms led" },
  { icon: Code2, value: "Laravel · React", label: "Core stack" },
  { icon: Cloud, value: "AWS", label: "Cloud & CI/CD pipelines" },
];

function Stats() {
  return (
    <div className="border-y bg-card/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.07}>
            <div className="flex items-center gap-4 px-5 py-8 lg:justify-center max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(odd)]:border-l-0 max-lg:[&:nth-child(odd)]:pl-0">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="size-5" />
              </span>
              <div>
                <p className="text-xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tech marquee                                                        */ /* ------------------------------------------------------------------ */

const TECH_STACK = [
  "PHP",
  "Laravel",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "MySQL",
  "MongoDB",
  "Tailwind CSS",
  "Livewire",
  "Inertia",
  "Pest",
  "Laravel Dusk",
  "AWS",
  "GitHub",
  "GitLab",
  "Postman",
  "Jira",
  "Slack",
];

function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y bg-card/60 py-4">
      <div className="marquee-track flex w-max items-center gap-10 pr-10">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-10">
            {TECH_STACK.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground/70"
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
/* About                                                               */ /* ------------------------------------------------------------------ */

const PRINCIPLES = [
  { icon: Brain, title: "Problem-solving", text: "Critical thinking from schema to pixel." },
  { icon: Users, title: "Teamwork", text: "Leading and collaborating across squads." },
  { icon: MessagesSquare, title: "Communication", text: "Clear updates for clients and teams." },
  { icon: Lightbulb, title: "Creativity", text: "Elegant solutions to hard product problems." },
];

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <SectionHeading
              eyebrow="About me"
              title="Full-stack engineer who ships and leads"
              description="From secure Laravel backends to polished React frontends — I own features end to end."
            />

            <Reveal delay={0.12}>
              <p className="mt-8 text-base leading-8 text-muted-foreground">
                For the past three years I&apos;ve designed, built and deployed web
                platforms that real businesses run on — marketplaces, research
                communities and SaaS products. I&apos;ve led development teams,
                managed sprints, and taken products from an empty repository to
                cloud deployment with CI/CD pipelines behind them.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                My comfort zone is the full stack: PHP and Laravel on the server,
                React.js and Next.js on the client, MySQL and MongoDB underneath,
                and AWS keeping it all reliable. I care about secure APIs,
                clean database design and frontends that stay fast on any device.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((principle, i) => (
                <motion.div
                  key={principle.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  custom={i}
                  className="group flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <principle.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{principle.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {principle.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.2}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Education
                </p>
                <div className="mt-5 flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="size-5" />
                  </span>
                  <div>
                    <p className="text-base font-semibold leading-6">
                      Bachelor of Computer Science
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Allamah University · Kabul, Afghanistan
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-6 rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-signal/10 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Sparkles className="size-5" />
                  </span>
                  <div>
                    <p className="text-base font-semibold leading-6">Currently</p>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      Software Engineer &amp; Full-Stack Developer at{" "}
                      <span className="font-medium text-foreground">
                        Win Soft Technology
                      </span>{" "}
                      in Kabul — leading the development of Bazar Kabul, while
                      open to freelance and remote collaborations.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Critical Thinking", "Problem-Solving", "Teamwork", "Creativity", "Time Management", "Communication"].map(
                  (soft) => (
                    <Badge key={soft} variant="secondary" className="font-medium">
                      {soft}
                    </Badge>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */ /* ------------------------------------------------------------------ */

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: "Programming Languages",
    items: ["JavaScript", "TypeScript", "PHP", "Python"],
    tint: "bg-primary/10 text-primary",
  },
  {
    icon: Server,
    title: "Backend Technologies",
    items: ["Laravel", "Node.js", "RESTful APIs"],
    tint: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    icon: Monitor,
    title: "Frontend Technologies",
    items: ["React.js", "Next.js", "HTML & CSS", "Tailwind CSS", "Bootstrap"],
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    icon: Database,
    title: "Databases",
    items: ["MySQL", "MongoDB"],
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Cloud,
    title: "Cloud & CI/CD",
    items: ["AWS", "GitHub", "GitLab"],
    tint: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "Testing & Quality",
    items: ["Unit Testing", "Feature Testing", "API Testing", "Pest", "Laravel Dusk"],
    tint: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    icon: Boxes,
    title: "Laravel Ecosystem",
    items: ["Livewire", "Inertia", "Forge", "Sail"],
    tint: "bg-primary/10 text-primary",
  },
  {
    icon: Wrench,
    title: "Tools & Collaboration",
    items: ["Postman", "Slack", "Jira"],
    tint: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    icon: HeartHandshake,
    title: "Soft Skills",
    items: ["Critical Thinking", "Problem-Solving", "Teamwork", "Communication"],
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
];

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Key skills"
          title="A full-stack toolkit, end to end"
          description="Nine categories covering everything it takes to take a product from idea to production — languages, frameworks, data, cloud and the soft skills that keep projects moving."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i % 3}
              className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    group.tint,
                  )}
                >
                  <group.icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold">{group.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border bg-secondary/60 px-3 py-1 font-mono text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/30"
                  >
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
/* Work — case studies                                                 */ /* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    name: "Bazar Kabul",
    tag: "Online marketplace",
    period: "2025 — Present",
    company: "Win Soft Technology",
    icon: ShoppingBag,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    description:
      "Led development of Bazar Kabul, a full online marketplace for buying, selling and posting advertisements — designing and managing the platform features that drive user engagement and transactions.",
    contributions: [
      "Developed full-stack features for posting, browsing and managing advertisements",
      "Built secure backend APIs for authentication, product listings and payments",
      "Optimized frontend performance with a responsive UI for web and mobile",
      "Implemented search and filtering to help users find relevant products fast",
      "Integrated notifications and messaging for buyer–seller communication",
      "Deployed and maintained the application on the cloud for reliability",
    ],
    tech: ["Laravel", "React.js", "MySQL", "AWS"],
  },
  {
    name: "CENA Platform",
    tag: "Climate knowledge sharing",
    period: "2024 — 2025",
    company: "CENA Project",
    icon: Leaf,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    description:
      "Developed a collaborative platform for sharing climate research, resources and knowledge — with real-time chat and notifications that improve researcher and community engagement.",
    contributions: [
      "Designed modules for research sharing and resource management",
      "Built a real-time chat and notification system for collaboration",
      "Developed an intuitive frontend for easy access to climate data",
      "Created secure backend APIs for research documents and user data",
      "Optimized the database structure for large volumes of research material",
      "Ensured scalability and reliability with cloud deployment",
    ],
    tech: ["Laravel", "Node.js", "MySQL", "Cloud"],
  },
];

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Two platforms, built end to end"
          description="Flagship products I engineered from database schema to cloud deployment — both serving real users in production."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
            >
              <div
                className={cn(
                  "relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br",
                  project.gradient,
                )}
              >
                <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-black/15 blur-2xl" />
                <project.icon className="relative size-14 text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {project.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className="font-mono text-xs font-medium text-muted-foreground">
                    {project.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-primary/90">
                  {project.company}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>

                <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Key contribution
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {project.contributions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground"
                    >
                      <Check className="mt-1 size-3.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 border-t pt-5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="font-mono font-medium">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience timeline                                                 */ /* ------------------------------------------------------------------ */

const EXPERIENCE = [
  {
    role: "Software Engineer & Full-Stack Developer",
    company: "Win Soft Technology",
    place: "Kabul, Afghanistan · Full-Time",
    period: "03/2025 — Present",
    current: true,
    points: [
      "Leading development of Bazar Kabul, an online marketplace for buying, selling and posting ads",
      "Designing and managing platform features that improve engagement and transactions",
      "Owning secure backend APIs, optimized frontends and cloud deployment",
    ],
  },
  {
    role: "Software Engineer & Full-Stack Developer",
    company: "CENA Project — Platform for Enhancing Climate Knowledge",
    place: "Remote · Full-stack",
    period: "02/2024 — 02/2025",
    current: false,
    points: [
      "Built a collaborative platform for sharing climate research and resources",
      "Shipped real-time chat and notification systems for researcher engagement",
      "Optimized database structure and ensured scalable cloud deployment",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "Afghan Academy",
    place: "Afghanistan · Part-time",
    period: "04/2023 — 06/2023",
    current: false,
    points: [
      "Built and maintained web features as part of a small development team",
    ],
  },
  {
    role: "Web Developer — Internship",
    company: "Niakbeen Control Panel",
    place: "Afghanistan · Part-time",
    period: "09/2022 — 01/2024",
    current: false,
    points: [
      "Learned production web development workflows and internal tooling",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="The path so far"
          description="Three-plus years of shipping production software — from first internship to leading full-stack development."
        />

        <div className="relative mt-12">
          <span
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent sm:left-[23px]"
          />

          <div className="flex flex-col gap-6">
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.period}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
                className="relative flex gap-5 pl-0 sm:gap-7"
              >
                <span
                  className={cn(
                    "relative z-10 mt-6 flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-card shadow-sm sm:size-12",
                    job.current
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground",
                  )}
                >
                  <Briefcase className="size-4" />
                  {job.current && (
                    <span className="absolute -right-0.5 -top-0.5 flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                    </span>
                  )}
                </span>

                <div className="flex-1 rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="text-base font-semibold leading-6 sm:text-lg">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-primary/90">
                        {job.company}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 font-mono text-[11px] font-semibold",
                        job.current
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-muted-foreground">
                    {job.place}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground"
                      >
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/50" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */ /* ------------------------------------------------------------------ */

const CONTACT_ROWS = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref },
  { icon: MapPin, label: "Location", value: PROFILE.location },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Ekramullah Kiya",
    href: PROFILE.linkedin,
  },
];

const TOPIC_OPTIONS = [
  "Full-stack web application",
  "Laravel / PHP backend",
  "React.js / Next.js frontend",
  "API design & integration",
  "Cloud deployment & CI/CD",
  "Something else",
];

function Contact() {
  const sendMessage = useMutation(api.contact.send);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      toast.error("Missing details", {
        description: "Please fill in your name, email and message.",
      });
      return;
    }

    setSending(true);
    try {
      await sendMessage({ name, email, service: topic || undefined, message });
      toast.success("Message sent", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
      formRef.current?.reset();
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
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something together"
              description="Have a product to ship, a team to strengthen, or a Laravel/React project that needs an experienced full-stack engineer? Drop a message — I usually reply within 24 hours."
            />

            <div className="mt-8 flex flex-col gap-3">
              {CONTACT_ROWS.map((row, i) => (
                <Reveal key={row.label} delay={i * 0.08}>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                    >
                      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <row.icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {row.label}
                        </p>
                        <p className="text-sm font-semibold">{row.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3.5 shadow-sm">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <row.icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {row.label}
                        </p>
                        <p className="text-sm font-semibold">{row.value}</p>
                      </div>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.34}>
              <div className="mt-8 flex items-start gap-3.5 rounded-2xl border bg-gradient-to-r from-primary/10 via-card to-signal/10 p-5 shadow-sm">
                <span className="relative mt-1 flex size-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Available for new projects</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Open to freelance work, remote full-time roles and
                    long-term collaborations worldwide.
                  </p>
                </div>
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
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    className="h-11"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="h-11"
                    required
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="contact-topic" className="text-sm font-medium">
                  What do you need?{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  defaultValue=""
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {TOPIC_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project, timeline and goals..."
                  rows={5}
                  className="min-h-32 resize-y"
                  required
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Replies usually within 24 hours — no spam, ever.
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
/* Footer                                                              */ /* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-400 text-sm font-bold text-primary-foreground">
                {PROFILE.initials}
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {PROFILE.firstName} <span className="text-primary">{PROFILE.lastName}</span>
              </span>
            </a>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {PROFILE.role} — building scalable SaaS applications, secure
              backends and optimized frontends with PHP, Laravel and React.js.
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
                    <a
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Connect
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="break-all text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {PROFILE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE.phoneHref}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {PROFILE.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE.linkedin}
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
                Elsewhere
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <span className="text-muted-foreground">
                    Kabul, Afghanistan
                  </span>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Send a message
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 {PROFILE.fullName}. All rights reserved.
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

/* ------------------------------------------------------------------ */
/* Page                                                                */ /* ------------------------------------------------------------------ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-emerald-400 to-signal"
    />
  );
}

function CtaBand() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section className="pb-20 lg:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary/90 to-emerald-500 px-8 py-14 text-center text-primary-foreground sm:px-12"
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 size-64 rounded-full bg-black/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to build your next platform?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-primary-foreground/85">
              Whether it&apos;s a marketplace, a SaaS product or a rescue
              mission on an existing codebase — let&apos;s talk about how I can
              help ship it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-background text-foreground hover:bg-background/90"
              >
                <a href="#contact">
                  Start a conversation
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={`mailto:${PROFILE.email}`}>Email me</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Experience />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
