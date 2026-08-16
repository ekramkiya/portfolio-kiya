import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Code2, Database, Smartphone } from "lucide-react";

export const SERVICE_OPTIONS = [
  "Web Development",
  "Database Development",
  "AI Automation",
  "Mobile App Development",
  "Something else",
];

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string; // short — used on landing cards
  overview: string; // longer — used on the services page
  features: string[];
  tint: string;
  border: string;
  gradient: string;
  startingPrice: string;
  timeline: string;
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    icon: Code2,
    title: "Web Development",
    tagline: "Sites and platforms that load fast and convert.",
    description:
      "High-performance websites and web applications engineered for speed, SEO and conversion — from marketing sites to complex SaaS platforms.",
    overview:
      "We design and build web experiences that feel instant and rank well — from polished marketing sites to full SaaS platforms with dashboards, payments and third-party integrations. Every build is responsive, accessible and optimized for the metrics that matter to your business.",
    features: [
      "Custom web applications",
      "E-commerce & marketplaces",
      "SaaS platforms & dashboards",
      "CMS & marketing sites",
      "Performance & SEO optimization",
      "API & third-party integrations",
    ],
    tint: "bg-primary/10 text-primary",
    border: "hover:border-primary/40",
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    startingPrice: "$2,900",
    timeline: "2–8 weeks",
  },
  {
    slug: "database-development",
    icon: Database,
    title: "Database Development",
    tagline: "Data architecture that scales with your business.",
    description:
      "Data architecture that scales with your business — clean schemas, fast queries and pipelines that turn raw data into decisions.",
    overview:
      "A great product runs on a great database. We design schemas, migrate legacy systems and build ETL pipelines that move data reliably — then tune queries and reporting so your team gets answers in milliseconds, not minutes.",
    features: [
      "Schema design & modeling",
      "Migration & ETL pipelines",
      "Query optimization",
      "Reporting & analytics",
      "Data warehousing",
      "Backup & security hardening",
    ],
    tint: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    border: "hover:border-teal-500/40",
    gradient: "from-teal-500 via-cyan-600 to-blue-700",
    startingPrice: "$3,500",
    timeline: "1–6 weeks",
  },
  {
    slug: "ai-automation",
    icon: BrainCircuit,
    title: "AI Automation",
    tagline: "Intelligence embedded in your daily workflows.",
    description:
      "Intelligent workflows that do the heavy lifting — AI assistants, document processing and automation that save your team hours every day.",
    overview:
      "We turn LLMs and machine learning into practical products: support copilots that answer instantly, document pipelines that parse thousands of files, and automations that quietly eliminate busywork. AI built with guardrails, evaluation and humans in the loop.",
    features: [
      "AI chatbots & copilots",
      "Document & data processing",
      "Workflow automation",
      "Predictive analytics",
      "LLM fine-tuning & RAG",
      "Human-in-the-loop review",
    ],
    tint: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    border: "hover:border-cyan-500/40",
    gradient: "from-blue-500 via-indigo-600 to-violet-700",
    startingPrice: "$5,000",
    timeline: "2–8 weeks",
  },
  {
    slug: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Native-feel apps for iOS and Android.",
    description:
      "Native-quality apps for iOS and Android that your users will love — fast, accessible and built to grow with your product.",
    overview:
      "From fitness trackers to delivery platforms, we ship mobile apps that feel at home on every device — built once with React Native or Flutter, or fully native where it matters. We handle store submission, push notifications and the backend to power it all.",
    features: [
      "Cross-platform apps",
      "Native iOS & Android",
      "App store launch support",
      "API & backend integration",
      "Push notifications",
      "Offline-first architecture",
    ],
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    border: "hover:border-amber-500/40",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    startingPrice: "$6,000",
    timeline: "4–12 weeks",
  },
];
