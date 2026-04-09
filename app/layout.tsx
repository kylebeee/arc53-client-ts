import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletProviderWrapper from "@/providers/wallet";
import Arc53DataProvider from "@/providers/arc53-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARC53 BUILDER",
  description: "ARC53 BUILDER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProviderWrapper>
          <Arc53DataProvider>
            {children}
          </Arc53DataProvider>
        </WalletProviderWrapper>
      </body>
    </html>
  );
}
