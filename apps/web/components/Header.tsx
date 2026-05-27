"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 bg-[#0B1326] h-16 sm:h-18 md:h-20">
      <Link href={"/"}>
        <Image
          src={"/dark-logo.png"}
          alt="RomexForm"
          width={120}
          height={120}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 hover:scale-110 transition-all duration-300"
        />
      </Link>
      <div className="hidden sm:flex items-center justify-center gap-8 md:gap-12 mx-4 md:mx-8">
        <Link
          href={"/dashboard/forms"}
          className="text-xs sm:text-sm md:text-base hover:text-blue-500 hover:scale-110 transition-all duration-300"
        >
          Dashboard
        </Link>
        <Link
          href={"/pricing"}
          className="text-xs sm:text-sm md:text-base hover:text-blue-500 hover:scale-110 transition-all duration-300"
        >
          Pricing
        </Link>
        <Link
          href={"/"}
          className="text-xs sm:text-sm md:text-base hover:text-blue-500 hover:scale-110 transition-all duration-300"
        >
          Analytics
        </Link>
      </div>
      <div className="flex gap-2 sm:gap-3 md:gap-5">
        <Button
          variant={"ghost"}
          className="cursor-pointer active:scale-95 px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-5 text-xs sm:text-sm md:text-lg hover:scale-110 transition-all duration-300"
          onClick={() => router.push("/signin")}
        >
          Log In
        </Button>
        <Button
          className="cursor-pointer bg-blue-600 text-white font-bold hover:bg-blue-800 active:scale-95 px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-5 text-xs sm:text-sm md:text-lg hover:scale-110 transition-all duration-300"
          onClick={() => router.push("/signup")}
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
}
