"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Manrope } from "next/font/google";
import Image from "next/image";

import WaterDrop from "@/assets/images/tokenImg/WaterDrop.png";
import { ReactNode, useState } from "react";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
const inter = Manrope({ subsets: ["latin"] });

const VBtnBG = ({ varient }: { varient?: string }) => {
  const uid = Math.random().toString(36).substring(7);
  return (
    <svg
      width="301"
      height="44"
      viewBox="0 0 301 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="64.9083"
        cy="35.0058"
        rx="94.3523"
        ry="94.4893"
        transform="rotate(-120 64.9083 35.0058)"
        fill={`url(#paint0${uid}_radial_150_2737)`}
      />
      <ellipse
        cx="278.361"
        cy="43.3422"
        rx="36.8334"
        ry="36.8869"
        transform="rotate(-75 278.361 43.3422)"
        fill={`url(#paint1${uid}_radial_150_2737)`}
      />
      <defs>
        <radialGradient
          id={`paint0${uid}_radial_150_2737`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(167.754 84.0029) rotate(-101.614) scale(109.767 172.378)"
        >
          {varient === "bluish" ? (
            <>
              <stop offset="0.257459" stopColor="#AAAEFF" />
              <stop offset="1" stopColor="#6C17F7" />
            </>
          ) : (
            <>
              <stop offset="0.257459" stopColor="#FFBEAA" />
              <stop offset="1" stopColor="#F74A17" />
            </>
          )}
        </radialGradient>
        <radialGradient
          id={`paint1${uid}_radial_150_2737`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(318.51 62.4698) rotate(-101.614) scale(42.8511 67.2934)"
        >
          {varient === "bluish" ? (
            <>
              <stop offset="0.257459" stopColor="#AAAEFF" />
              <stop offset="1" stopColor="#6C17F7" />
            </>
          ) : (
            <>
              <stop offset="0.257459" stopColor="#FFBEAA" />
              <stop offset="1" stopColor="#F74A17" />
            </>
          )}
        </radialGradient>
      </defs>
    </svg>
  );
};

interface IVBtnProps extends ButtonProps {
  children: ReactNode | ReactNode[];
  rootClassName?: ClassValue;
  varient?: "orange" | "bluish";
}
export const VBtn = ({
  children,
  className,
  varient,
  rootClassName,
  ...args
}: IVBtnProps) => (
  <>
    <Button
      {...args}
      variant={varient === "bluish" ? "ghost" : "primary"}
      className={cn(
        "font-semibold relative h-[44px]  w-[301px] overflow-hidden rounded-xl",
        {
          "text-white": varient === "bluish",
          "hover:text-white": varient === "bluish",
          "bg-[#6C17F7]": varient === "bluish",
          "hover:bg-[#6d17f7cb]": varient === "bluish",
        },
        rootClassName
      )}
    >
      <div className={cn("w-full h-full z-10", className)}> {children}</div>
      <span className="absolute top-0 left-0">
        <VBtnBG varient={varient} />
      </span>
    </Button>
  </>
);
export interface IVaultCardProps<T extends { label: string; value: string }> {
  //   title: string;
  //   version: string;
  //   subTitle: string;
  isLRT?: boolean;
  buttomButton?: boolean;
  data: Array<{ title: string; value: ReactNode }>;
  tabValues?: Array<T>;
  onTabChange?: (value: T) => void;
}
export function VaultCard<T extends { label: string; value: string }>(
  props: IVaultCardProps<T>
) {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(props.tabValues?.[0]);
  return (
    <Card className=" shadow-md border-0 rounded-xl">
      <CardHeader className="items-center flex-row border-b border-dashed ">
        <Image src={WaterDrop} width={35} height={35} alt="wstETH" />
        <div className="ml-3">
          <p className="flex items-center space-x-2 h-4">
            <span className={cn(inter.className, "font-semibold text-xl")}>
              stBTC
            </span>
            {/* <span className="font-medium ">V2</span> */}
          </p>
          <span
            className={cn(
              inter.className,
              "text-muted-foreground text-xs font-medium"
            )}
          >
            Lido stBTC
          </span>
        </div>
        {props.tabValues && (
          <div className="ml-auto">
            {props.tabValues.map((v, i) => (
              <button
                key={i}
                onClick={() => {
                  props.onTabChange?.(v);
                  setTabValue(v);
                }}
                className={cn(
                  "px-3 py-1 rounded-md font-semibold",
                  inter.className,
                  {
                    "bg-theme": v.value === tabValue?.value,
                    "text-white": v.value === tabValue?.value,
                    "dark:text-black": v.value === tabValue?.value,
                  }
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="border-b border-dashed mb-5">
        {props.data.map((data) => (
          <div className="flex justify-between p-2" key={data.title}>
            <span
              className={cn(
                inter.className,
                "text-xs font-semibold text-muted-foreground"
              )}
            >
              {data.title}
            </span>
            <span className={cn(inter.className, "text-xs font-semibold")}>
              {data.value}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col">
        {props.buttomButton && (
          <VBtn
            onClick={() => {
              router.push(`/vaults/deposit?token=${props.data[0].title}`);
            }}
            className="flex items-center justify-between"
            varient={props.isLRT ? "bluish" : "orange"}
          >
            <span className="font-light">APR</span>
            <p className="font-light flex items-center space-x-1">
              <span>6.70%</span>
              <MoveRight size={14} />
              <span>13.41%</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="10" fill="white" />
                <path d="M10 4L14 10L10 16L6 10L10 4Z" fill="#F74A17" />
              </svg>
            </p>
          </VBtn>
        )}
        <p className="p-4 text-center font-medium">Choose wstETH-V2</p>
      </CardFooter>
    </Card>
  );
}
