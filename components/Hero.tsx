"use client"

import { COMPANY_INFO } from "@/app/constants"
import PhotoStripFan from "./PhotoStripFan"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-30 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/10 to-primary/5"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="bg-secondary/20 text-primary-dark px-4 py-2 rounded-full text-sm font-semibold">
                Photo Booth Rental Services
              </span>
            </div>

            <h1 className="heading-1">Helping You Capsule The Memories</h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {COMPANY_INFO.tagline}. Every photo tells a story - and we've had
              the joy of capturing thousands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#weddings" className="btn-primary text-center">
                Have a June 2026+ Wedding?
              </a>
              <a
                href="#contact"
                className="bg-white hover:bg-gray-50 text-primary border-2 border-primary font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-center"
              >
                Contact Us
              </a>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">7,092+</div>
                <div className="text-sm text-gray-600">
                  Photos Taken in 2025
                </div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-primary">40+</div>
                <div className="text-sm text-gray-600">Print Templates</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="relative overflow-hidden">
            <PhotoStripFan />
          </div>
        </div>
      </div>
    </section>
  )
}
