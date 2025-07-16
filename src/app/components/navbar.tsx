"use client";

import Link from "next/link";
import Menu from "./menu";
import Image from "next/image";
import SearchBar from "./searchBar";
import dynamic from "next/dynamic";
// import NavIcons from "./navIcons";

const NavIcons = dynamic(() => import("./navIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className="bg-white sticky top-0 z-50 h-20 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE */}
      <div className="h-full sm:flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="flex items-center absolute top-0 left-0 h-full gap-4 px-4">
            <Image className="tracking-wide" src="/elevate.png" alt="" width={120} height={80} />
          </div>
        </Link>
        <div className="flex items-center justify-end absolute top-0 right-0 h-full w-full gap-4 px-4">
          <Menu />
        </div>
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full sm:hidden">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image className="tracking-wide" src="/elevate.png" alt="" width={120} height={80} />
            {/* <div className="text-2xl tracking-wide">Elevate</div> */}
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/">Homepage</Link>
            <Link href="/pages/list">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
