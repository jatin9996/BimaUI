"use client";
import { useEffect, useRef } from "react";
import merge from "lodash.merge";
import { Space_Grotesk } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import Script from "next/script";

// Font setup
const inter = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Minimal Open Graph / Social Media Tags */}
        <meta property="og:image" content="public/Bima_logo.svg" />
        {/* <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}

        {/* Minimal Twitter Card */}
        <meta name="twitter:card" content="public/Bima_logo.svg" />
        <meta name="twitter:image" content="public/Bima_logo.svg" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="hotjar-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function (c, s, q, u, a, r, e) {
              c.hj = c.hj || function () { (c.hj.q = c.hj.q || []).push(arguments) };
              c._hjSettings = { hjid: a };
              r = s.getElementsByTagName('head')[0];
              e = s.createElement('script');
              e.async = true;
              e.src = q + c._hjSettings.hjid + u;
              r.appendChild(e);
            })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 5261437);
          `,
          }}
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CVS57W4CGG"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-CVS57W4CGG');
      `,
          }}
        />

      <script
          dangerouslySetInnerHTML={{
            __html: `
            var script = document.createElement('script');
            script.src = "https://tag.safary.club/stag-0.1.15.js";
            script.async = true;
            script.setAttribute('data-name', 'safary-sdk');
            script.setAttribute('data-product-id', 'prd_u3b5vrO3QA');
            script.integrity = "sha256-3dUQA9SE58bi/MmqBBcbtTZlwgpjTwR6JWJCU8cKh9g=";
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);
          `,
          }}
        />


      </head>
      {/* <!-- Google tag (gtag.js) --> */}
      <body
        className={cn(
          inter.className,
          "bg-[#EEEEEE] dark:bg-[#212121] mx-4 flex flex-col justify-center overflow-x-hidden "
        )}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
