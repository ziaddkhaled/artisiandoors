import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/content/Footer";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
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
        <CartProvider>
          <LenisProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
