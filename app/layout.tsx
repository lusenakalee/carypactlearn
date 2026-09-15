import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LocaleProvider from '@/components/LocaleProvider';
import { Analytics } from "@vercel/analytics/next"
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";



const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carypactlearn.vercel.app"),

  title: {
    default: "CaryPact Learning Hub | CaryPact, BOT Chain & CA Tokenomics",
    template: "%s | CaryPact Learning Hub",
  },

  description:
    "Independent educational resources explaining CaryPact, decentralized supercomputing, BOT Chain, CA tokenomics, dynamic parity and Proof-of-Stake staking.",

  keywords: [
    "CaryPact",
    "CaryPact Learning Hub",
    "BOT Chain",
    "CA token",
    "CaryPact tokenomics",
    "dynamic parity",
    "Proof of Stake",
    "decentralized supercomputing",
  ],

  openGraph: {
    title: "CaryPact Learning Hub",
    description:
      "Learn about CaryPact, BOT Chain, CA tokenomics, dynamic parity and Proof-of-Stake.",
    url: "https://carypactlearn.vercel.app",
    siteName: "CaryPact Learning Hub",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {

      
  
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <meta name="google-site-verification" content="YyClvHr0evz7JeRgsGPMUl5MqYsf50243BQsq4icIOk" />
      <body className="min-h-full flex flex-col">
              <LocaleProvider>
              <SiteHeader/>  
        {children}
        <SiteFooter/>
        </LocaleProvider>
        <Analytics/>
        </body>
    </html>
  );
}
