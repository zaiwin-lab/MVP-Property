import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "KB Kuching Top Apartments | AI Property Concierge",
  description:
    "Discover Kuching's finest apartments — Riverine, SkyVilla, and Milano Eight. AI-powered property concierge connecting you with trusted property partners.",
  keywords: "Kuching apartments, property investment, Riverine, SkyVilla, Milano Eight, KOBIS, Sarawak property",
  openGraph: {
    title: "KB Kuching Top Apartments",
    description: "Kuching's First AI-Powered Property Concierge Platform.",
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
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "#0a1628", color: "#ffffff" }}
      >
        {children}
      </body>
    </html>
  );
}
