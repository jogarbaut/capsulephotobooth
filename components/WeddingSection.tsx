import Image from "next/image"

const BOOTHS = [
  {
    badge: "Modern",
    name: "Sleek White Booth",
    description:
      "A clean, contemporary setup that blends seamlessly into any venue. Minimal and polished — a great fit for modern aesthetics.",
    image: "/about.png",
    alt: "Modern white sleek photo booth",
    features: [
      "Sleek white enclosure with a modern finish",
      "Professional DSLR camera for sharp, vivid photos",
      "Custom print templates to match your theme",
      "Instant prints and digital gallery sharing",
    ],
  },
  {
    badge: "Vintage",
    name: "Oak Wooden Booth",
    description:
      "A handcrafted wooden enclosure with a warm, vintage feel. Elegant and timeless — a natural fit for weddings and upscale events.",
    image: "/new-photo-booth.jpeg",
    alt: "Vintage oak wooden photo booth",
    features: [
      "Vintage-inspired oak enclosure with added display monitors",
      "Professional DSLR camera for gallery-quality photos",
      "Premium ring lighting for crisp photos in any venue",
      "Professional-grade printer for fast, extra-crisp prints",
    ],
  },
]

export default function BoothsSection() {
  return (
    <section id="booths" className="py-16 sm:py-20">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Our Booths
          </span>
          <h2 className="heading-2 mt-4">Two Styles, One Great Experience</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Every event has its own aesthetic. Choose the booth that fits yours
            — both deliver the same professional quality and service.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {BOOTHS.map((booth) => (
            <div
              key={booth.badge}
              className="rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent z-10" />
                <Image
                  src={booth.image}
                  alt={booth.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-dark backdrop-blur">
                  {booth.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{booth.name}</h3>
                <p className="text-gray-600 leading-relaxed">{booth.description}</p>
                <ul className="space-y-2">
                  {booth.features.map((f, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                      <span className="text-gray-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-6">
            Not sure which booth fits your event? We&apos;re happy to help you
            decide.
          </p>
          <a href="#contact" className="btn-primary">
            Talk to Us
          </a>
        </div>
      </div>
    </section>
  )
}
