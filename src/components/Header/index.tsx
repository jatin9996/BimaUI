"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Bima_logo from "@/assets/icons/Bima_logo.svg";
import Bima_logo_dark from "@/assets/icons/Bima_logo_dark.svg";
import Bima_logo_mobile from "@/assets/icons/Bima_logo_mobile.svg";
import Image from "next/image";
import Nav from "./Nav";
import Controls from "./Controls";
import { cn } from "@/lib/utils";
import { AlignJustify, X } from "lucide-react";
import { Button } from "../ui/button";
import { Manrope } from "next/font/google";
import { usePathname } from "next/navigation";

const fontMonrope = Manrope({ subsets: ["latin"] });

const BottomHeaderNotice = () => {
  const [closeNotice, setCloseNotice] = useState(false);
  if (closeNotice) {
    return null;
  }
  return (
    <div className={cn(style.notice, "bg-[#f74a17] dark:bg-gray-800")}>
      <span></span>
      <p className={cn(style.noticeText, "text-yellow-600 dark:text-gray-300")}>
        This is the initial version of the testnet. Users may encounter errors
        as the testnet is subject to change soon.
        {/* <a href="/" target="_blank" rel="noopener noreferrer">
          Read More
        </a> */}
      </p>
      <button className={style.icon_btn} onClick={() => setCloseNotice(true)}>
        <X size={15} />
      </button>
    </div>
  );
};
const Header = () => {
  const [showMobileBar, setshowMobileBar] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    // Update background visibility based on the pathname
    setIsBackgroundVisible(pathname !== "/");
  }, [pathname]);

  const isHomePage = pathname === "/";

  return (
    <header className={style.header}>
      <div
        className={cn(
          style.container,
          isBackgroundVisible
            ? "bg-[#EEEEEE] dark:bg-[#1A1A1A] shadow-none"
            : "bg-white dark:bg-[#1A1A1A] shadow-md ",
          fontMonrope.className
        )}
      >
        <a href="/" className={cn(style.logo, " dark:text-white")}>
          <Image
            src={Bima_logo}
            alt="Logo"
            className=" dark:hidden"
            width={103}
            height={20}
            priority={true}
          />
          <Image
            src={Bima_logo_dark}
            alt="Logo"
            className="hidden dark:block"
            width={103}
            height={20}
            priority={true}
          />
        </a>
        <Button
          variant={"ghost"}
          onClick={() => setshowMobileBar((pv) => !pv)}
          onBlur={() => {
            setTimeout(() => {
              setshowMobileBar(false);
            }, 200);
          }}
          className="block lg:hidden "
        >
          <AlignJustify />
        </Button>
        <div
          className={cn("w-0 lg:w-full hidden lg:flex items-center", {
            "justify-between items-center": !isHomePage && !showMobileBar,
            "justify-end items-center": isHomePage && !showMobileBar,
            "justify-center flex-col items-center": showMobileBar,
            "bg-white rounded-xl mt-1 dark:bg-[#1A1A1A] left-0 top-[3.1rem] absolute flex w-full py-2 z-50 justify-center":
              showMobileBar,
          })}
        >
          {isHomePage || showMobileBar ? (
            <div className="flex flex-col lg:flex-row justify-center items-center">
              <Nav />
              <Controls />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-center w-full">
              <Nav />
              <Controls />
            </div>
          )}
        </div>
      </div>

      {/* <BottomHeaderNotice /> */}
    </header>
  );
};

export default Header;
