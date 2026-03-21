import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vincent | Vercel Daily News | Solution Partner Certification Program (Cohort 2)",
  description: "A high-performance news application built with Next.js and deployed on Vercel, demonstrating advanced capabilities in App Router architecture, caching strategies, and edge delivery.",
  openGraph: {
     type: "website",
      url: "vercel-daily-one.vercel.app",
      title: "Vincent | Vercel Daily News",
      description: "A high-performance news application built with Next.js and deployed on Vercel, demonstrating advanced capabilities in App Router architecture, caching strategies, and edge delivery.",
      siteName: "Vincent | Vercel Daily News",
      images: [{ url: "https://vercel-daily-one.vercel.app/next.svg" }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
