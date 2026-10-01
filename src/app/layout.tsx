import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Mesa Kitchen — Fresh Meal Kits, Delivered",
  description:
    "Weekly meal kits with farm-fresh ingredients, chef-crafted recipes, and flexible plans. Real food, real simple.",
  openGraph: {
    title: "Mesa Kitchen — Fresh Meal Kits, Delivered",
    description:
      "Weekly meal kits with farm-fresh ingredients, chef-crafted recipes, and flexible plans.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}