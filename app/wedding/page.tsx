import type { Metadata } from "next"
import Image from "next/image"
import PricingCards from "@/components/pricing/PricingCards"
import BookingForm from "@/components/BookingForm"
import { getWeddingPackages, getWeddingPackageItems } from "@/lib/sheets"

export const metadata: Metadata = {
  title: "Wedding Photo Booth Rental | Capsule Photo Booth",
  description:
    "Elegant wedding photo booth rental serving Northern California. Choose between our modern white booth or vintage oak wooden booth. Professional DSLR camera, custom templates, and 72-hour gallery delivery.",
  keywords:
    "wedding photo booth rental, San Jose wedding photo booth, Bay Area wedding photo booth, Northern California wedding photo booth, vintage photo booth wedding",
}

const FAQ_ITEMS = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 3–6 months in advance, especially for peak wedding season (May–October). If you have a venue and date, reach out now to check availability.",
  },
  {
    q: "How long does setup and breakdown take?",
    a: "We typically arrive 60–90 minutes before your event starts to set up. Breakdown takes about 30–45 minutes after the event ends. Both are included in every package at no extra charge.",
  },
  {
    q: "Can we customize the photo template?",
    a: "Yes! Every package includes a custom photo template designed to match your wedding theme and colors. We work with you ahead of time to finalize the design before your big day.",
  },
  {
    q: "How do guests receive their photos?",
    a: "Guests can receive instant prints at the event (included in select packages). A full digital gallery is delivered within 72 hours via a shareable link so everyone can download their favorites.",
  },
  {
    q: "Do you travel outside the San Jose area?",
    a: "Yes — we serve all of Northern California. Travel fees may apply depending on distance. Include your venue location in your inquiry and we'll confirm availability and any travel costs.",
  },
  {
    q: "What if our venue has low lighting?",
    a: "Our setup includes professional ring lighting specifically designed to produce crisp, flattering photos in any venue condition — dimly lit ballrooms included.",
  },
  {
    q: "Can the packages be customized?",
    a: "Absolutely. We never want pricing to be a barrier to creating lasting memories. If a package exceeds your budget, let us know and we'll work with you to find a solution.",
  },
]

// TODO: Replace with real client testimonials once collected
const TESTIMONIALS = [
  {
    name: "Sarah & James M.",
    event: "Wedding at The Fairmont, San Jose — October 2024",
    quote:
      "Our guests absolutely loved it. The photo strips became instant keepsakes and the wooden booth looked stunning next to our floral arrangements. Couldn't have asked for a better experience.",
  },
  {
    name: "Priya & Daniel K.",
    event: "Wedding at Villa Montalvo, Saratoga — August 2024",
    quote:
      "From the first inquiry to the night of our wedding, the team was professional and incredibly easy to work with. The gallery was delivered the very next day — so many beautiful memories.",
  },
  {
    name: "Michelle & Ryan T.",
    event: "Wedding at The Westin, San Francisco — June 2024",
    quote:
      "We added the audio guest book as an add-on and it was a huge hit. Everyone had something heartfelt to say. We still listen to it regularly. 10/10 would recommend.",
  },
]

const BOOTH_FEATURES = [
  {
    bold: "Vintage oak wooden booth",
    rest: "with added monitors for a visually stunning setup.",
  },
  {
    bold: "Professional DSLR camera",
    rest: "delivering gallery-quality photos throughout your event.",
  },
  {
    bold: "Premium ring lighting",
    rest: "for crisp, flattering photos in any venue.",
  },
  {
    bold: "Professional-grade printer",
    rest: "for fast, extra-crisp instant prints guests take home.",
  },
  {
    bold: "Advanced photo booth software",
    rest: "with multiple capture modes and live gallery display.",
  },
]

const ADD_ONS = [
  "Audio Guest Book",
  "Wooden Audio Guest Book Stand",
  "Photo Print Binder Keepsake",
  "Guest Book",
  "Fatheads",
  "Custom Backdrop",
]

export default async function WeddingPage() {
  const [packages, items] = await Promise.all([
    getWeddingPackages(),
    getWeddingPackageItems(),
  ])

  const packagesWithItems = packages.map((p) => ({
    ...p,
    items: items
      .filter((i) => i.tierKey === p.tierKey)
      .map((i) => ({ item: i.item, type: i.type })),
  }))

  return (
    <main className="bg-white pb-20 md:pb-0">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="section-padding pt-28 bg-linear-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                  Weddings
                </span>
              </div>

              <h1 className="heading-1">
                Your Wedding,{" "}
                <span className="text-primary">Beautifully Captured</span>
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                A photo booth experience designed to feel elevated, polished,
                and effortless for you and your guests. Professional DSLR
                quality, instant prints, and a digital gallery within 72 hours.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#packages" className="btn-primary">
                  View Packages
                </a>
                <a href="#inquire" className="btn-secondary">
                  Check Availability
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-3xl font-extrabold text-primary">3</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Package Options
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-primary">
                    72hr
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Gallery Delivery
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-primary">
                    NorCal
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Service Area</div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-96 lg:h-125">
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent z-10" />
              <Image
                src="/new-photo-booth.jpeg"
                alt="Capsule Photo Booth wedding setup"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Booth Features ───────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-3xl shadow-lg">
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/10 to-transparent" />
              <Image
                src="/wedding-pricing.png"
                alt="Wedding photo booth setup details"
                width={1200}
                height={900}
                className="h-80 w-full object-cover sm:h-105 lg:h-130"
              />
            </div>

            <div className="space-y-6">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                What We Offer
              </span>
              <h2 className="heading-2">
                Built for Your Wedding Day
              </h2>
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                Every detail of our wedding setup is designed to feel polished
                and effortless — for you and your guests.
              </p>
              <ul className="space-y-3">
                {BOOTH_FEATURES.map(({ bold, rest }, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        {bold}
                      </span>{" "}
                      {rest}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booth Choice Callout ─────────────────────────────── */}
      <div className="bg-linear-to-b from-gray-50 to-white py-10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto rounded-2xl border border-primary/15 bg-white px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                Your choice of booth is included with every package.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Pick our sleek modern white booth or the vintage oak wooden
                booth — whichever fits your wedding aesthetic.
              </p>
            </div>
            <a href="#inquire" className="btn-primary shrink-0 text-center">
              Check Availability
            </a>
          </div>
        </div>
      </div>

      {/* ── Packages ─────────────────────────────────────────── */}
      <section
        id="packages"
        className="section-padding bg-linear-to-b from-gray-50 to-white"
      >
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Pricing
            </span>
            <h2 className="heading-2 mt-4">Wedding Packages</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Clear tiers that scale with coverage and experience design. No
              confusing add-on maze.
            </p>
          </div>

          <div className="mt-12">
            <PricingCards packages={packagesWithItems as any} />

            {/* Add-Ons */}
            <div className="mt-16 max-w-3xl mx-auto text-center">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Optional Add-Ons
              </span>
              <h3 className="heading-3 mt-4">Enhance Your Experience</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A curated selection of add-ons to elevate your photo booth
                experience. Available for an additional fee, discussed when
                finalizing your contract.
              </p>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {ADD_ONS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      {/* TODO: Add more real wedding photos as they become available */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Gallery
            </span>
            <h2 className="heading-2 mt-4">See It in Action</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              A glimpse of what your guests will experience — an elegant wooden
              booth, studio-quality photos, and moments worth keeping forever.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden aspect-3/4 shadow-md">
              <Image
                src="/new-photo-booth.jpeg"
                alt="Capsule Photo Booth wedding setup"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-3/4 shadow-md">
              <Image
                src="/wedding-pricing.png"
                alt="Wedding photo booth experience"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      {/* TODO: Replace placeholder quotes with real client testimonials */}
      <section className="section-padding bg-linear-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="heading-2 mt-4">What Couples Are Saying</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={s}
                      className="w-4 h-4 text-primary fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed text-sm italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                FAQ
              </span>
              <h2 className="heading-2 mt-4">Common Questions</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {FAQ_ITEMS.map(({ q, a }, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer select-none [list-style:none] [&::-webkit-details-marker]:hidden">
                    <span className="font-semibold text-gray-800 pr-4">{q}</span>
                    <span className="shrink-0 text-primary text-2xl font-light transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed pr-8">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ─────────────────────────────────────── */}
      <section
        id="inquire"
        className="section-padding bg-linear-to-b from-gray-50 to-white"
      >
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Inquire
              </span>
              <h2 className="heading-2 mt-4">Check Your Date</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Send over your venue and date and we&apos;ll confirm
                availability fast — usually within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <BookingForm defaultEventType="Wedding" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky mobile CTA ────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-gray-200 p-4 shadow-lg">
        <a href="#inquire" className="btn-primary block text-center w-full">
          Check Availability
        </a>
      </div>
    </main>
  )
}
