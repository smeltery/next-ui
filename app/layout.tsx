import type { Metadata } from "next"
import localFont from "next/font/local"
import { Navbar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import "@fontsource-variable/dm-sans"
import "./globals.css"
const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
})
export const metadata: Metadata = {
  title: {
    default: "Next UI — Small details. Better interfaces.",
    template: "%s · Next UI"
  },
  description:
    "Nine copy-paste React components. Explore live previews, take the TypeScript source, and make every interaction your own.",
  metadataBase: new URL(
    process.env.SITE_URL || "https://next-ui-orcin-chi.vercel.app"
  ),
  openGraph: {
    title: "Next UI — Small details. Better interfaces.",
    images: [
      {
        url: process.env.SITE_URL
          ? "/brand/og.png"
          : "https://raw.githubusercontent.com/smeltery/next-ui/master/public/brand/og.png",
        width: 1200,
        height: 630,
        alt: "Next UI: small details, better interfaces. React, TypeScript, Tailwind CSS."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    images: [
      process.env.SITE_URL
        ? "/brand/og.png"
        : "https://raw.githubusercontent.com/smeltery/next-ui/master/public/brand/og.png"
    ]
  },
  robots: process.env.SITE_URL
    ? { index: true, follow: true }
    : { index: false, follow: false }
}
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id="top" className={sans.variable}>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
