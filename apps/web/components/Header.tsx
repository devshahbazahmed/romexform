"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between px-10 h-20 bg-[#0B1326]">
      <Link href={"/"}>
        <Image
          src={"/dark-logo.png"}
          alt="RomexForm"
          width={200}
          height={200}
          className="hover:scale-110 hover:transition-all"
        />
      </Link>
      <div className="flex gap-12 items-center justify-around">
        <Link href={"/"} className="hover:text-blue-500 hover:scale-110 hover:transition-all">
          Dashboard
        </Link>
        <Link href={"/"} className="hover:text-blue-500 hover:scale-110 hover:transition-all">
          Templates
        </Link>
        <Link href={"/"} className="hover:text-blue-500 hover:scale-110 hover:transition-all">
          Analytics
        </Link>
      </div>
      <div className="flex gap-5">
        <Button
          variant={"ghost"}
          className="cursor-pointer active:scale-95 px-8 py-5 text-lg hover:scale-110 hover:transition-all"
          onClick={() => router.push("/signin")}
        >
          Log In
        </Button>
        <Button
          className="cursor-pointer bg-blue-600 text-white font-bold hover:bg-blue-800 active:scale-95 px-8 py-5 text-lg hover:scale-110 hover:transition-all"
          onClick={() => router.push("/signup")}
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
}
