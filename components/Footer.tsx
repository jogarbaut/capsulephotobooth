"use client"

import Image from "next/image"
import { COMPANY_INFO, NAV_ITEMS } from "@/app/constants"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-linear-to-br from-primary-dark to-primary text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt={`${COMPANY_INFO.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-lg">
                  {COMPANY_INFO.shortName}
                </div>
                <div className="text-xs text-secondary-light">
                  Photo Booth Rental Services
                </div>
              </div>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              {COMPANY_INFO.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-gray-200 hover:text-secondary-light transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-200">
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="hover:text-secondary-light transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-secondary-light transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="pt-2">
                {COMPANY_INFO.address.street}
                <br />
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}{" "}
                {COMPANY_INFO.address.zip}
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              <a
                href={COMPANY_INFO.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Google"
              >
                G
              </a>
              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={COMPANY_INFO.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Yelp"
              >
                Y
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-200">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>
            {/* <div className="flex space-x-6 text-sm text-gray-200">
              <a href="#" className="hover:text-secondary-light transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-secondary-light transition-colors">
                Terms of Service
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
