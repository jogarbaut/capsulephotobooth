"use client"

import Image from "next/image"

export default function WeddingsSection() {
  return (
    <section id="weddings" className="py-16 sm:py-20">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/10 to-transparent" />
            <Image
              src="/new-photo-booth.jpeg"
              alt="Our upgraded wedding photo booth setup"
              width={1200}
              height={900}
              className="h-80 w-full object-cover sm:h-105 lg:h-130"
              priority={false}
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-4 py-2 text-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-medium text-foreground/90">
                Now booking weddings:{" "}
                <span className="text-primary">June 2026+</span>
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-montserrat text-3xl font-bold tracking-tight sm:text-4xl">
                Elevating Our Wedding Photo Booth Experience
              </h2>
              <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
                2025 was good but we want to take it to the next level. Our
                upgraded wedding service is designed to feel elevated, polished,
                and effortless for you and your guests.
              </p>
            </div>

            {/* Feature bullets */}
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                <p className="text-foreground/85">
                  <span className="font-semibold text-foreground">
                    Vintage-inspired wooden oak booth
                  </span>{" "}
                  with an additional monitors for better, more visually
                  appealing setup.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                <p className="text-foreground/85">
                  <span className="font-semibold text-foreground">
                    Higher-quality photos
                  </span>{" "}
                  through a new professional camera setup.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                <p className="text-foreground/85">
                  <span className="font-semibold text-foreground">
                    Better lighting
                  </span>{" "}
                  for crisp photos in any venue.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                <p className="text-foreground/85">
                  <span className="font-semibold text-foreground">
                    New professional printer
                  </span>{" "}
                  for extra-crisp and faster prints.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                <p className="text-foreground/85">
                  <span className="font-semibold text-foreground">
                    New photo booth software
                  </span>{" "}
                  to allow for more capturing modes and gallery display.
                </p>
              </li>
            </ul>

            {/* CTA */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                Inquire for a Wedding June 2026+
              </a>
            </div>

            {/* Small note */}
            <p className="text-sm text-foreground/70">
              June 2026 dates are filling early. If you already have a venue +
              date, send them over and we will confirm availability fast. We
              will still be offering our current booth for events before then.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
