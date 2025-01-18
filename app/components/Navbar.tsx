"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 w-full shadow-sm shadow-gray-700 navbar-color">
      <div className="flex justify-start items-center gap-4 p-4">
        <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
        <Link href="/" className="m-0 text-3xl text-[#28ff81] font-bold">
          AutoAppraise
        </Link>

        <Link
          href="/"
          className={`text-2xl ${pathname === "/" ? "underline" : ""}`}
        >
          Home
        </Link>
        <Link
          href="/evaluator"
          className={`text-2xl ${pathname === "/evaluator" ? "underline" : ""}`}
        >
          Evaluator
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
  