"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSignup } from "~/hooks/api/user";

export default function SignupPage() {
  const router = useRouter();
  const { createUserWithEmailAndPasswordAsync, isPending, isSuccess, error } = useSignup();

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createUserWithEmailAndPasswordAsync({
      fullName,
      email,
      password,
    });
    router.push("/dashboard/forms");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-6 py-12">
      {/* left glow */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute left-[16%] top-1/2 -translate-y-1/2 h-[520px] w-[340px] rounded-3xl bg-gradient-to-br from-[#d9d4ff]/80 via-[#9a8dff]/30 to-transparent blur-3xl"
      />

      {/* right glow */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-[18%] top-1/2 -translate-y-1/2 h-[360px] w-[260px] rounded-3xl bg-gradient-to-br from-[#ffcfb2]/80 via-[#ff8855]/40 to-transparent blur-3xl"
      />

      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-[#101a38] to-[#081327] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Create Account</h1>

          <p className="mt-3 text-sm text-slate-400">
            Build high-performance forms with precision.
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {/* full name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-300">
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="h-12 w-full rounded-lg border border-white/10 bg-[#071123] px-4 text-white placeholder:text-slate-500 outline-none transition focus:border-[#6c5cff] focus:ring-2 focus:ring-[#6c5cff]/20"
            />
          </div>

          {/* email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-lg border border-white/10 bg-[#071123] px-4 text-white placeholder:text-slate-500 outline-none transition focus:border-[#6c5cff] focus:ring-2 focus:ring-[#6c5cff]/20"
            />
          </div>

          {/* password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-lg border border-white/10 bg-[#071123] px-4 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-[#6c5cff] focus:ring-2 focus:ring-[#6c5cff]/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-xs text-slate-500">Min. 8 characters with 1 symbol.</p>
          </div>

          {error ? <p className="text-sm text-red-400">{error.message}</p> : null}
          {isSuccess ? <p className="text-sm text-emerald-400">Account created.</p> : null}

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#5c4cf7] font-medium text-white shadow-lg shadow-[#5c4cf7]/30 transition hover:bg-[#695cff] hover:cursor-pointer"
          >
            {isPending ? "Creating Account..." : "Create Account"}
            <ArrowRight size={18} />
          </motion.button>
        </form>

        {/* divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs tracking-wider text-slate-500 uppercase">or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* socials */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="h-11 rounded-lg border border-white/10 bg-transparent text-sm text-white hover:bg-white/5 transition hover:cursor-pointer active:scale-95 hover:scale-110 flex items-center justify-center gap-2"
          >
            <Image src={"/google.png"} alt="Google" width={20} height={20} />
            <span>Google</span>
          </button>

          <button
            type="button"
            className="h-11 rounded-lg border border-white/10 bg-transparent text-sm text-white hover:bg-white/5 transition hover:cursor-pointer active:scale-95 hover:scale-110 flex items-center justify-center gap-2"
          >
            <Image src={"/github.png"} alt="Github" width={20} height={20} />
            <span>GitHub</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            className="font-medium text-white hover:text-[#7a6dff] transition"
            onClick={() => router.push("/signin")}
          >
            Log in
          </button>
        </p>
      </motion.section>
    </main>
  );
}
