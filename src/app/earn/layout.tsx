// app/vaults/layout.tsx
import React from "react";
import { EarnProvider } from "./contextFile";

export default function EarnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EarnProvider>
      <div>
        <main>
        <head>
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
        {children}
        </main>
      </div>
    </EarnProvider>
  );
}
