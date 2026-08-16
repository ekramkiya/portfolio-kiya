import { useMutation } from "convex/react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  Clock,
  Code2,
  Database,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  Package,
  PenTool,
  Quote,
  Rocket,
  Search,
  Send,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  ThumbsUp,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
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

/** Inline style helper for the orbit animation duration. */
function orbitStyle(duration: string): CSSProperties {
  return { "--orbit-duration": duration } as unknown as CSSProperties;
}

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
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
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
          <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500 text-primary-foreground shadow-sm transition-transform duration-300 group-hover:-rotate-6">
            <Globe2 className="size-5" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Global <span className="text-primary">Horizon</span>
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
            <a href="#contact">Start a project</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — orbiting globe visual + floating service chips               */
/* ------------------------------------------------------------------ */

const ORBIT_SERVICES = [
  {
    label: "Web Apps",
    icon: Code2,
    position: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  },
  {
    label: "Databases",
    icon: Database,
    position: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  {
    label: "AI Automation",
    icon: BrainCircuit,
    position: "left-1/2 top-full -translate-x-1/2 -translate-y-1/2",
  },
  {
    label: "Mobile",
    icon: Smartphone,
    position: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
  },
];

function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* soft glow behind the globe */}
      <div className="animate-glow pointer-events-none absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />

      {/* outer ring with the four service chips */}
      <div
        className="orbit-ring absolute inset-10 rounded-full border border-dashed border-primary/30"
        style={orbitStyle("44s")}
      >
        {ORBIT_SERVICES.map((service) => (
          <div key={service.label} className={cn("absolute", service.position)}>
            <div
              className="orbit-node flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-semibold shadow-md"
              style={orbitStyle("44s")}
            >
              <service.icon className="size-3.5 text-primary" />
              {service.label}
            </div>
          </div>
        ))}
      </div>

      {/* middle ring */}
      <div
        className="orbit-ring-reverse absolute inset-[4.5rem] rounded-full border border-primary/15"
        style={orbitStyle("30s")}
      >
        <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/80" />
        <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/60" />
      </div>

      {/* inner dashed ring */}
      <div
        className="orbit-ring absolute inset-[6.5rem] rounded-full border border-dashed border-primary/10"
        style={orbitStyle("60s")}
      />

      {/* center card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex size-40 flex-col items-center justify-center gap-2 rounded-[1.75rem] border bg-card shadow-xl shadow-primary/10">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500 text-primary-foreground shadow-lg shadow-primary/25">
            <Globe2 className="size-7" />
          </span>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em]">
            Horizon
          </p>
          <p className="-mt-1.5 text-[11px] text-muted-foreground">
            Global Horizon Studio
          </p>
        </div>
      </div>

      {/* small floating accents */}
      <span className="absolute left-6 top-10 size-1.5 rounded-full bg-cyan-400/70" />
      <span className="absolute bottom-14 right-4 size-2 rounded-full bg-primary/40" />
      <span className="absolute bottom-6 left-16 size-1 rounded-full bg-amber-400/80" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:pb-24 lg:pt-40">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2.5 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Full-stack digital studio · Remote-first
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
          >
            Software that puts your business on the{" "}
            <span className="bg-gradient-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              global horizon
            </span>
            .
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          >
            Global Horizon designs, builds and scales web platforms, mobile
            apps, databases and AI automation — one team, one vision, from first
            wireframe to global launch.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="gap-2">
              <a href="#contact">
                Start a project
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href="#services">
                Explore services
                <ArrowDown className="size-4" />
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
              <Zap className="size-3.5 text-primary/70" /> 120+ projects shipped
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe2 className="size-3.5 text-primary/70" /> Web · Mobile · Data · AI
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="relative"
        >
          <OrbitVisual />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  { icon: Package, value: "120+", label: "Projects delivered" },
  { icon: Users, value: "60+", label: "Clients worldwide" },
  { icon: ThumbsUp, value: "98%", label: "Client retention" },
  { icon: Clock, value: "24h", label: "Average response" },
];

function Stats() {
  return (
    <div className="border-y bg-card/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.07}>
            <div className="flex items-center gap-4 px-6 py-8 max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(odd)]:border-l-0 max-lg:[&:nth-child(odd)]:pl-0 lg:justify-center">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="size-5" />
              </span>
              <div>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
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
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

const MARQUEE_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "Flutter",
  "React Native",
  "Swift",
  "Kotlin",
  "OpenAI",
  "LangChain",
  "TensorFlow",
  "AWS",
  "Docker",
  "Tailwind CSS",
  "Convex",
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
/* Services                                                            */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "High-performance websites and web applications engineered for speed, SEO and conversion — from marketing sites to complex SaaS platforms.",
    features: [
      "Custom web applications",
      "E-commerce & marketplaces",
      "SaaS platforms & dashboards",
      "CMS & marketing sites",
    ],
    tint: "bg-primary/10 text-primary",
    border: "hover:border-primary/40",
  },
  {
    icon: Database,
    title: "Database Development",
    description:
      "Data architecture that scales with your business — clean schemas, fast queries and pipelines that turn raw data into decisions.",
    features: [
      "Schema design & modeling",
      "Migration & ETL pipelines",
      "Query optimization",
      "Reporting & analytics",
    ],
    tint: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    border: "hover:border-teal-500/40",
  },
  {
    icon: BrainCircuit,
    title: "AI Automation",
    description:
      "Intelligent workflows that do the heavy lifting — AI assistants, document processing and automation that save your team hours every day.",
    features: [
      "AI chatbots & copilots",
      "Document & data processing",
      "Workflow automation",
      "Predictive analytics",
    ],
    tint: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native-quality apps for iOS and Android that your users will love — fast, accessible and built to grow with your product.",
    features: [
      "Cross-platform apps",
      "Native iOS & Android",
      "App store launch support",
      "API & backend integration",
    ],
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    border: "hover:border-amber-500/40",
  },
];

function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Four disciplines, one horizon"
            description="We cover the full software lifecycle under one roof — no juggling multiple vendors, no handoff gaps, just one team accountable for the whole product."
          />
          <Reveal delay={0.2} className="shrink-0">
            <Button asChild variant="outline" className="gap-2">
              <a href="#contact">
                Get a free consult
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className={cn(
                "group relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5",
                service.border,
              )}
            >
              <div
                className={cn(
                  "mb-5 flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  service.tint,
                )}
              >
                <service.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-5 flex flex-1 flex-col gap-2.5 border-t pt-5">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="size-3.5 shrink-0 text-primary" />
                    {feature}
                  </span>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Start this service
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/10 px-6 py-6 sm:flex-row sm:px-8">
            <div className="flex items-center gap-3.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  Not sure which service fits your idea?
                </p>
                <p className="text-sm text-muted-foreground">
                  Book a free 30-minute consultation — we&apos;ll map the right path.
                </p>
              </div>
            </div>
            <Button asChild size="lg" className="shrink-0 gap-2">
              <a href="#contact">
                Talk to us
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

const PROCESS = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    description:
      "We dig into your goals, users and constraints — then define scope, architecture and a roadmap that matches your budget.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    description:
      "Wireframes, prototypes and a design system. You see exactly what we'll build before a single line of production code.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Build",
    description:
      "Agile sprints with weekly demos. Web, mobile, database and AI work in parallel — one team, one shared roadmap.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & scale",
    description:
      "We deploy, monitor and iterate. Post-launch support and performance tuning keep your product ahead of the curve.",
  },
];

function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How we work"
          title="A proven path to launch"
          description="No mystery, no surprises. A transparent four-step process that takes you from idea to shipped product — and beyond."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="size-5" />
                </span>
                <span className="font-mono text-3xl font-bold text-muted-foreground/25">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    title: "Atlas Commerce",
    tag: "Web platform",
    service: "Web Development",
    description:
      "Headless e-commerce platform with a blazing-fast storefront, real-time inventory and a checkout tuned for conversion.",
    tech: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    icon: ShoppingBag,
  },
  {
    title: "Meridian Data Hub",
    tag: "Data platform",
    service: "Database Development",
    description:
      "Warehouse and analytics backbone for a logistics company — ingesting millions of records a day with sub-second dashboards.",
    tech: ["PostgreSQL", "Python", "dbt"],
    gradient: "from-teal-500 via-cyan-600 to-blue-700",
    icon: Database,
  },
  {
    title: "Nova Support Copilot",
    tag: "AI automation",
    service: "AI Automation",
    description:
      "An AI assistant that resolves 70% of customer tickets instantly, and hands the rest to humans with full context.",
    tech: ["OpenAI", "LangChain", "Convex"],
    gradient: "from-blue-500 via-indigo-600 to-violet-700",
    icon: Bot,
  },
  {
    title: "Drift Delivery",
    tag: "Mobile app",
    service: "Mobile Development",
    description:
      "Real-time delivery app for riders and customers — live tracking, smart dispatch and offline-first reliability.",
    tech: ["React Native", "Maps", "Node.js"],
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    icon: Truck,
  },
];

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Products we&apos;ve shipped"
            description="A snapshot of recent builds across web, data, AI and mobile — each one designed, engineered and launched by the same team."
          />
          <Reveal delay={0.2} className="shrink-0">
            <Button asChild variant="outline" className="gap-2">
              <a href="#contact">
                Build yours next
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
            >
              <div
                className={cn(
                  "relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br",
                  project.gradient,
                )}
              >
                <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-black/15 blur-2xl" />
                <project.icon className="relative size-14 text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {project.service}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                  {project.tag}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold">{project.title}</h3>
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
                    Start a similar project
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="size-3.5" />
                    Case study
                  </a>
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
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    quote:
      "Global Horizon rebuilt our storefront in eight weeks. Conversion is up 34% and the platform hasn't hiccuped once since launch — easily the smoothest vendor relationship we've had.",
    name: "Sarah Mitchell",
    role: "COO, Atlas Commerce",
    service: "Web Development",
    initials: "SM",
    gradient: "from-sky-500 to-indigo-600",
  },
  {
    quote:
      "They took our legacy warehouse data and turned it into a platform our analysts actually trust. Dashboards that took minutes now load in under a second.",
    name: "Daniel Okafor",
    role: "Head of Data, Meridian Logistics",
    service: "Database Development",
    initials: "DO",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    quote:
      "Our AI support copilot now resolves 70% of tickets instantly. The team was thoughtful about guardrails and kept humans in the loop — our CSAT has never been higher.",
    name: "Priya Sharma",
    role: "VP Customer Experience, Nova Support",
    service: "AI Automation",
    initials: "PS",
    gradient: "from-blue-500 to-violet-600",
  },
  {
    quote:
      "From wireframe to the App Store in ten weeks. Live tracking, push notifications, offline mode — the app feels native on both platforms. Riders and customers love it.",
    name: "Marcus Chen",
    role: "Founder, Drift Delivery",
    service: "Mobile App Development",
    initials: "MC",
    gradient: "from-amber-500 to-rose-500",
  },
  {
    quote:
      "Weekly demos meant zero surprises. Scope changes were costed transparently and folded in at sprint boundaries. It's the first agency that felt like an in-house team.",
    name: "Elena Petrova",
    role: "Product Manager, Cloudline SaaS",
    service: "Web Development",
    initials: "EP",
    gradient: "from-indigo-500 to-sky-600",
  },
  {
    quote:
      "The AI pipeline they built processes thousands of patient documents a day with human review on edge cases. It saved our care team hours every single day.",
    name: "James Whitfield",
    role: "CEO, Northstar Health",
    service: "AI Automation",
    initials: "JW",
    gradient: "from-cyan-500 to-emerald-600",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Testimonials"
            title="Clients who trusted the horizon"
            description="Don&apos;t take our word for it — here&apos;s what founders and teams say after shipping with us."
          />
          <Reveal delay={0.2} className="shrink-0">
            <div className="flex items-center gap-3.5 rounded-2xl border bg-card px-5 py-4 shadow-sm">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <div className="text-sm leading-tight">
                <p className="font-bold">4.9 / 5 average</p>
                <p className="text-xs font-medium text-muted-foreground">
                  across 60+ client projects
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="mb-6 break-inside-avoid rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Quote className="size-5" />
                </span>
                <Badge variant="secondary" className="font-medium">
                  {t.service}
                </Badge>
              </div>

              <div className="mt-4 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="mt-3 text-sm leading-7 text-muted-foreground">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-sm",
                    t.gradient,
                  )}
                >
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
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
    value: "hello@webglobalhorizon.com",
    href: "mailto:hello@webglobalhorizon.com",
  },
  { icon: MapPin, label: "Location", value: "Remote-first · Worldwide" },
  { icon: Clock, label: "Response time", value: "Usually within 24 hours" },
];

const SERVICE_OPTIONS = [
  "Web Development",
  "Database Development",
  "AI Automation",
  "Mobile App Development",
  "Something else",
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
    const service = String(data.get("service") ?? "").trim();
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
        service: service || undefined,
        message,
      });
      toast.success("Message sent", {
        description: "Thanks for reaching out — we'll get back to you within a day.",
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
              title="Let&apos;s build beyond the horizon"
              description="Tell us what you're building — a website, an app, a data pipeline or an AI workflow. We'll reply within 24 hours with a clear plan."
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
              <div className="mt-8 rounded-2xl border bg-card p-5 shadow-sm">
                <div className="flex items-start gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500 text-primary-foreground">
                    <Globe2 className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Free project consultation</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Not ready to commit? Walk through your idea with us first —
                      no obligation, no pressure.
                    </p>
                  </div>
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
                    placeholder="Jane Doe"
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
                    placeholder="jane@company.com"
                    autoComplete="email"
                    className="h-11"
                    required
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="contact-service" className="text-sm font-medium">
                  Service you&apos;re interested in{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <select
                  id="contact-service"
                  name="service"
                  defaultValue=""
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Tell us about your project
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Goals, timeline, budget — anything that helps us understand what you need..."
                  rows={5}
                  className="min-h-32 resize-y"
                  required
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  We usually reply within 24 hours — no spam, ever.
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
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500 text-primary-foreground">
                <Globe2 className="size-5" />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                Global <span className="text-primary">Horizon</span>
              </span>
            </a>
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
                  <li key={service.title}>
                    <a
                      href="#services"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {service.title}
                    </a>
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
            © 2026 Global Horizon. All rights reserved.
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

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Marquee />
        <Services />
        <Process />
        <Work />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
