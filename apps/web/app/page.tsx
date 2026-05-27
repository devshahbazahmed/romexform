"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, BarChart3, LayoutTemplate, Sparkles } from "lucide-react";

// const companies = ["Velocis", "Aether", "Luminary", "Stratos", "CloudBase"];

const themes = ["Cyberpunk", "Studio Ghibli", "IMAX Dark", "Silicon Valley"];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white overflow-x-hidden">
      {/* background glow */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,#13224f_0%,#020817_60%)]" />

      {/* hero */}
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-20 md:px-10">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
            v0.1 Technical Preview
          </div>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-6xl">
            Build forms that feel like <span className="italic text-[#b8b4ff]">conversations.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-slate-400 text-base md:text-lg leading-8">
            The developer-first form engine designed for precision. Programmatic control meets human
            interaction for enterprise-grade data collection.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-[#6d5dfc] px-7 py-4 font-medium shadow-xl shadow-[#6d5dfc]/20 hover:bg-[#7a6dff] transition"
            >
              Start building
            </Link>

            <Link
              href="/docs"
              className="rounded-xl border border-white/10 px-7 py-4 text-slate-300 hover:bg-white/5 transition"
            >
              View Documentation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* logos */}
      {/* <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
          <p className="mb-6 text-xs tracking-[0.25em] uppercase text-slate-500">
            Helping high-growth teams win
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10 text-slate-500">
            {companies.map((company) => (
              <span key={company}>{company}</span>
            ))}
          </div>

          <p className="mt-8 text-3xl font-semibold text-[#b8b4ff]">500+ startups and counting.</p>
        </motion.div>
      </section> */}

      {/* features */}
      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10">
        <motion.div {...fadeUp} className="text-center mb-14">
          <h2 className="text-4xl font-semibold">Precision Tools for Modern Teams</h2>

          <p className="mt-4 text-slate-400">
            Powerful features that make data collection effortless.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FeatureCard
            icon={<LayoutTemplate size={20} />}
            title="Dynamic Schemas"
            description="Define complex logic with JSON-based schemas. Reactive fields adapt in real-time based on user input."
          />

          <FeatureCard
            icon={<BarChart3 size={20} />}
            title="Real-time Analytics"
            description="Monitor completion rates and drop-off points as they happen with live telemetry."
          />

          <div className="lg:col-span-2">
            <FeatureCard
              icon={<Sparkles size={20} />}
              title="Creative Themes"
              description="Go beyond basic CSS with cinematic transitions and sophisticated visual shaders."
            >
              <div className="mt-8 flex flex-wrap gap-3">
                {themes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* focus section */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-28 lg:grid-cols-2 md:px-10">
        <motion.div {...fadeUp}>
          <h2 className="text-4xl font-semibold">Engineered for deep focus.</h2>

          <p className="mt-6 text-slate-400 leading-8">
            Low latency is a requirement. RomexForms delivers ultra-fast interactions even on
            complex multi-step conditional workflows.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Zero-dependency runtime",
              "Edge-compatible API",
              "ISO-27001 Certified Infrastructure",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="text-[#7a6dff]" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="rounded-3xl border border-white/10 bg-white/[0.02] min-h-[320px] backdrop-blur-sm"
        />
      </section>

      {/* cta */}
      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10">
        <motion.div
          {...fadeUp}
          className="rounded-[32px] border border-white/10 bg-gradient-to-r from-[#1d2561] to-[#2f316b] px-8 py-20 text-center"
        >
          <h2 className="text-4xl font-semibold">Ready to start the conversation?</h2>

          <p className="mt-5 text-slate-300">
            Join the new era of form building today. Free trial. No credit card required.
          </p>

          <Link
            href="/signup"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[#7a6dff] px-8 py-4 font-medium hover:bg-[#8b80ff] transition"
          >
            Get Started for Free
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* footer */}
      <footer className="border-t border-white/5 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold">RomexForms</h3>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Building the future of digital interaction through beautiful, functional forms.
            </p>
          </div>

          <FooterColumn title="Product" items={["Features", "Integrations", "Templates"]} />

          <FooterColumn title="Company" items={["About", "Careers", "Blog"]} />

          <FooterColumn title="Legal" items={["Privacy Policy", "Terms", "API Status"]} />
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-white/5 pt-8 text-sm text-slate-500">
          © 2026 RomexForms Inc. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
    >
      <div className="mb-6 inline-flex rounded-xl bg-white/5 p-3 text-[#7a6dff]">{icon}</div>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <p className="mt-4 leading-8 text-slate-400">{description}</p>

      {children}
    </motion.div>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-semibold">{title}</h4>

      <div className="mt-4 space-y-3 text-sm text-slate-400">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}
