import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

import TopLeftImg from "@/components/Layout/TopLeftImage/TopLeftImage";
import { Roboto } from "next/font/google";
import { PropsWithChildren } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Manatal News App",
  description: "",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`flex justify-center text-white bg-site bg-cover ${roboto.className}`}
      >
        <TopLeftImg />
        <main className="h-full w-full pt-20 px-[10%] z-20 lg:px-0 lg:max-w-[80%] ">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
