import type { Metadata } from "next";
import { Monoton, Tenor_Sans, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const monoton = Monoton({
  subsets: ["latin"],
  variable: "--font-monoton",
  weight: "400",
});

const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  variable: "--font-tenor",
  weight: "400",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-share-tech",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Stylish Name Generator — Copy-Paste Fancy Fonts for BGMI, Free Fire & Instagram",
  description:
    "Free stylish name maker with every Unicode font in one place. I built this after CS:GO — type your name, compare styles, copy in one click. Tips for BGMI, Free Fire, Instagram & more.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    url: SITE_URL,
    siteName: "Stylish Name Generator",
    locale: "en_IN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Stylish Name Generator",
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Generate stylish names using Unicode fancy fonts for Instagram, BGMI, Free Fire and more.",
  offers: { "@type": "Offer", price: "0" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${monoton.variable} ${tenorSans.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <div className="site-bg" aria-hidden="true">
          <div className="site-bg__orb site-bg__orb--pink" />
          <div className="site-bg__orb site-bg__orb--lime" />
          <div className="site-bg__orb site-bg__orb--cyan" />
        </div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
