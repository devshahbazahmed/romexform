"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Terminal, FileJson, Rocket, ChevronRight } from "lucide-react";

const sections = [
  "Introduction",
  "Quick Start",
  "Schema Builder",
  "API Reference",
  "Themes",
  "Deployment",
];

export default function DocsPage() {
  const [search, setSearch] = React.useState("");

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,#13224f_0%,#020817_60%)]" />

      <div className="mx-auto flex max-w-7xl gap-10 px-6 py-20 md:px-10">
        {/* sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-slate-500">Documentation</p>

            <nav className="space-y-2">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block rounded-lg px-4 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  {section}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* content */}
        <div className="flex-1">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              Docs • v2.4
            </div>

            <h1 className="mt-6 text-4xl font-semibold md:text-5xl">RomexForms Documentation</h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              Everything you need to build dynamic, beautiful forms with enterprise-grade
              performance.
            </p>

            {/* search */}
            <div className="relative mt-8 max-w-xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documentation..."
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-12 pr-4 outline-none placeholder:text-slate-500 focus:border-[#6d5dfc]"
              />
            </div>
          </motion.div>

          {/* intro */}
          <DocsSection id="introduction" title="Introduction" icon={<Rocket size={18} />}>
            RomexForms is a developer-first form engine built for modern teams. Create forms using
            JSON schemas, customize themes, and collect data with precision.
          </DocsSection>

          <DocsSection id="quick-start" title="Quick Start" icon={<Terminal size={18} />}>
            <CodeBlock
              code={`pnpm add romexforms

import { FormBuilder } from "romexforms";

<FormBuilder schema={schema} />`}
            />
          </DocsSection>

          <DocsSection id="schema-builder" title="Schema Builder" icon={<FileJson size={18} />}>
            <CodeBlock
              code={`const schema = {
  fields: [
    {
      type: "text",
      name: "fullName",
      label: "Full Name",
      required: true
    },
    {
      type: "email",
      name: "email"
    }
  ]
};`}
            />
          </DocsSection>

          <DocsSection id="api-reference" title="API Reference" icon={<ChevronRight size={18} />}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="pb-4">Prop</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Description</th>
                  </tr>
                </thead>

                <tbody className="text-slate-300">
                  <tr>
                    <td className="py-4">schema</td>
                    <td>FormSchema</td>
                    <td>JSON configuration for form fields</td>
                  </tr>

                  <tr>
                    <td className="py-4">theme</td>
                    <td>string</td>
                    <td>Theme preset name</td>
                  </tr>

                  <tr>
                    <td className="py-4">onSubmit</td>
                    <td>function</td>
                    <td>Callback triggered on submit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DocsSection>

          <DocsSection id="themes" title="Themes" icon={<Rocket size={18} />}>
            <div className="grid gap-4 md:grid-cols-3">
              {["Cyberpunk", "Studio Ghibli", "Midnight", "Glass"].map((theme) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={theme}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="font-medium">{theme}</h3>
                </motion.div>
              ))}
            </div>
          </DocsSection>

          <DocsSection id="deployment" title="Deployment" icon={<Rocket size={18} />}>
            Deploy RomexForms to Vercel, Render, or any Node.js environment with full edge support
            and global CDN performance.
          </DocsSection>
        </div>
      </div>
    </main>
  );
}

function DocsSection({
  title,
  children,
  icon,
  id,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  id: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16 scroll-mt-28"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-white/5 p-2 text-[#7a6dff]">{icon}</div>

        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="leading-8 text-slate-400">{children}</div>
    </motion.section>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#060e20] p-6 text-sm text-slate-300">
      <code>{code}</code>
    </pre>
  );
}
