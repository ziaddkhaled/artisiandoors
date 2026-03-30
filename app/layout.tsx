import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/content/Footer";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://artisandoors.com"),
  title: {
    default: "ArtisanDoors | Luxury Bespoke Door Design Studio",
    template: "%s | ArtisanDoors",
  },
  description:
    "Handcrafted bespoke doors tailored to your home's unique character. Premium materials, artisan craftsmanship, architectural excellence.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "ArtisanDoors | Luxury Bespoke Door Design Studio",
    description:
      "Handcrafted bespoke doors tailored to your home's unique character.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArtisanDoors — Luxury Bespoke Door Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtisanDoors | Luxury Bespoke Door Design Studio",
    description:
      "Handcrafted bespoke doors tailored to your home's unique character.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-xl focus:outline-none"
        >
          Skip to main content
        </a>
        <CartProvider>
          <LenisProvider>
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
