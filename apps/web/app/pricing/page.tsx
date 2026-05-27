"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";
import { pricing } from "~/lib/constants";

export default function PricingPage() {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,#13224f_0%,#020817_60%)]" />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
            Pricing
          </div>

          <h1 className="mt-8 text-4xl font-semibold md:text-6xl tracking-tight">
            Simple pricing for
            <span className="ml-3 italic text-[#b8b4ff]">modern teams</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Start free. Upgrade when your workflows grow. No hidden fees, no surprise usage limits.
          </p>

          {/* Billing toggle */}
          <div className="mt-10 inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-lg px-5 py-2 text-sm transition cursor-pointer",
                billing === "monthly" ? "bg-blue-600 text-white" : "text-slate-400",
              )}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={cn(
                "rounded-lg px-5 py-2 text-sm transition",
                billing === "yearly" ? "bg-blue-600 text-white" : "text-slate-400",
              )}
            >
              Yearly
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {pricing[billing].map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -6 }}
              className={cn(
                "rounded-3xl border p-8 backdrop-blur-sm",
                plan.featured ? "border-blue-500 bg-[#12173b]" : "border-white/10 bg-white/[0.03]",
              )}
            >
              {plan.featured && (
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#7a6dff]/20 px-3 py-1 text-xs text-[#c9c2ff]">
                  <Sparkles size={14} />
                  Most Popular
                </div>
              )}

              <h2 className="text-2xl font-semibold">{plan.name}</h2>

              <p className="mt-3 text-slate-400">{plan.description}</p>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-semibold">${plan.price}</span>

                <span className="pb-2 text-slate-500">/month</span>
              </div>

              <Link
                href={plan.href}
                className={cn(
                  "mt-8 block rounded-xl px-6 py-4 text-center font-medium transition",
                  plan.featured
                    ? "bg-blue-600 hover:bg-blue-800"
                    : "border border-white/10 hover:bg-white/5",
                )}
              >
                {plan.cta}
              </Link>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check size={16} className="text-blue-600" />

                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* comparison */}
        <section className="mt-28">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold">Compare features</h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03]">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-white/10 text-slate-400">
                <tr>
                  <th className="p-6">Feature</th>
                  <th className="p-6">Starter</th>
                  <th className="p-6">Pro</th>
                  <th className="p-6">Enterprise</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["Unlimited Forms", "✓", "✓", "✓"],
                  ["Logic Branching", "—", "✓", "✓"],
                  ["Analytics", "Basic", "Advanced", "Advanced"],
                  ["SSO", "—", "—", "✓"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-white/5">
                    {row.map((cell) => (
                      <td key={cell} className="p-6 text-slate-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* faq */}
        <section className="mt-28 mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-semibold">Frequently asked questions</h2>

          <div className="space-y-6">
            {[
              [
                "Can I start for free?",
                "Yes. Starter is free forever and includes unlimited forms.",
              ],
              ["Do you charge per seat?", "No. Pricing is based on workspace usage, not seats."],
              ["Can I switch plans later?", "Yes. Upgrade or downgrade anytime."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-medium">{q}</h3>

                <p className="mt-3 text-slate-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          className="mt-28 rounded-[32px] border border-white/10 bg-gradient-to-r from-[#1d2561] to-[#31376d] px-8 py-20 text-center"
        >
          <h2 className="text-4xl font-semibold">Ready to build with RomexForms?</h2>

          <p className="mt-4 text-slate-300">Start free today. No credit card required.</p>

          <Link
            href="/signup"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-medium hover:bg-blue-800"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
