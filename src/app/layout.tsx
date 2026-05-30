import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blue Tokai Coffee Roasters | Kalyani Nagar — India's Specialty Coffee",
  description: "Step into Blue Tokai's flagship Kalyani Nagar café — where India's finest specialty coffees meet thoughtful design, craftsmanship, and community. From farm to cup.",
  keywords: ["Blue Tokai", "specialty coffee", "Kalyani Nagar", "Pune", "coffee roasters", "Indian coffee", "artisan coffee", "single origin"],
  authors: [{ name: "Blue Tokai Coffee Roasters" }],
  icons: {
    icon: "/images/bean-icon.png",
  },
  openGraph: {
    title: "Blue Tokai Coffee Roasters | Kalyani Nagar",
    description: "India's Specialty Coffee Story — From Farm to Cup",
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
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
