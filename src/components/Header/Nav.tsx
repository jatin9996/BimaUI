"use client";
import React from "react";
import style from "./style.module.scss";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { ChevronDown } from "lucide-react";

const landingMenu = [
  // { name: "How it works", path: "#Howitworks", disabled: false },
  // { name: "Investors", path: "#Investors", disabled: false },
  // { name: "Blogs", path: "#Blogs", disabled: false },
  // {
  //   name: "Quests",
  //   path: "https://quest.bima.money/",
  //   target: "_blank",
  //   disabled: false,
  // },
  { name: "Docs", path: "https://docs.bima.money/", disabled: false },
];

const Links = [
  { name: "Home", path: "https://bima.money/", disabled: false },
  { name: "Vaults", path: "/vaults", disabled: false },
  { name: "Earn", path: "/earn", disabled: false },
  { name: "Lend", path: "/lend", disabled: false },
  { name: "Faucet", path: "/faucet", disabled: false },
  // { name: "Rewards", path: "/rewards", disabled: false },
  // { name: "Mission", path: "/mission", disabled: false },
  // { name: "Leaderboard", path: "/leaderboard", disabled: false },

  {
    name: "Quests",
    path: "https://quest.bima.money/",
    target: "_blank",
    disabled: false,
  },
  { name: "Docs", path: "https://docs.bima.money/", disabled: false },
];

const Nav = () => {
  const path = usePathname();
  const isLandingMenu = path === "/";
  const menuItems = isLandingMenu ? landingMenu : Links;

  // Define spring animation variants
  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150, // Moderate stiffness for a smoother spring
        damping: 20, // Lower damping for more bounce
        mass: 0.75, // Slightly heavier mass for slower acceleration
        duration: 0.25, // Adjust for slight delay
      },
    },
    closed: {
      opacity: 0,
      y: 50, // Items start lower when closed
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.75,
        duration: 0.25,
      },
    },
  };

  return (
    <nav className={cn(style.nav, "flex flex-col lg:flex-row my-1")}>
      <Link href={"/"} className="text-[#8C8FA1] md:border-r dark:text-white">
        {/* To site */}
      </Link>
      <ul className="flex flex-col gap-2 mr-7 lg:mr-0 lg:flex-row">
        {menuItems.map((link, index) => (
          <motion.li
            key={link.name}
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            whileHover={{ scale: 1.05 }}
            className={cn({
              [style.active]: path.includes(link.path),
              [style.disabled]: link.disabled,
              "dark:text-[#edeef1]": !path.includes(link.path),
              "dark:hover:text-gray-100": true,
              "dark:text-gray-100": path.includes(link.path),
            })}
            transition={{
              delay: index * 0.1,
            }}
          >
            <Link
              href={link.path}
              target={link.name === "Quests" ? "_blank" : "_self"}
              rel={link.name === "Quests" ? "noopener noreferrer" : ""}
              className={cn({
                "border border-[#CBCBCA] rounded-[6px] px-2 py-1 hover:border-none":
                  isLandingMenu,
              })}
            >
              {link.name}
            </Link>
          </motion.li>
        ))}
      </ul>
      {/* {path != "/" && (
        <button className="flex gap-1 items-center ms-2 text-[14px]  font-medium hover:bg-[#f74a17] hover:text-[#FFFFFF] p-[3px] rounded-[5px]">
          More <ChevronDown className="size-[16px]" />
        </button>
      )} */}
    </nav>
  );
};

export default Nav;
