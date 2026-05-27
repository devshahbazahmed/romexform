import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#060E20] border-t border-white/5 px-6 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left h-20">
        <Link href="/" className="shrink-0">
          <Image
            src="/dark-logo.png"
            alt="RomexForm"
            width={140}
            height={40}
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <p className="text-sm text-slate-400">© 2026 RomexForms Inc. Built for performance.</p>

        <Link
          href="/contact"
          className="text-sm font-medium text-white transition-colors hover:text-[#7a6dff]"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
