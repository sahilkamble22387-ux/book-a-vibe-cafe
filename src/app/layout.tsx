import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nothing Before Coffee | NBC — Bring on the Buzz",
  description:
    "Born in India, Nothing Before Coffee is where mornings begin, ideas flow, and communities connect. High quality coffee, budget friendly prices, zero compromise. Visit our Kalyani Nagar, Pune café.",
  keywords: [
    "Nothing Before Coffee",
    "NBC",
    "coffee shop",
    "Kalyani Nagar",
    "Pune",
    "Shrappe",
    "specialty coffee",
    "cafe",
    "Indian coffee chain",
  ],
  authors: [{ name: "Nothing Before Coffee" }],
  openGraph: {
    title: "Nothing Before Coffee | Bring on the Buzz",
    description: "High quality coffee. Budget friendly prices. Zero compromise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased bg-background text-foreground font-sans`}
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
