import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { COMPANY_INFO } from "./constants"

// ✅ adjust these import paths to match your project
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

export const metadata: Metadata = {
  title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
  description: `${COMPANY_INFO.name} connects healthcare professionals with premier opportunities nationwide. Specializing in travel nursing, per diem staffing, and permanent placements.`,
  keywords:
    "healthcare staffing, travel nursing, per diem nursing, permanent placement, allied health staffing",
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
