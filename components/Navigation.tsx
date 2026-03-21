"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { COMPANY_INFO, NAV_ITEMS } from "@/app/constants"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getHref = (href: string) => {
    if (!href.startsWith("#")) return href
    return isHome ? href : `/${href}` // "/#services" etc
  }

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    // Only intercept hash links
    if (!href.startsWith("#")) return

    e.preventDefault()

    const id = href.replace("#", "")

    if (isHome) {
      // Smooth-scroll on the home page without refresh
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      // From /wedding/[name], route to home + anchor
      router.push(`/#${id}`)
    }

    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href={getHref("#home")}
            onClick={handleNavClick("#home")}
            className="flex items-center space-x-3 group"
          >
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.png"
                alt={`${COMPANY_INFO.name} Logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden md:block">
              <div className="font-bold text-xl text-primary-dark">
                {COMPANY_INFO.shortName}
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = !item.href.startsWith("#") && pathname === item.href
              return (
                <a
                  key={item.href}
                  href={getHref(item.href)}
                  onClick={handleNavClick(item.href)}
                  className={`font-medium transition-colors duration-300 relative group ${
                    isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              )
            })}

            <a
              href={getHref("#contact")}
              onClick={handleNavClick("#contact")}
              className="btn-primary"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-primary transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-primary transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-primary transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 py-4">
            {NAV_ITEMS.map((item) => {
              const isActive = !item.href.startsWith("#") && pathname === item.href
              return (
                <a
                  key={item.href}
                  href={getHref(item.href)}
                  onClick={handleNavClick(item.href)}
                  className={`font-medium transition-colors duration-300 py-2 ${
                    isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              )
            })}

            <a
              href={getHref("#contact")}
              onClick={handleNavClick("#contact")}
              className="btn-primary text-center"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
