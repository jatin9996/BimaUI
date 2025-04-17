import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Manrope, Prosto_One } from "next/font/google";
import Image from "next/image";
import BitLayer from "@/assets/icons/bitlayer-logo.png";
import Lorenzo from "@/assets/images/tokenImg/lorenzo.png";

import WaterDrop from "@/assets/images/tokenImg/WaterDrop.png";
import { ReactNode } from "react";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Deposite from "./deposit/page";
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
        "font-semibold relative h-[35px]  w-[280px] overflow-hidden rounded-xl",
        {
          "text-white": varient === "bluish",
          "hover:text-white": varient === "bluish",
          "bg-[#6C17F7]": varient === "bluish",
          "hover:bg-[#6d17f7cb]": varient === "bluish",
        },
        rootClassName
      )}
    >
      <div className={cn("w-full h-full z-20", className)}> {children}</div>
      <span className="absolute top-0 left-0">
        <VBtnBG varient={varient} />
      </span>
    </Button>
  </>
);
export interface IVaultCardProps {
  title: string;
  image: string;

  subTitle: string;
  isLRT: boolean;
  data: string;
}
export const VaultCard = (props: IVaultCardProps) => {
  const formateddata = JSON.parse(props.data);

  const router = useRouter();
  return (
    <Card className=" shadow-md border-0 rounded-xl">
      <CardHeader className="items-center flex-row space-x-3 border-b border-dashed dark:border-gray-300">
        <img src={props.image} alt="wstBTC" height={35} width={35} />
        <div>
          <p className="flex items-center space-x-2 h-4">
            <span className={cn(inter.className, "font-semibold text-xl")}>
              {props.subTitle}
            </span>
            {/* <span className="font-medium ">V2</span> */}
          </p>
          <span
            className={cn(
              inter.className,
              "text-muted-foreground text-xs font-medium"
            )}
          >
            {/* {props.subTitle} */}
          </span>
        </div>
      </CardHeader>
      <CardContent className="border-b border-dashed mb-5 dark:border-gray-300">
        {formateddata.map((data: { title: string; value: string }) => (
          <div className="flex justify-between p-2 " key={data.title}>
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
        {/* <VBtn
          onClick={() => {
            router.push(`/vaults/deposit?vault=${props.title}`);
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
        <button
          onClick={() => {
            router.push(`/vaults/deposit?vault=${props.title}`);
          }}
          className="text-center text-[16px] font-medium text-[#75716C] bg-[#F5F5F4] h-[40PX] w-[90%] rounded-[12px] mt-2"
        >
          <p className="p-4 text-center font-medium">Choose stBTC</p>
        </VBtn> */}
      </CardFooter>
    </Card>
  );
};
