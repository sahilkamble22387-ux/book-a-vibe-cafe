import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bookavibe — Book Cafe & Co-working Space | FC Road, Pune",
  description:
    "Where books meet brews and ideas come to life. Bookavibe is Pune's favourite book cafe and co-working space on FC Road. Premium Chikmagalur coffee, thousands of books, fast WiFi, and pocket-friendly pricing. Read, work, unwind.",
  keywords: [
    "Bookavibe",
    "book cafe",
    "co-working space",
    "FC Road",
    "Pune",
    "cafe with books",
    "work from cafe",
    "laptop friendly cafe",
    "open mic",
    "coffee shop",
  ],
  authors: [{ name: "Bookavibe" }],
  openGraph: {
    title: "Bookavibe — Book Cafe & Co-working Space",
    description: "Books. Bites. Business. The perfect blend of relaxation and productivity.",
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
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
