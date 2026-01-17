"use client"

import { COMPANY_INFO } from "@/app/constants"

export const benefits = [
  {
    title: "Personalized Design & Experience",
    description:
      "Custom print templates, thoughtful revisions, and styling details tailored to your event vision.",
    icon: "🎨",
  },
  {
    title: "Pre-Event Planning & Coordination",
    description:
      "A dedicated coordination call to align on flow, timing, guest etiquette, and special requests.",
    icon: "📋",
  },
  {
    title: "Engaging On-Site Attendant",
    description:
      "A friendly, professional attendant who interacts with guests and encourages participation.",
    icon: "🙋‍♀️",
  },
  {
    title: "Complimentary Setup & Breakdown",
    description:
      "Seamless setup and teardown handled entirely by our team so you can stay focused on your event.",
    icon: "🛠️",
  },
  {
    title: "Flexible, Transparent Pricing",
    description:
      "Thoughtful packages and pricing flexibility designed to fit your needs - we don't want cost to be the barrier.",
    icon: "💬",
  },
  {
    title: "Hospitality-First Experience",
    description:
      "We're known for how well we connect with guests—bringing warmth, energy, and a special touch.",
    icon: "✨",
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="heading-2 mt-4 mb-6">What Makes Us Special</h2>
          <p className="text-gray-600 text-lg">
            We do everything to go above and beyond to ensure your satisfaction.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-secondary transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="text-5xl mb-4">{benefit.icon}</div>

              <h3 className="text-xl font-bold text-primary-dark mb-3">
                {benefit.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Placeholder */}
        <div className="mt-20 bg-linear-to-r from-primary to-secondary rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">💬</div>
            <h3 className="text-3xl font-bold mb-6">Testimonial</h3>
            <p className="text-xl leading-relaxed mb-6 opacity-90">
              "We would recommend them to anyone and will be having them back
              soon. If you're thinking of booking them I'd say do it. That add
              an element of excitement and community that cannot be duplicated
              without a true passion in what they do."
            </p>
            <div className="font-semibold">- Brandon W. (Client)</div>
          </div>
        </div>
      </div>
    </section>
  )
}
