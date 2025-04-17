import { cn } from "@/lib/utils";
import { CircleHelp } from "lucide-react";
import Link from "next/link";
import React from "react";

const socialLinks = [
  // { name: "X / Twitter", url: "/about" },
  { name: "Discord", url: "https://discord.gg/WgR5kMz3HG" },
  { name: "Bima brand asset", url: "https://drive.google.com/drive/folders/1g0uqwbAhfgF-ozdQDepA4y-NAy4Ir9GQ?usp=sharing" },
  // { name: "GitBook", url: "/about" },
  // { name: "Gov", url: "/about" },
  // { name: "Snapshot", url: "/about" },
];
const Footer = () => {
  return (
    <footer
      className={cn(
        "flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center border-t border-gray-300 dark:border-gray-300 px-2 md:py-4 md:mx-[28px] md:px-[28px] text-[#8C8FA1] "
      )}
    >
      <p className="lg:border-r border-gray-300 dark:border-gray-300 p-0 md:pr-4">
        <Link href="/" className="dark:text-white">
          Bima Labs 2024 &copy;
        </Link>
      </p>
      <ul className="lg:flex items-center justify-between flex-wrap">
        {socialLinks.map((link) => (
          <li key={link.name} className="lg:mx-5">
            <a
              href={link.url}
              target="_blank"
              className="dark:text-white hover:underline"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <ul className="lg:ms-auto flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* <li className="lg:mx-3">
          <a href="/about" target="_blank" className="hover:underline">
            Disclaimer
          </a>
        </li>
        <li className="mx-2">
          <a href="/about" target="_blank" className="hover:underline">
            Help
          </a>
        </li>
        <li className="">
          <a href="/about" target="_blank" className="hover:underline">
            <CircleHelp />
          </a>
        </li> */}
      </ul>
    </footer>
  );
};

export default Footer;
