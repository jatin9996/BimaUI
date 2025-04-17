"use client";
import { cn, toDollar } from "@/lib/utils";
import Image from "next/image";
import Hiro_section_bg from "@/assets/icons/Hiro_section_bg.png";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Card } from "@/components/ui/card";
import mkUSD from "@/assets/images/tokenImg/mkUSD.png";
import USBD from "@/assets/images/tokenImg/USBD.png";
import stBTC from "@/assets/images/tokenImg/stBTC.png";
import WaterDrop from "@/assets/images/tokenImg/WaterDrop.png";
import weETH from "@/assets/icons/weETH.svg";
import rsETH from "@/assets/icons/rsETH.svg";
import ezETH from "@/assets/icons/ezETH.svg";
import barCircle from "@/assets/icons/barCircle.svg";
import barChartCircle from "@/assets/icons/barChartCircle.svg";
import helpCircle from "@/assets/icons/helpCircle.svg";
import barCircle2 from "@/assets/icons/barCircle2.svg";
import ethAdd from "@/assets/icons/eth_add.svg";
import ethPie from "@/assets/icons/eth_pie.svg";
import ethBar from "@/assets/icons/eth_bar.svg";
import speedEthLST from "@/assets/icons/speedEthLST.svg";
import Portal_Ventures from "@/assets/investors/Portal_Ventures.svg";
import Core_logo from "@/assets/investors/Core_logo.svg";
import Delta_Blockchain_Fund from "@/assets/investors/Delta_Blockchain_Fund.svg";
import Halo_Capital from "@/assets/investors/Halo_Capital.svg";
import LSATS_Ventures from "@/assets/investors/LSATS_Ventures.svg";
import Luxor from "@/assets/investors/Luxor.svg";
import DGB from "@/assets/investors/DGB.svg";
import Aurion from "@/assets/investors/AurionCapital.svg";
import Trust from "@/assets/investors/TrustMachines.svg";
import brain from "@/assets/investors/angels/brain.jpeg";
import domo from "@/assets/investors/angels/domo.jpg";
import jeff from "@/assets/investors/angels/jeff.jpg";
import yiannis from "@/assets/investors/angels/yiannis.jpeg";
import mav from "@/assets/investors/angels/mav.jpg";
import caoimh from "@/assets/investors/angels/caoimh.jpg";
import pauljei from "@/assets/investors/angels/pauljei.jpg";
import richard from "@/assets/investors/angels/richard.jpg";
import keith from "@/assets/investors/angels/nz.png";
import charlie from "@/assets/investors/angels/charlie.jpg";
import rex from "@/assets/investors/angels/rex.jpg";
import farmerjoe from "@/assets/investors/angels/farmerjoe.jpg";
import sky from "@/assets/investors/angels/sky.jpg";
import tim from "@/assets/investors/angels/tim.jpg";
import vlad from "@/assets/investors/angels/vlad.jpg";
import mrblock from "@/assets/investors/angels/mrblock.jpg";
import paulkim from "@/assets/investors/angels/paulkim.jpeg";
import paulTylor from "@/assets/investors/angels/paulTylor.jpeg";
import ryanfang from "@/assets/investors/angels/raynfang.jpeg";
import smokey from "@/assets/investors/angels/smokey.jpg";

import convex from "@/assets/images/friend_family/convex.png";
import curve from "@/assets/images/friend_family/curve.png";
import frax from "@/assets/images/friend_family/frax.png";
import layer_zero from "@/assets/images/friend_family/layer_zero.png";
import llamanodes from "@/assets/images/friend_family/llamanodes.png";
import Discord from "@/assets/icons/Discord.svg";
import Telegram from "@/assets/icons/Telegram.svg";
import Telegram_dark from "@/assets/icons/Telegram_dark.svg";
import Linkedin from "@/assets/icons/Linkedin.svg";
import Linkedin_dark from "@/assets/icons/Linkedin_dark.svg";
import X from "@/assets/icons/X.svg";
import X_dark from "@/assets/icons/X_dark.svg";
import docs from "@/assets/icons/docs.svg";
import github from "@/assets/icons/github.svg";
import Footer_logo from "@/assets/icons/Footer_logo.svg";
import Footer_logo_dark from "@/assets/icons/Footer_logo_dark.svg";

import { Button } from "@/components/ui/button";
import { StaticImageData } from "next/image";
import { Slider } from "@/components/ui/slider";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Codesandbox,
  Dot,
  LayoutDashboard,
  LayoutGrid,
  MoveUpRight,
} from "lucide-react";
import Link from "next/link";
import { BigDot } from "@/components/common/Icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeroSectionCard from "@/components/Home/HeroSectionCards";
import { VaultCard } from "@/components/Vault/VaultComponents";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConnectXverseWallet from "@/components/btc-wallets-ui/Xverse";
import ConnectUnisatWallet from "@/components/btc-wallets-ui/Unisat";
import ConnectAsignaWallet from "@/components/btc-wallets-ui/Asigna";
import { usePathname } from "next/navigation";
import PartnersSlider from "@/components/ui/our-partners";
import HowItWorks from "@/components/ui/HowItWorks";
import SupportedBlockchains from "@/components/ui/SupportedLst";
import Mask_group_10 from "@/assets/icons/partner_logo/Mask_group_10.svg";
import Mask_group_11 from "@/assets/icons/partner_logo/Mask_group_11.svg";
import Mask_group_12 from "@/assets/icons/partner_logo/Mask_group_12.svg";
import Mask_group_13 from "@/assets/icons/partner_logo/Mask_group_13.svg";
import Mask_group_16 from "@/assets/icons/partner_logo/Mask_group_16.svg";
import Mask_group_17 from "@/assets/icons/partner_logo/Mask_group_17.svg";
import Mask_group_18 from "@/assets/icons/partner_logo/Mask_group_18.svg";
import note from "@/assets/icons/note.svg";
import Cards from "@/components/ui/card_whatsnew";
import Bima_Logo from "@/assets/images/Bima_Logo.svg";
import Frame_audited from "@/assets/images/Frame_audited.svg";
import Exclude_1 from "@/assets/icons/Exclude_1.svg";
import ToggleTheme from "@/components/ui/Dark_mode";
import { useRouter } from "next/router";
import { WalletButton } from "@rainbow-me/rainbowkit/dist/components/ConnectOptions/MobileOptions";
import { url } from "inspector";
import Audited_Logo from "@/assets/icons/Audited_Logo.svg";
import Blog_Logo from "@/assets/icons/Blog_Logo.svg";
import { Tabs } from "@/components/ui/Dashboard_Tab";
import TotalSupplyChart from "@/components/ui/Dashboard_chart";
import SupportedLst from "@/components/ui/SupportedLst";

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const fontMonrope = Manrope({ subsets: ["latin"] });

function HeroSection() {
  const [homeCards, setHomeCards] = useState<any>();
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const pathname = usePathname();

  const handleConnectClick = async () => {
    const host =
      `${window.location.host}` === "localhost:3000"
        ? `http://${window.location.host}`
        : `https://${window.location.host}`;

    if (pathname === "/") window.open(`${host}/vaults`, "_blank");
  };

  useEffect(() => {
    const fetchHomePageCards = async () => {
      try {
        const response = await fetch(`/api/home`);

        const { data } = await response.json();
        console.log("setHomeCards", data);
        setHomeCards(data);
      } catch (error) {
        console.error("Error fetching cards data:", error);
      }
    };
    fetchHomePageCards();
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.src = Hiro_section_bg.src;

    img.onload = () => {
      setBgImageLoaded(true);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "bg-[#EEEEEE] lg:py-[25%] w-[100%] mx-auto rounded-[28px] relative overflow-hidden",
          fontMonrope.className
        )}
      >
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/BimaHero.mp4" // Update the path as per your assets folder structure
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Content Section */}
        <div
          className="lg:ps-[60px] lg:absolute bottom-0 h-full w-[100%] md:w-[60%] xl:w-[47%] py-10 lg:py-0 inset-0 bg-transparent bg-opacity-50 backdrop-blur-[20px] rounded-[28px] md:rounded-tl-[28px] md:rounded-bl-[28px] md:rounded-tr-none md:rounded-br-none flex flex-col gap-4 justify-center text-center lg:text-left"
          style={{
            backgroundImage: `linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 30px,
        transparent 30px,
        rgba(255, 255, 255, 0.1) 1px
      )`,
            backgroundSize: "60px 100%",
            height: "100%",
            animation: "moveBackground 5s linear infinite",
          }}
        >
          <Link
            href="https://docs.bima.money/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex justify-center items-center h-[32px] w-fit ms-[20%] md:ms-10 lg:ms-0 px-[12px] text-[12px] md:text-[14px] font-[500] leading-[16.8px] text-[#FFFFFF] rounded-[10px] bg-black bg-opacity-10 backdrop-blur-md",
              fontMonrope.className
            )}
          >
            Explore the Bima Ecosystem{" "}
            <span className="hidden md:flex items-center">
              <Dot /> Read More
            </span>{" "}
            <ArrowRight className="size-[18px] ms-[8px]" />
          </Link>

          <h1
            className={cn(
              "text-[36px] font-[700] leading-[43.2px]  text-white xl:text-[64px] xl:leading-[72.8px]",
              fontMonrope.className
            )}
          >
            Hold Bitcoin. Earn Across Every Chain.
          </h1>
          <p
            className={cn(
              "text-white text-[16px] lg:text-[18px] font-[400] leading-[25.2px] px-[1%] sm:px-0",
              fontMonrope.className
            )}
          >
            Bitcoin-backed Stablecoin for Universal Yield
          </p>
          <div className="flex gap-2 justify-center lg:justify-start mb-2 sm:mb-0 mt-0 sm:mt-10">
            <button
              className={cn(
                "group flex gap-2 items-center justify-center text-[16px] font-[500] h-[48px] w-[131px] lg:w-[196px] rounded-[12px] bg-[#FF5001] border-b-[1px] border-[#B53901] text-white relative overflow-hidden transition-all duration-500 hover:bg-[#FF7433]",
                fontMonrope.className
              )}
              onClick={handleConnectClick}
            >
              Launch Testnet
              <ArrowRight className="size-[18px] transition-all group-hover:translate-x-2 group-hover:scale-125" />
              <div
                className={cn(
                  "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/5 transition-all duration-700 group-hover:left-[calc(100%+1rem)]"
                )}
              />
            </button>

            <Link
              href="https://www.loom.com/share/18ac724df8e24831b2e2514c87b6c02e?sid=c4c8203b-63aa-4483-8fd7-2e3613100b5e"
              passHref
              legacyBehavior
            >
              <a
                className="group relative flex gap-2 items-center justify-center text-[14px] lg:text-[16px] font-medium h-[48px] w-[131px] lg:w-[196px] rounded-[12px] bg-white/5 bg-opacity-5 border-[0.5px] border-white/25 backdrop-blur-2xl text-white overflow-hidden transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-[12px] bg-white/15 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
                <span className="relative z-10">Watch Demo</span>
                <ChevronRight className="relative z-10 size-[20px]" />
              </a>
            </Link>
          </div>
        </div>

        <style jsx>{`
          @keyframes moveBackground {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 60px 0;
            }
          }
        `}</style>
        <div className="absolute right-2 sm:right-5 bottom-2 sm:bottom-8">
          <ToggleTheme />
        </div>
      </div>

      <div className="py-6 lg:py-12">
        <h1
          className={cn(
            "text-[18px] font-[400] text-center leading-[27px] text-[#8F8E8C] my-12",
            fontMonrope.className
          )}
        >
          Our Partners
        </h1>
        <PartnersSlider />
      </div>
    </>
  );
}

function BIMAWorks() {
  const [sliderVal, setSliderVal] = useState([200]);
  return (
    <div
      id="Howitworks"
      className={cn(
        "py-[5%] ps-[10%] bg-white rounded-[28px]  w-[100%] mt-10 flex flex-col gap-3 dark:bg-[#1A1A1A] transition ease-in-out",
        fontMonrope.className
      )}
    >
      <button className="text-[14px] font-[500] leading-[22.4px] px-[5px] text-[#797876] h-[28px] w-fit rounded-[8px] flex gap-[5px] items-center justify-center border border-[#DFE1E7] dark:border-gray-800 dark:text-white">
        <LayoutGrid className="size-[16px] text-black dark:text-orange-700" />{" "}
        Overview
      </button>
      <h1
        className={cn(
          " text-[24px] lg:text-[56px] font-[700] leading-[28.8px] lg:leading-[70px] dark:text-white",
          fontMonrope.className
        )}
      >
        How it Works
      </h1>
      <p
        className={cn(
          "text-[16px] lg:text-[18px] text-[#585654] font-[400] leading-[19.2px] lg:leading-[27px] dark:text-[#B2B1B0]",
          fontMonrope.className
        )}
      >
        Supercharge your Bitcoin into a Yield Machine in 4 simple steps
      </p>
      <div>
        <HowItWorks />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div
      className={cn(
        "py-[5%] ps-[10%] bg-white rounded-[28px]  w-[100%] mt-5 flex flex-col gap-3 dark:bg-[#1A1A1A] transition ease-in-out",
        fontMonrope.className
      )}
    >
      <button className="text-[14px] font-[500] leading-[22.4px] px-[8px] text-[#797876] h-[28px] w-fit rounded-[8px] flex gap-[5px] items-center justify-center border border-[#DFE1E7] dark:border-gray-800 dark:text-white">
        <LayoutDashboard className="size-[16px] text-[#F74A17]" /> BIMA in
        Numbers
      </button>
      <p
        className={cn(
          "text-[18px] font-normal leading-[25.2px] text-[#585654] my-4 dark:text-[#B2B1B0]",
          fontMonrope.className
        )}
      >
        Track USBD in Bima Vaults, collateralization, and vault activity with
        real-time insights.
      </p>
      <div>
        <Tabs />
      </div>
      <div className="mt-8">{/* <TotalSupplyChart /> */}</div>
    </div>
  );
}

function SupportedBlockchain() {
  const [sliderVal, setSliderVal] = useState([200]);
  return (
    <div
      className={cn(
        "py-[15px] pb-12 sm:pb-0 lg:py-20 lg:px-[10%] mt-5 mb-5 bg-white rounded-[28px] w-[100%] flex flex-col gap-5 dark:bg-[#1A1A1A] transition ease-in-out",
        fontMonrope.className
      )}
    >
      <div className="md:ms-7 flex flex-col gap-5">
        <button className="ms-[10%] sm:ms-0 text-[14px] font-[500] leading-[16.8px] text-[#797876] h-[28px] w-fit px-[5px] rounded-[8px] flex gap-[3px] items-center justify-center border border-[#DFE1E7] dark:border-gray-800 dark:text-white">
          <Codesandbox className="size-[16px] text-black dark:text-orange-700" />{" "}
          Ecosystem
        </button>
        <h1
          className={cn(
            "ps-[10%] sm:ps-0  text-[24px] lg:text-[56px] font-[700] leading-[28.8px] lg:leading-[67.2px] dark:text-white",
            fontMonrope.className
          )}
        >
          Supported LST’s
        </h1>
        <p
          className={cn(
            "ps-[10%] sm:ps-0  text-[16px] lg:text-[18px] text-[#585654] font-[400] leading-[19.2px] lg:leading-[25.2px] dark:text-[#B2B1B0]",
            fontMonrope.className
          )}
        >
          Use these LST’s as collateral to mint USBD. Earn native yield of LST’s
          and extra yield using USBD.
        </p>
      </div>
      <div className="w-[100%]">
        <SupportedLst />
      </div>
    </div>
  );
}

function Collateral() {
  const _cdata = [
    {
      title: "Total Value Locked",
      value: toDollar(219600),
    },
    {
      title: "Minted USBD",
      value: <>19.8k / &#8734;</>,
    },
    {
      title: "MCR",
      value: "31.88%",
    },
    {
      title: "Mint Fee",
      value: "5.00%",
    },
    {
      title: "Borrow Interest Rate",
      value: "50.00%",
    },
    {
      title: "Redemption Rebate",
      value: "0.00%",
    },
    {
      title: "Staked Ether APR",
      value: "2.6%",
    },
  ];

  return (
    <div className="px-2 md:px-20 mb-10">
      <hr />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-baseline">
        <h1
          className={cn(
            "text-[44px] font-semibold max-w-[452px] pl-0 lg:pl-4",
            fontMonrope.className
          )}
        >
          Choose a collateral to borrow against
        </h1>
        <p className={cn("text-muted-foreground text-sm")}>
          Earn BIMA for minting stBTC, maintaining an active loan or depositing
          into the Stability Pool. Lock this BIMA to direct emissions and take
          advantage of additional incentives
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
        {/* <VaultCard
          data={_cdata}
          tabValues={[
            { label: "A", value: "a" },
            { label: "B", value: "b" },
          ]}
        /> */}
        <VaultCard data={_cdata} />
        {/* <VaultCard data={_cdata} /> */}
        {/* <VaultCard
          data={_cdata}
          tabValues={[
            { label: "A", value: "a" },
            { label: "B", value: "b" },
          ]}
        /> */}
      </div>
    </div>
  );
}

function Advantage() {
  return (
    <div className="px-2 md:px-20 mb-10 bg-white dark:bg-slate-600 grid grid-cols-1 lg:grid-cols-2">
      <div className={cn("py-5 lg:py-20", fontMonrope.className)}>
        <h1
          className={cn(
            "text-[44px] max-w-[560px] font-semibold leading-tight"
          )}
        >
          Take advantage of Ethereum&apos;s proof of stake network and{" "}
          <span className="text-theme">
            unlock loans where the collateral grows
          </span>
        </h1>
        <p className="py-4 text-muted-foreground text-xs max-w-[520px]">
          Earn BIMA for minting stBTC, maintaining an active loan or depositing
          into the Stability Pool. Lock this BIMA to direct emissions and take
          advantage of additional incentives
        </p>
        <p className="pb-4 text-muted-foreground text-xs max-w-[520px]">
          Using liquid representations of staked Ether as collateral for loans
          means that your collateral is growing all the time.
        </p>
        <p className="space-x-1 text-sm ">
          <span>Still a bit lost?</span>
          <Link
            href={"/"}
            className="inline-flex items-center space-x-1 hover:underline"
          >
            <span className="text-theme">Read more in our FAQ</span>
            <CircleHelp size={15} className="text-theme" />
          </Link>
        </p>
      </div>
      <div
        className={cn(
          "py-5 lg:py-20 flex items-end justify-start",
          fontMonrope.className
        )}
      >
        <div className="space-y-10 w-full">
          <div className="flex items-center space-x-3">
            <Image src={ethAdd} height={40} alt="Eth" />
            <p className="flex flex-col">
              <span className="text-xl font-semibold">3,1%</span>
              <span className="text-muted-foreground font-semibold text-sm">
                Staked ETH APR
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Image src={ethBar} height={40} alt="Eth" />
            <p className="flex flex-col">
              <span className="text-xl font-semibold">32,4M</span>
              <span className="text-muted-foreground font-semibold text-sm">
                Total Ether Staked
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Image src={ethPie} height={40} alt="Eth" />
            <p className="flex flex-col">
              <span className="text-xl font-semibold">$32,4M</span>
              <span className="text-muted-foreground font-semibold text-sm">
                Size of Staked Ether
              </span>
            </p>
          </div>
        </div>
        <div className="w-full flex items-center flex-col">
          <p className="font-semibold text-2xl py-8">Staked ETH v LST</p>
          <Image src={speedEthLST} alt="Eth" width={301} />
          <p className="flex space-x-5">
            <span className="inline-flex items-center font-semibold text-muted-foreground">
              {" "}
              <BigDot /> &nbsp; ETH
            </span>

            <span className="inline-flex items-center font-semibold text-muted-foreground">
              {" "}
              <BigDot color="#8C8FA1" /> &nbsp; LST
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function FriendFamily() {
  const ffImg = [convex, curve, frax, layer_zero, llamanodes];
  return (
    <div className={cn("px-2 md:px-20 mb-10", fontMonrope.className)}>
      <h1 className="text-[44px] max-w-[560px] font-semibold ">
        Family <span className="text-muted-foreground">&</span> Friends
      </h1>
      <span className="text-muted-foreground text-sm">
        Backed and supported by most of Defi&apos;s finest.
      </span>
      <div className="flex items-center justify-start flex-wrap py-8 space-x-3">
        {ffImg.map((v, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 w-[220px] px-6 py-4 my-3 rounded-xl flex items-center justify-center shadow-md"
          >
            <Image src={v} alt="Bar Chart Circle" height={30} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Audited() {
  const images = [
    // { id: 1, src: Mask_group_11, alt: "Image 1" },
    // { id: 2, src: Mask_group_10, alt: "Image 2" },
    // { id: 3, src: Mask_group_12, alt: "Image 3" },
    // { id: 4, src: Mask_group_13, alt: "Image 4" },
    { id: 5, src: Mask_group_18, alt: "Image 5" },
    { id: 6, src: Mask_group_17, alt: "Image 6" },
  ];

  return (
    <div className="relative flex flex-col gap-[160px] md:gap-[160px] lg:flex-row overflow-x-hidden bg-white rounded-[28px] w-[100%] py-8 lg:py-12 px-6 lg:px-12 lg:h-full dark:bg-[#1A1A1A] ">
      {/* <div
        className="
    absolute bottom-0 right-0 h-[40%] lg:h-[100%] w-[100%] lg:w-[23.5%] z-10 
    rounded-b-[28px] lg:rounded-r-[28px] lg:rounded-l-none pointer-events-none 
    bg-transparent bg-opacity-20 backdrop-blur-md 
    bg-[linear-gradient(90deg,rgba(0,0,0,0.04)_1px,rgba(255,255,255,0)_24px)] 
    dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,rgba(0,0,0,0)_24px)] 
    bg-[length:25px_100%]
  "
      /> */}

      {/* Main Content Container */}
      <div
        className={cn(
          "flex flex-col gap-[15px] lg:gap-[30px] dark:bg-[#1A1A1A]  transition ease-in-out ",
          fontMonrope.className
        )}
      >
        <h1
          className={cn(
            "text-[20px] mt-[10px] lg:mt-0 lg:text-[36px] font-bold leading-[24px]  lg:leading-[43.2px] dark:text-white",
            fontMonrope.className
          )}
        >
          Audited By
        </h1>
        <p
          className={cn(
            "text-[16px] lg:text-[18px] w-full lg:w-[64%] text-left font-normal leading-[19.2px] lg:leading-[25.2px] text-[#585654] dark:text-[#B2B1B0]",
            fontMonrope.className
          )}
        >
          Bima’s code has been thoroughly audited by top industry experts to
          ensure maximum security. We maintain an immutable, proxy-free
          structure, staying true to decentralized finance principles.
        </p>

        <div className="w-[100%] lg:w-[50%] grid grid-cols-2 sm:grid-cols-3 gap-5 lg:flex lg:flex-wrap lg:justify-start lg:items-start">
          {images.map((image) => (
            <div key={image.id}>
              <Image
                src={image.src}
                alt={image.alt}
                height={150}
                width={150}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div
          className="absolute right-0 bottom-0 h-[39%] md:h-[46%] lg:h-[100%] w-[100%] lg:w-[30%] xl:w-[23.5%] z-10
    rounded-b-[28px] lg:rounded-r-[28px] lg:rounded-l-none pointer-events-none 
    bg-transparent bg-opacity-20 backdrop-blur-md 
    bg-[linear-gradient(90deg,rgba(0,0,0,0.04)_1.2px,rgba(255,255,255,0)_21px)] 
    dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1.2px,rgba(0,0,0,0)_21px)] 
    bg-[length:22.2px_100%]
  "
        />
        <Image
          src={Audited_Logo}
          alt="Audited"
          className="object-cover absolute -right-30 md:right-0 bottom-0 min-w-fit  "
        />
      </div>
    </div>
  );
}

function WhatsNew() {
  return (
    <>
      <div
        id="Blogs"
        className=" p-[5%] lg:pt-[9%] relative bg-[#FF5001] rounded-[28px] w-[100%] flex flex-col gap-2 sm:gap-5 mt-5 overflow-x-hidden"
      >
        <div className="hidden lg:block absolute inset-x-0 bottom-0 h-[30%] radial-gradient"></div>
        <div className="flex flex-col gap-2 sm:gap-5 ps-5 lg:ps-10 z-10">
          <button
            className={cn(
              "text-[14px] font-[500] text-white h-[28px] w-[77px] rounded-[8px] flex gap-[5px] items-center justify-center bg-white/10 backdrop-blur-[20px] border border-white/10 z-10 sm:z-0",
              fontMonrope.className
            )}
            onClick={() => window.open("https://medium.com/@Bimabtc", "_blank")}
          >
            <Image src={note} alt="image" /> Blogs
          </button>
          <h1
            className={cn(
              "text-[24px] lg:text-[56px] font-[700] leading-[28.8px] lg:leading-[67.2px] text-white",
              fontMonrope.className
            )}
          >
            What’s New?
          </h1>
          <p
            className={cn(
              "text-[16px] lg:text-[18px] text-[#FFFFFF] font-[400] leading-[19.2px] lg:leading-[25.2px]",
              fontMonrope.className
            )}
          >
            Get the latest updates and insights on how Bima is shaping the
            future <br /> of Bitcoin-backed stablecoins.
          </p>
        </div>
        <div className="z-10">
          <Cards />
        </div>
        <div className="hidden lg:block absolute right-[10px] top-[-1px] ">
          <Image
            src={Blog_Logo}
            alt="Blog"
            className="object-contain min-w-fit"
          />
        </div>
      </div>

      <style jsx>{`
        .radial-gradient {
          background: radial-gradient(
            circle at bottom,
            rgba(255, 255, 255, 0.45),
            transparent 45%
          );

          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: bottom;
        }
      `}</style>
    </>
  );
}

function FAQ() {
  return (
    <div
      className={cn(
        "px-2 py-[5%] bg-white rounded-[28px] w-[100%] mt-5 flex justify-center items-center flex-col dark:bg-[#1A1A1A] transition ease-in-out",
        fontMonrope.className
      )}
    >
      <h1
        className={cn(
          "text-[32px] lg:text-[56px] font-bold w-[80%] lg:w-[660px] text-left lg:text-center px-2 mb-10 lg:mb-20 lg:px-0 leading-[38.4px] lg:leading-[67.2px] dark:text-white ",
          fontMonrope.className
        )}
      >
        Frequently Asked Questions
      </h1>

      {[
        {
          key: "What is Bima?",
          value: (
            <p className="pb-2 text-muted-foreground max-w-[90%] text-sm font-normal">
              Bima Protocol is a decentralized finance (DeFi) platform that
              enables users to stake assets like BTC and Liquid Staked Tokens
              (LST) to borrow USBD, a stablecoin pegged to the US dollar. The
              platform offers secure vaults, collateralized lending, and
              opportunities to earn rewards through staking.
            </p>
          ),
        },
        {
          key: "What is USBD?",
          value: (
            <p className="pb-2 text-muted-foreground max-w-[90%] text-sm font-medium">
              USBD is revolutionizing the stablecoin space by offering a
              Bitcoin-backed solution that integrates across multiple wallets,
              enables seamless staking, and provides cross-chain yield
              opportunities. With upcoming soft-pegs to key Latin American and
              Asian currencies, USBD is designed to simplify global remittances
              and financial transactions, bridging the gap between decentralized
              finance and traditional systems.
            </p>
          ),
        },
        {
          key: "How USBD Maintains Stability?",
          value: (
            <p className="pb-2 text-muted-foreground max-w-[90%] text-sm font-medium">
              At the heart of USBD’s stability is over-collateralization. Every
              USBD in circulation is backed by more value in collateral than the
              amount of stablecoins issued, ensuring that the system can
              withstand market fluctuations. For instance, if you mint USBD,
              your crypto assets, such as Liquid Staked Tokens (LST) or Bitcoin,
              must be locked in at a 225% collateralization ratio. This cushion
              ensures that even during volatile market conditions, the value of
              USBD remains protected.
            </p>
          ),
        },
        {
          key: "What assets can I use as collateral on Bima Protocol?",
          value: (
            <p className="pb-2 text-muted-foreground max-w-[90%] text-sm font-medium">
              You can use Liquid Staked Tokens (LST) and BTC as collateral. Each
              type of asset has its own collateralization ratio and debt
              ceiling, ensuring that all loans are sufficiently backed by
              valuable collateral.
            </p>
          ),
        },
        {
          key: "Is Bima secure?",
          value: (
            <p className="pb-2 text-muted-foreground max-w-[90%] text-sm font-medium">
              Bima Protocol uses smart contracts that are regularly audited for
              vulnerabilities. Additionally, the platform implements
              decentralized price oracles, automated liquidation mechanisms, and
              governance-controlled risk parameters to safeguard user assets and
              maintain the protocol’s overall security.
            </p>
          ),
        },
      ].map((v, i) => (
        <Accordion
          key={i}
          type="single"
          className={`bg-white w-[75%] border-b-[1px] border-[#DFE1E7] dark:bg-[#1A1A1A] dark:border-[#EEEEEE] ${
            i === 0 ? "border-t-[1px]" : ""
          }`}
          collapsible
        >
          <AccordionItem className="border-0" value={`item-${i}`}>
            <AccordionTrigger
              className={cn(
                "text-[14px] sm:text-[18px] font-[600] leading-[21.6px] text-left hover:no-underline dark:text-white",
                fontMonrope.className
              )}
            >
              {v.key}
            </AccordionTrigger>
            <AccordionContent className="text-[12px] sm:text-[16px] font-normal leading-[19.2px] text-[#666D80] dark:text-[#CBCBCA]">
              {typeof v.value === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: v.value }} />
              ) : (
                v.value
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

function FundriseHistory() {
  const ledByLogos = [
    {
      logo: Portal_Ventures,
      link: "https://portal.vc/",
    },
  ];
  const fundLogos = [
    {
      name: "Core",
      logo: Core_logo,
      link: "https://coredao.org/",
    },
    {
      name: "Delta Blockchain Fund",
      logo: Delta_Blockchain_Fund,
      link: "https://deltafund.io/",
    },
    {
      name: "Halo Capital",
      logo: Halo_Capital,
      link: "https://www.halo.xyz/",
    },
    {
      name: "Sats Ventures",
      logo: LSATS_Ventures,
      link: "https://www.satsventures.com/",
    },
    {
      name: "Luxor",
      logo: Luxor,
      link: "https://luxor.tech/",
    },
    {
      name: "dgb",
      logo: DGB,
      link: "https://www.dgb.vc/",
    },
    {
      name: "Aurion Capital",
      logo: Aurion,
      link: "https://www.aurion.capital/",
    },
    {
      name: "Trust Machines",
      logo: Trust,
      link: "https://trustmachines.co/",
    },
  ];

  const angels = [
    {
      name: "Jeffrey Feng",
      company: "Sei Labs",
      profilePic: jeff,
      socialLinks: {
        twitter: "https://x.com/jeffdfeng?lang=en",
        linkedin: "https://www.linkedin.com/in/jeffreydfeng/",
      },
    },
    {
      name: "Domo",
      company: "BRC20 Creator",
      profilePic: domo,
      socialLinks: {
        twitter: "https://x.com/domodata?lang=en",
        linkedin: "",
      },
    },
    {
      name: "Brian Crain",
      company: "Chorus One",
      profilePic: brain,
      socialLinks: {
        twitter: "https://x.com/crainbf?lang=en",
        linkedin: "https://pt.linkedin.com/in/bfcrain",
      },
    },
    {
      name: "mr Block",
      company: "Curve",
      profilePic: mrblock,
      socialLinks: {
        twitter: "https://x.com/mrblocktw",
        linkedin: "",
      },
    },
    {
      name: "Smokey",
      company: "Berachain",
      profilePic: smokey,
      socialLinks: {
        twitter: "https://x.com/SmokeyTheBera",
        linkedin: "",
      },
    },
    {
      name: "Paul Kim",
      company: "Notifi, ex-Circle",
      profilePic: paulkim,
      socialLinks: {
        twitter: "https://www.linkedin.com/in/1paulkim/",
        linkedin: "",
      },
    },
    {
      name: "Ryan Fang",
      company: "Ankr",
      profilePic: ryanfang,
      socialLinks: {
        twitter: "https://x.com/ryanfang95?lang=en",
        linkedin: "https://www.linkedin.com/in/ryan-fang-245011a2/",
      },
    },
    {
      name: "Paul Taylor",
      company: "ex-BlackRock",
      profilePic: paulTylor,
      socialLinks: {
        twitter: "https://x.com/paultaylorvc",
        linkedin: "https://www.linkedin.com/in/officialpaultaylor/",
      },
    },
    {
      name: "Vlad",
      company: "Auran Network",
      profilePic: vlad,
      socialLinks: {
        twitter: "https://x.com/fess_v_",
        linkedin: "",
      },
    },
    {
      name: "Mav",
      company: "X+",
      profilePic: mav,
      socialLinks: {
        twitter: "https://x.com/0xMaveryk",
        linkedin: "",
      },
    },
    {
      name: "Yiannis",
      company: "Monday Capital ",
      profilePic: yiannis,
      socialLinks: {
        twitter: "",
        linkedin: "https://www.linkedin.com/in/yiannis-varelas/",
      },
    },
    {
      name: "Tim Wang",
      company: "Elixir",
      profilePic: tim,
      socialLinks: {
        twitter: "https://x.com/DegenTW_",
        linkedin: "",
      },
    },
    {
      name: "Sky",
      company: "J17 Capital",
      profilePic: sky,
      socialLinks: {
        twitter: "https://x.com/0xsky404",
        linkedin: "",
      },
    },
    {
      name: "FarmerJoe",
      company: "Bitcoin Angel",
      profilePic: farmerjoe,
      socialLinks: {
        twitter: "https://x.com/FarmerJoe0x",
        linkedin: "",
      },
    },
    {
      name: "Rex",
      company: "R89 capital",
      profilePic: rex,
      socialLinks: {
        twitter: "https://x.com/R89Capital",
        linkedin: "",
      },
    },
    {
      name: "Chalie",
      company: "Bitlayer",
      profilePic: charlie,
      socialLinks: {
        twitter: "https://x.com/CharlieHusats",
        linkedin: "",
      },
    },
    {
      name: "Keith Chen",
      company: "SNZ",
      profilePic: keith,
      socialLinks: {
        twitter: "https://x.com/snzholding",
        linkedin: "",
      },
    },
    {
      name: "Richard Malone",
      company: "Drosera Network",
      profilePic: richard,
      socialLinks: {
        twitter: "https://x.com/crypto_malone",
        linkedin: "",
      },
    },
    {
      name: "Paul",
      company: "Gauntlet",
      profilePic: pauljei,
      socialLinks: {
        twitter: "https://x.com/pauljlei",
        linkedin: "",
      },
    },
    {
      name: "Caoimh",
      company: "Polychain",
      profilePic: caoimh,
      socialLinks: {
        twitter: "https://x.com/_caoimh",
        linkedin: "",
      },
    },
  ];

  return (
    <div
      id="Investors"
      className={cn(
        "px-2 py-[5%] bg-white rounded-[28px] w-[100%] my-5 flex justify-center items-center flex-col dark:bg-[#1A1A1A] transition ease-in-out",
        fontMonrope.className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="py-1">
          <h1 className="text-[24px] font-[700] lg:text-[36px] leading-[24px] lg:leading-[43.2px] text-center mb-10">
            Led By
          </h1>
          <div>
            {ledByLogos.map((ledby, index) => (
              <a
                key={index}
                href={ledby.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <Image
                  key={index}
                  src={ledby.logo}
                  alt="Led By Logo"
                  className="w-[50%] md:w-[18%]"
                />
              </a>
            ))}
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 " />

        <div className="pt-3">
          <h1 className="text-[24px] font-[700] lg:text-[36px] leading-[24px] lg:leading-[43.2px]  mb-10 text-center">
            Funds
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {fundLogos.map((fund, index) => (
              <a
                key={index}
                href={fund.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <Image
                  src={fund.logo}
                  alt="Fund Logo"
                  className="w-[100px] md:w-[150px] "
                />
                {/* <p className="mt-2 text-center">{fund.name}</p> */}
              </a>
            ))}
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700" />

        <div className="pt-3">
          <h1 className="text-[24px] font-[700] lg:text-[36px] leading-[24px] lg:leading-[43.2px]  mb-10 text-center">
            Angels
          </h1>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 px-4">
            {/* <div className="flex flex-wrap justify-center gap-20 px-4"> */}
            {angels.map((angel, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={angel.profilePic}
                  alt={`${angel.name} Profile`}
                  className="h-16 w-16 rounded-full"
                  width={35}
                  height={35}
                />
                <p className="mt-2 text-[16px] font-[500] text-center">
                  {angel.name}
                </p>
                <p className="text-center text-[14px] font-[400] text-gray-500">
                  {angel.company}
                </p>
                <div className="flex gap-3 mt-2">
                  {angel.socialLinks.twitter && (
                    <a
                      href={angel.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={X}
                        alt="Twitter"
                        className="h-[30px] w-[30px] p-[5px] rounded-[6px] hover:bg-[#FFEEE6]"
                      />
                    </a>
                  )}
                  {angel.socialLinks.linkedin && (
                    <a
                      href={angel.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={Linkedin}
                        alt="LinkedIn"
                        className="h-[30px] w-[30px] p-[5px] rounded-[6px] hover:bg-[#FFEEE6]"
                      />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StartApp() {
  const pathname = usePathname();

  const handleConnectClick = async () => {
    const host =
      `${window.location.host}` === "localhost:3000"
        ? `http://${window.location.host}`
        : `https://${window.location.host}`;

    if (pathname === "/") window.open(`${host}/vaults`, "_blank");
  };

  return (
    <div className="mb-5 mt-5 relative py-10 sm:py-30 w-[100%] bg-[#FF5001] rounded-[28px] overflow-hidden flex items-center justify-center">
      <div className="hidden lg:block absolute inset-0 bottom-0 left-[35%] radial-gradient"></div>

      <div
        className="absolute inset-0 bg-cover  bg-no-repeat opacity-10 "
        style={{ backgroundImage: `url(${Hiro_section_bg.src})` }}
      ></div>

      <div className="flex flex-col justify-center items-center relative z-10">
        <h1
          className={cn(
            "font-semibold text-[32px] lg:text-[56px] leading-[38.2px] lg:leading-[67.2px] text-white text-center px-[20%] lg:px-0",
            fontMonrope.className
          )}
        >
          Ready to Maximize <br /> your BTC’s value?
        </h1>
        <p
          className={cn(
            "font-normal text-[16px] lg:text-[18px] leading-[19.2px] lg:leading-[25.2px] text-white text-center px-[20%] lg:px-0 mt-5 sm:mt-0",
            fontMonrope.className
          )}
        >
          Join BIMA today and start earning yield while keeping full{" "}
          <br className="hidden lg:block" /> control of your Bitcoin.
        </p>

        <div className="flex gap-5 flex-col lg:flex-row items-center mt-10">
          <button
            className={cn(
              "group flex gap-2 items-center justify-center text-[16px] font-[500] leading-[19.2px] h-[48px] w-[295px] lg:w-[196px] rounded-[12px] text-[#FF5001] bg-white cursor-pointer z-10 relative overflow-hidden transition-all duration-500 ",
              fontMonrope.className
            )}
            onClick={handleConnectClick}
          >
            Launch App
            <ArrowRight className="size-[20px] transition-all group-hover:translate-x-2 group-hover:scale-125" />
          </button>

          {/* <Link
            className={cn(
              "group relative flex gap-2 items-center justify-center text-[16px] font-[500] h-[48px] w-[295px] lg:w-[196px] rounded-[12px] bg-white/15 border-[0.5px] border-white/25 bg-opacity-5 backdrop-blur-2xl text-white overflow-hidden transition-all",
              fontMonrope.className
            )}
            href={"#Howitworks"}
          >
            <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-[12px] bg-white/15 transition-all duration-300 ease-out group-hover:translate-y-14"></span>

            <span className="relative z-10">How it Works</span>
            <ChevronDown className="relative z-10 size-[20px]" />
          </Link> */}
        </div>
      </div>
      <style jsx>{`
        .radial-gradient {
          background: radial-gradient(
            circle at bottom,
            rgba(255, 255, 255, 0.7),
            transparent 60%
          );
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

function PrismaDiscord() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;

      const checkDarkMode = () => {
        setIsDarkMode(htmlElement.classList.contains("dark"));
      };

      // Check on initial render
      checkDarkMode();

      // Listen for changes to the `class` attribute on <html> to detect mode switching
      const observer = new MutationObserver(() => {
        checkDarkMode();
      });

      observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      // Cleanup observer on component unmount
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      className={cn(
        " w-[100%] lg:min-h-[310px] mt-5 flex flex-col lg:flex-row gap-2 mb-5",
        fontMonrope.className
      )}
    >
      <div className="relative order-2 lg:order-1 w-[100%] lg:w-[70%] bg-white pt-8 lg:pt-24 ps-10 lg:ps-30  rounded-[28px] dark:bg-[#1A1A1A] transition ease-in-out">
        <Image
          src={isDarkMode ? Footer_logo_dark : Footer_logo}
          alt="Logo"
          className="w-[28%] lg:w-fit"
        />

        <div
          className={cn(
            "flex flex-wrap gap-8 lg:gap-14 text-[16px] font-[500] leading-[19.2px] mt-8 lg:mt-16 mb-5 lg:mb-0 text-black/70 dark:text-[#B2B1B0]",
            fontMonrope.className
          )}
        >
          <Link
            href={"#Howitworks"}
            className="w-[40%] lg:w-fit transition-transform duration-300 hover:rotate-3 hover:scale-110" // Tilt and scale on hover
          >
            How it Works
          </Link>
          <Link
            href={"#Investors"}
            className="w-[40%] lg:w-fit transition-transform duration-300 hover:rotate-3 hover:scale-110"
          >
            Investors
          </Link>
          <Link
            href={"#Blogs"}
            className="w-[40%] lg:w-fit transition-transform duration-300 hover:rotate-3 hover:scale-110"
          >
            Blogs
          </Link>
          <Link
            href={
              "https://drive.google.com/drive/folders/1g0uqwbAhfgF-ozdQDepA4y-NAy4Ir9GQ?usp=sharing"
            }
            className="w-[40%] lg:w-fit transition-transform duration-300 hover:rotate-3 hover:scale-110"
          >
            Media Kits
          </Link>
        </div>
      </div>
      <div className=" w-[100%] lg:w-[30%] order-1 lg:order-2 bg-white rounded-[28px] px-[3%] lg:px-[1.5%] py-[5%] lg:py-[2%] flex flex-col gap-5 dark:bg-[#1A1A1A]">
        <h2 className="text-[20px] lg:text-[24px] font-[600] px-2 lg:px-0 leading-[24px] lg:leading-[28.8px] text-[#0D0D12] dark:text-white">
          Join Bima Community!
        </h2>
        <p className="text-[16px] lg:text-[18px] px-2 lg:px-0 font-normal leading-[19.2px] lg:leading-[25.2px] text-[#666D80] dark:text-[#B2B1B0]">
          Love what we’re building? Come hang out with us across our socials
          while we build the future of defi on Bitcoin
        </p>

        <div className="flex flex-col xl:flex-row justify-around items-center gap-2 lg:gap-1 text-[14px] text-[#B53901] font-normal">
          <Link
            href={"https://t.me/Bimabtc"}
            className="bg-[#FFEEE6] flex items-center justify-center gap-1 h-[40px] w-full xl:w-fit px-2 rounded-[12px] dark:bg-[#8C2C01] dark:text-[#FFAF8A] transition-transform duration-300 lg:hover:rotate-2 lg:hover:scale-105"
          >
            <Image
              src={isDarkMode ? Telegram_dark : Telegram}
              alt="Telegram"
              className="h-[20px] w-[20px]"
            />{" "}
            Telegram
          </Link>
          <Link
            href={"https://x.com/bimabtc"}
            className="bg-[#FFEEE6] flex items-center justify-center text-[14px] gap-1 h-[40px] w-full xl:w-fit px-[8px] rounded-[12px] dark:bg-[#8C2C01] dark:text-[#FFAF8A] transition-transform duration-300 lg:hover:rotate-2 lg:hover:scale-105"
          >
            <Image
              src={isDarkMode ? X_dark : X}
              alt="X"
              className="h-[18px] w-[18px]"
            />{" "}
            X(Formerly Twitter)
          </Link>
          <Link
            href={"https://www.linkedin.com/company/bimabtc"}
            className="bg-[#FFEEE6] flex items-center justify-center gap-1 h-[40px] w-full xl:w-fit px-2 rounded-[12px] dark:bg-[#8C2C01] dark:text-[#FFAF8A] transition-transform duration-300 lg:hover:rotate-2 lg:hover:scale-105"
          >
            <Image
              src={isDarkMode ? Linkedin_dark : Linkedin}
              alt="LinkedIn"
              className="h-[20px] w-[20px]"
            />{" "}
            LinkedIn
          </Link>
        </div>

        <Link
          className="group relative h-[36px] w-[100%] bg-[#FF5001] rounded-[12px] border-b-[1px] border-[#B53901] flex justify-center items-center gap-2 text-[14px] font-[500] text-white overflow-hidden transition-all"
          href={"https://discord.com/invite/WgR5kMz3HG"}
          target="_blank"
        >
          <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-[12px] bg-white/15 transition-all duration-300 ease-out group-hover:translate-y-14"></span>

          <span className="relative z-10">Join Our Discord</span>
          <Image
            src={Discord}
            alt="Discord"
            className="size-[18px] mt-[2px] relative z-10"
            onClick={() =>
              window.open("https://discord.com/invite/WgR5kMz3HG", "_blank")
            }
          />
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-[100vh]">
      <HeroSection />
      {/* <UnlockSection /> */}
      <BIMAWorks />
      <Dashboard />
      <SupportedBlockchain />
      {/* <Collateral /> */}
      {/* <Advantage /> */}
      {/* <FriendFamily /> */}
      <FundriseHistory />
      <Audited />
      <WhatsNew />
      <FAQ />
      <StartApp />
      <PrismaDiscord />
    </div>
  );
}
