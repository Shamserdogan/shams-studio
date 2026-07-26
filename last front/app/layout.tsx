import React from "react";

export const metadata = {
  title: "SHAMS STUDIO | AI Creator & Digital Solutions",
  description: "SHAMS STUDIO by Shams Ud Din creates AI solutions, modern websites, creative designs, digital experiences, and technology-driven systems.",
  keywords: [
    "SHAMS STUDIO",
    "Shams Ud Din",
    "AI solutions",
    "modern websites",
    "creative designs",
    "digital experiences",
    "technology-driven systems",
    "Islamabad",
    "Pakistan",
    "Web Developer",
    "AI Creator"
  ],
  authors: [{ name: "Shams Ud Din", url: "https://shams-studio.com" }],
  openGraph: {
    title: "SHAMS STUDIO | AI Creator & Digital Solutions",
    description: "SHAMS STUDIO by Shams Ud Din creates AI solutions, modern websites, creative designs, digital experiences, and technology-driven systems.",
    url: "https://shams-studio.com",
    siteName: "SHAMS STUDIO",
    type: "website",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "SHAMS STUDIO - Engineering Futures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAMS STUDIO | AI Creator & Digital Solutions",
    description: "SHAMS STUDIO by Shams Ud Din creates AI solutions, modern websites, creative designs, digital experiences, and technology-driven systems.",
    images: ["/images/logo.svg"],
    creator: "@shams_ud_din",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#020617] text-slate-100">
        {children}
      </body>
    </html>
  );
}
