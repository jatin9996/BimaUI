import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import bmBTC from "@/assets/images/tokenImg/bmBTC.png";
import Alex from "@/assets/icons/LST/Alex.png";
import Lorenzo from "@/assets/icons/LST/Lorenzo.jpg";
import iBTC from "@/assets/icons/LST/iBTC.png";
import Stakestone from "@/assets/icons/LST/Stakestone.svg";
import yBTC from "@/assets/icons/LST/yBTC.jpg";
import midas from "@/assets/icons/LST/midas.jpg";
import zeta from "@/assets/icons/LST/zeta.jpg";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import { manta } from "viem/chains";

interface BlockchainCardProps {
  src: StaticImageData;
  title: string;
  tagline: string;
  tag?: string;
  tag2?: string;
  tag3?: string;
  tag4?: string;
  tag5?: string;
  tag6?: string;
  tag7?: string;
  tag8?: string;
}

const fontManrope = Manrope({ subsets: ["latin"] });

const blockchainData: BlockchainCardProps[] = [
  {
    src: bmBTC,
    title: "bmBTC",
    tagline: "Liquid Staking Tokens(LSTs)",
    tag: "Bitlayer",
    tag2: "Holesky",
    tag3: "Merlin",
    tag4: "BNB Smart",
    tag5: "Avalanche Fuji",
    tag6: "Arbitrum Sepolia",
    tag7: "Base Sepolia",
    tag8: "Core Blockchain",
  },
  {
    src: Stakestone,
    title: "sBTC",
    tagline: "Liquid Staking Tokens(LSTs)",
    tag: "Ethereum",
    tag2: "Scroll",
    tag3: "BOB",
    tag4: "BNB Smart",
    tag5: "Aptos",
  },
  {
    src: Stakestone,
    title: "stoneBTC",
    tagline: "Liquid Staking Tokens(LSTs)",
    tag: "Ethereum",
  },
  {
    src: iBTC,
    title: "iBTC",
    tagline: "Liquid Staking Tokens(LSTs)",
    tag: "Base Sepolia",
    tag2: "Ethereum",
    tag3: "Arbitrum Sepolia",
    tag4: "BNB Smart",
    tag5: "Avalanche Fuji",
  },
  {
    src: zeta,
    title: "zetaBTC",
    tagline: "Liquid Staking Tokens(LSTs)",
    tag: "Zetachain",
    tag2: "Bitlayer",
  },
  {
    src: midas,
    title: "Midas mBTC",
    tagline: "Liquid Staking Tokens(LSTs)",
  },
  {
    src: Lorenzo,
    title: "Lorenzo",
    tagline: "Liquid Staking Tokens(LSTs)",
    tag: "Bitcoin",
    tag2: "Ethereum",
    tag3: "Bsquared",
    tag4: "BNB Smart",
  },
  {
    src: Alex,
    title: "aBTC",
    tagline: "Liquid Staking Tokens(LSTs)",
  },
  {
    src: yBTC,
    title: "Umoja yBTC",
    tagline: "Liquid Staking Tokens(LSTs)",
    tag: "Base Sepolia",
    tag2: "Arbitrum Sepolia",
    tag3: "Avalanche Fuji",
  },
];

const BlockchainCard: React.FC<BlockchainCardProps> = ({
  src,
  title,
  tagline,
  tag,
  tag2,
  tag3,
  tag4,
  tag5,
  tag6,
  tag7,
  tag8,
}) => (
  <div className="flex-shrink-0 justify-start w-[90%] lg:w-[365px] h-[300px] lg:h-[275px] ms-2 lg:ms-0 ps-5 pt-4 bg-white rounded-[24px] border border-[#DFE1E7] dark:bg-[#212121] dark:border-[#302F2E] cursor-grab">
    <Image src={src} alt={title} className="w-12 h-12 mt-2 rounded-full" />
    <h3
      className={cn(
        "text-[24px] font-semibold leading-[28.8px] mt-5 dark:text-[#EEEEEE]",
        fontManrope.className
      )}
    >
      {title}
    </h3>
    <p
      className={cn(
        "text-[14px] text-[#666D80] font-medium leading-[16.8px] mt-2 dark:text-[#EEEEEE]",
        fontManrope.className
      )}
    >
      {tagline}
    </p>
    <div className="flex flex-wrap gap-1 mt-4">
      {tag && (
        <span
          className={cn(
            "border border-[#DFE1E7] px-2 py-1 rounded-[8px] text-[14px] font-medium text-[#666D80] dark:text-[#EEEEEE]",
            fontManrope.className
          )}
        >
          {tag}
        </span>
      )}
      {tag2 && (
        <span
          className={cn(
            "border border-[#DFE1E7] px-2 py-1 rounded-[8px] text-[14px] font-medium text-[#666D80] dark:text-[#EEEEEE]",
            fontManrope.className
          )}
        >
          {tag2}
        </span>
      )}
      {tag3 && (
        <span
          className={cn(
            "border border-[#DFE1E7] px-2 py-1 rounded-[8px] text-[14px] font-medium text-[#666D80] dark:text-[#EEEEEE]",
            fontManrope.className
          )}
        >
          {tag3}
        </span>
      )}
      {tag4 && (
        <span
          className={cn(
            "border border-[#DFE1E7] px-2 py-1 rounded-[8px] text-[14px] font-medium text-[#666D80] dark:text-[#EEEEEE]",
            fontManrope.className
          )}
        >
          {tag4}
        </span>
      )}
      {tag5 && (
        <span
          className={cn(
            "border border-[#DFE1E7] px-2 py-1 rounded-[8px] text-[14px] font-medium text-[#666D80] dark:text-[#EEEEEE]",
            fontManrope.className
          )}
        >
          {tag5}
        </span>
      )}
      {tag6 && (
        <span
          className={cn(
            "border border-[#DFE1E7] px-2 py-1 rounded-[8px] text-[14px] font-medium text-[#666D80] dark:text-[#EEEEEE]",
            fontManrope.className
          )}
        >
          {tag6}
        </span>
      )}
      {tag7 && (
        <span
          className={cn(
            "border border-[#DFE1E7] px-2 py-1 rounded-[8px] text-[14px] font-medium text-[#666D80] dark:text-[#EEEEEE]",
            fontManrope.className
          )}
        >
          {tag7}
        </span>
      )}
      {tag8 && (
        <span
          className={cn(
            "border border-[#DFE1E7] px-2 py-1 rounded-[8px] text-[14px] font-medium text-[#666D80] dark:text-[#EEEEEE]",
            fontManrope.className
          )}
        >
          {tag8}
        </span>
      )}
    </div>
  </div>
);

const SupportedLst: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Drag functionality variables
  const isDragging = useRef(false);
  const startPosition = useRef(0);
  const scrollPosition = useRef(0);

  // Touch functionality variables
  const startTouchPosition = useRef(0);

  // Check scroll position and toggle left arrow button visibility
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      if (scrollLeft > 0) {
        setShowLeftArrow(true);
      } else {
        setShowLeftArrow(false);
      }
    }
  };

  // Add keyboard scroll functionality
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!sliderRef.current) return;

    if (e.key === "ArrowRight") {
      sliderRef.current.scrollBy({ left: 50, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      sliderRef.current.scrollBy({ left: -50, behavior: "smooth" });
    }
  };

  // Add event listener for keyboard input and scroll position
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", checkScrollPosition);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startPosition.current = e.clientX;
    if (sliderRef.current) {
      scrollPosition.current = sliderRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;

    const distance = e.clientX - startPosition.current;
    sliderRef.current.scrollLeft = scrollPosition.current - distance;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startTouchPosition.current = e.touches[0].clientX;
    if (sliderRef.current) {
      scrollPosition.current = sliderRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;

    const distance = e.touches[0].clientX - startTouchPosition.current;
    sliderRef.current.scrollLeft = scrollPosition.current - distance;
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      const isSmallScreen = window.matchMedia("(min-width: 640px)").matches;
      const scrollAmount = isSmallScreen ? 352 : 295;

      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      const isSmallScreen = window.matchMedia("(min-width: 640px)").matches;
      const scrollAmount = isSmallScreen ? 352 : 295;

      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const toggleView = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="relative p-4 sm:p-8">
      {!showAll ? (
        <>
          {/* For Slider View */}
          <div>
            <div
              ref={sliderRef}
              className="flex space-x-4 overflow-x-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the container
              onTouchStart={handleTouchStart} // For touch support
              onTouchMove={handleTouchMove} // For touch support
              onTouchEnd={handleMouseUp} // Reset after touch ends
            >
              {blockchainData.map((blockchain, index) => (
                <BlockchainCard key={index} {...blockchain} />
              ))}
            </div>

            {/* Left Arrow Button: Only show when user scrolls */}
            {showLeftArrow && (
              <button
                onClick={handlePrevClick}
                className="hidden lg:block absolute left-5 lg:-left-3 top-1/2 transform -translate-y-1/2 bg-black text-white p-[3px] lg:p-2 rounded-full dark:bg-white dark:text-black "
              >
                <ArrowLeft />
              </button>
            )}

            {/* Right Arrow Button: Always visible on desktop */}
            <button
              onClick={handleNextClick}
              className="hidden lg:block absolute right-0 lg:-right-3 top-1/2 transform -translate-y-1/2 bg-black text-white p-[3px] lg:p-2 rounded-full dark:bg-white dark:text-black"
            >
              <ArrowRight />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* For Grid View */}
          <div className="flex flex-wrap gap-3">
            {blockchainData.map((blockchain, index) => (
              <BlockchainCard key={index} {...blockchain} />
            ))}
          </div>
        </>
      )}

      {/* The View All / Default Button */}
      <div className="hidden lg:flex lg:justify-center">
        <button
          onClick={toggleView}
          className={cn(
            "h-[48px] w-[112px] mb-10 rounded-[12px] text-[14px] text-black border border-[#CBCBCA] dark:border-[#302F2E] dark:text-white absolute top-[-25px]",
            showAll ? "left-[87%]" : "left-[90%]"
          )}
        >
          {showAll ? "Default" : "View All"}
        </button>
      </div>
    </section>
  );
};

export default SupportedLst;
