import React from "react";
import Frame_1 from "@/assets/images/whatsnew/Frame_1.svg";
import Frame_2 from "@/assets/images/whatsnew/Frame_2.svg";
import Frame_3 from "@/assets/images/whatsnew/Frame_3.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";

const fontMonrope = Manrope({ subsets: ["latin"] });

const cardData = [
  {
    id: 1,
    src: Frame_1,
    heading: "BIMA: A STABLE FORCE IN THE BITCOIN NETWORK.",
    tagline:
      "Bima as an innovative force leverages the secure power of the Bitcoin network, reinstating what has already been done at MarkerDAO and Prisma finance, but this time in a more unique decentralized technological method.",
    link: "https://medium.com/@Bimabtc/bima-a-stable-force-in-the-bitcoin-network-a3e167e76652",
  },
  {
    id: 2,
    src: Frame_2,
    heading: "Bitcoin Ordinals — A Paradigm in Bitcoin",
    tagline:
      "Bitcoin has been around since 2009, and while it’s primarily known as a decentralized digital currency, it’s constantly drifting towards Defi systems and Non-fungible tokens.",
    link: "https://medium.com/@Bimabtc/bitcoin-ordinals-a-paradigm-in-bitcoin-8698d2ecf2c2",
  },
  {
    id: 3,
    src: Frame_3,
    heading: "BTCFi: BITCOIN DEFI EXPLAINED.",
    tagline:
      "From the inception of Blockchain Technology in 2008, decentralization has been the foundation on which this technology stands. ",
    link: "https://medium.com/@Bimabtc/btcfi-bitcoin-defi-explained-4c1d5852a418",
  },
];

const Cards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1 md:p-10">
      {cardData.map((card) => (
        <a href={card.link} target="_blank" rel="noreferrer" className="w-full">
          <div
            key={card.id}
            className="bg-white/10 lg:min-h-[387px] backdrop-blur-[20px] rounded-[20px] py-[10px] shadow-md flex flex-col items-center border border-white/20 transition-transform transform hover:shadow-lg duration-100 ease-in-out h-full"
          >
            <Image
              src={card.src}
              alt={card.heading}
              className="w-[90%] lg:w-[85%] h-[161px] rounded-[6px] object-cover mt-4 mb-2 lg:mb-4 hover:scale-105 duration-100 ease-in-out"
            />

            <div className="px-5 lg:px-8 mt-3 lg:mt-8 flex-grow">
              <h2
                className={cn(
                  "text-[16px] lg:text-[18px] font-700 mb-2 text-white leading-[19.2px] lg:leading-[21.6px]",
                  fontMonrope.className
                )}
              >
                {card.heading}
              </h2>

              <p
                className={cn(
                  "text-[14px] font-400 mb-2 text-white leading-[16.8px] lg:leading-[19.2px]",
                  fontMonrope.className
                )}
              >
                {card.tagline}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Cards;
