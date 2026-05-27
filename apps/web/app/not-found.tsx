"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileSearch, Home } from "lucide-react";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020817] px-6 text-white">
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#182657_0%,#020817_65%)]" />

      {/* left glow */}
      <div className="absolute left-[-120px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#4f46e5]/20 blur-[120px]" />

      {/* right glow */}
      <div className="absolute right-[-120px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#7a6dff]/20 blur-[120px]" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 mx-auto w-full max-w-3xl"
      >
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] px-8 py-14 shadow-2xl backdrop-blur-xl md:px-16 md:py-20">
          {/* icon */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-[#7a6dff]/15"
          >
            <FileSearch className="h-10 w-10 text-[#b8b4ff]" />
          </motion.div>

          {/* 404 */}
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#b8b4ff]">Error 404</p>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
              Page not found
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400 md:text-lg">
              The page you’re looking for doesn’t exist or may have been moved. Let’s get you back
              to building beautiful forms.
            </p>
          </div>

          {/* actions */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-800">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
            >
              <Link href="/docs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View Documentation
              </Link>
            </Button>
          </div>

          {/* footer helper text */}
          <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
            Need help? Check the docs or return to your workspace.
          </div>
        </div>
      </motion.section>
    </main>
  );
}
