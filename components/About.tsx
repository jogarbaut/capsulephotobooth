"use client"

import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative h-125 rounded-3xl overflow-hidden shadow-xl bg-gray-100">
              <Image
                src="/about.png"
                alt="Capsule Photo Booth setup"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-block">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>
            </div>

            <h2 className="heading-2">Who is Capsule Photo Booth?</h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We're a proud AAPI-owned small business built on the belief that
                the best events feel effortless for the host and unforgettable
                for the guests. We take the time to thoughtfully plan and curate
                every detail, so you can relax and enjoy your celebration
                without worrying about the logistics.
              </p>

              <p>
                One of the best compliments we receive is how naturally we
                connect with guests and add a special, personal energy to each
                event. From the setup to the final print, everything we do is
                tailored to your vision, ensuring your event feels intentional,
                seamless, and uniquely yours.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-4xl text-primary">14+</div>
                <div className="font-semibold text-gray-800">
                  Events Attended
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl text-primary">11</div>
                <div className="font-semibold text-gray-800">
                  Months in Business
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="btn-primary inline-block mt-4 cursor-pointer"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
