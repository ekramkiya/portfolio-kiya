import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Sparkles, Star } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EASE, fadeUp, Reveal, SectionHeading } from "@/lib/motion";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-8 lg:pb-20 lg:pt-40">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <span className="inline-flex items-center gap-2.5 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="size-3.5 text-primary" />
            Services &amp; pricing · Transparent packages
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
        >
          One studio, every service your{" "}
          <span className="bg-gradient-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
            product needs
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
          Web development, database engineering, AI automation and mobile apps —
          with clear packages and honest starting prices. No hidden fees, no
          surprise invoices.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg" className="gap-2">
            <a href="#pricing">
              See pricing
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a href="/#contact">Start a project</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

function ServicesGrid() {
  return (
    <section id="services" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Four disciplines, one accountable team"
          description="Every service below is delivered by the same studio — so your web app, database, mobile app and AI layer fit together like one product from day one."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.slug}
              id={service.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className={cn(
                "group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
                service.border,
              )}
            >
              <div
                className={cn(
                  "relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br",
                  service.gradient,
                )}
              >
                <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                <service.icon className="relative size-10 text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {service.timeline}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <Badge className="font-medium">{service.tagline}</Badge>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.overview}
                </p>

                <div className="mt-5 grid flex-1 gap-2.5 sm:grid-cols-2">
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

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
                  <div className="flex items-center gap-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        From
                      </p>
                      <p className="text-lg font-bold tracking-tight">
                        {service.startingPrice}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary/70" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {service.timeline}
                      </span>
                    </div>
                  </div>
                  <Button asChild size="sm" className="gap-1.5">
                    <a href="/#contact">
                      Get a quote
                      <ArrowRight className="size-3.5" />
                    </a>
                  </Button>
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
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

const TIERS = [
  {
    name: "Launch",
    audience: "Focused builds & MVPs",
    price: "$2,900",
    priceNote: "starting · one service",
    features: [
      "One service — web, mobile, database or AI",
      "Up to 2-week delivery window",
      "Production-ready, responsive build",
      "Two revision rounds",
      "30 days of post-launch support",
    ],
    cta: "Start with Launch",
    popular: false,
  },
  {
    name: "Growth",
    audience: "Complete products & integrations",
    price: "$7,900",
    priceNote: "starting · two or more services",
    features: [
      "Full product build across services",
      "Design system & branding",
      "Database design & integration",
      "Automated testing & CI/CD",
      "Analytics & performance tuning",
      "90 days of post-launch support",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Scale",
    audience: "Complex platforms & partnerships",
    price: "$15,000",
    priceNote: "starting · dedicated team",
    features: [
      "End-to-end platform development",
      "AI automation & data pipelines",
      "Dedicated product team",
      "SLA-backed support & maintenance",
      "Quarterly strategy reviews",
      "Priority on-call access",
    ],
    cta: "Scale with us",
    popular: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Packages that scale with your ambition"
          description="Transparent starting prices, scoped to your exact requirements during a free consultation. Pick a package or mix services freely."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
                tier.popular
                  ? "border-primary/50 ring-1 ring-primary/30"
                  : "hover:border-primary/30",
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-md">
                  <Star className="size-3 fill-current" />
                  Most popular
                </span>
              )}

              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {tier.name}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{tier.audience}</h3>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {tier.priceNote}
                </span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3 border-t pt-6">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className="mt-7 w-full gap-2"
                variant={tier.popular ? "default" : "outline"}
              >
                <a href="/#contact">
                  {tier.cta}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
            Every project is scoped individually after a free consultation —
            these packages are starting points. Custom requirements, urgent
            timelines and long-term retainers are always welcome.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    question: "How do you price a project?",
    answer:
      "Each package starts from the advertised price. During a free consultation we map your requirements, then send a fixed, itemized quote — no hourly surprises, no hidden fees. If scope changes mid-project, we agree on the change before we bill for it.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused single-service build usually ships in 2–8 weeks. Full products spanning web, mobile, database and AI typically take 6–16 weeks depending on complexity. You'll get a realistic timeline in your quote, and weekly demos so there are never surprises.",
  },
  {
    question: "Can you work with our existing codebase or team?",
    answer:
      "Absolutely. We regularly audit and extend existing systems, take over stalled projects, and embed with in-house teams. If you have a stack preference or a legacy system that needs rescuing, tell us in the consultation and we'll plan around it.",
  },
  {
    question: "What do we need to provide to get started?",
    answer:
      "Just your idea and any assets you already have — brand files, content, or a rough spec. We handle design, architecture, development, testing and launch. If you have accounts or servers already, we'll work with what exists.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every package includes a post-launch support window, and the Scale package adds SLA-backed maintenance. Most clients stay with us for ongoing improvements, new features and performance monitoring — but there's no lock-in.",
  },
  {
    question: "Can I change scope mid-project?",
    answer:
      "Yes. We work in agile sprints with weekly demos, so new ideas can be folded in at any sprint boundary. We'll cost the change transparently and keep you informed of any impact on timeline or budget.",
  },
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything clients usually ask before starting a project. Anything else — just ask."
        />

        <Reveal delay={0.2}>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA band                                                            */
/* ------------------------------------------------------------------ */

function CtaBand() {
  return (
    <section className="pb-20 lg:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary/90 to-cyan-600 px-8 py-14 text-center text-primary-foreground sm:px-12"
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 size-64 rounded-full bg-black/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to build beyond the horizon?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-primary-foreground/85">
              Tell us what you&apos;re building and get a free, no-obligation
              consultation with a scoped quote — usually within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gap-2 bg-background text-foreground hover:bg-background/90">
                <a href="/#contact">
                  Start a project
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href="mailto:hello@webglobalhorizon.com">Email us</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <ServicesGrid />
        <Pricing />
        <Faq />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
