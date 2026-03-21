import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { COMPANY_INFO } from "./constants"

import Navbar from "@/components/Navigation"
import Footer from "@/components/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
})

// Update NEXT_PUBLIC_SITE_URL in .env.local with your production domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://capsulephotobooth.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY_INFO.name} | Photo Booth Rental in Northern California`,
    template: `%s | ${COMPANY_INFO.shortName}`,
  },
  description:
    "Capsule Photo Booth offers professional photo booth rentals throughout Northern California. Choose our modern white booth or vintage oak wooden booth for weddings, birthdays, corporate events, and more.",
  keywords: [
    "photo booth rental",
    "photo booth rental San Jose",
    "wedding photo booth",
    "Bay Area photo booth",
    "Northern California photo booth",
    "corporate photo booth rental",
    "AAPI owned small business",
  ],
  openGraph: {
    type: "website",
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} | Photo Booth Rental in Northern California`,
    description:
      "Professional photo booth rentals for weddings, birthdays, and corporate events throughout Northern California.",
    images: [
      {
        url: "/new-photo-booth.jpeg",
        width: 1200,
        height: 630,
        alt: "Capsule Photo Booth setup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.name} | Photo Booth Rental in Northern California`,
    description:
      "Professional photo booth rentals for weddings, birthdays, and corporate events throughout Northern California.",
    images: ["/new-photo-booth.jpeg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
