"use client"

import { useMemo, useState } from "react"
import { COMPANY_INFO } from "@/app/constants"
import { Phone, Mail, MapPin } from "lucide-react"

type FormState = "idle" | "submitting" | "success" | "error"

type ContactFormData = {
  fullName: string
  email: string
  phone: string
  eventDate: string
  guestCount: string
  eventLocation: string
  eventType: string
  details: string
  botcheck: string
}

const INITIAL_DATA: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  eventDate: "",
  guestCount: "",
  eventLocation: "",
  eventType: "",
  details: "",
  botcheck: "",
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA)
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  // Put this in .env.local: "
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

  const isReadyToSubmit = useMemo(() => {
    return (
      formData.fullName.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      formData.eventDate.trim().length > 0 &&
      formData.eventLocation.trim().length > 0 &&
      formData.eventType.trim().length > 0
    )
  }, [formData])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!isReadyToSubmit) {
      setFormState("error")
      setErrorMessage("Please fill out the required fields.")
      return
    }

    if (!accessKey) {
      setFormState("error")
      setErrorMessage(
        "Missing Web3Forms key. Add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local.",
      )
      return
    }

    // basic bot trap (keep hidden)
    if (formData.botcheck.trim().length > 0) {
      setFormState("error")
      setErrorMessage("Submission blocked. Please try again.")
      return
    }

    try {
      setFormState("submitting")

      const payload = {
        access_key: accessKey,
        subject: `New Photo Booth Inquiry — ${formData.eventType}`,
        from_name: formData.fullName,
        // include your own labels/fields
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || "(not provided)",
        eventDate: formData.eventDate,
        expectedGuests: formData.guestCount || "(not provided)",
        eventLocation: formData.eventLocation,
        eventType: formData.eventType,
        details: formData.details || "(not provided)",
        // optional: helps you see where it came from
        website: typeof window !== "undefined" ? window.location.href : "",
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.success) {
        const msg = data?.message || "Something went wrong. Please try again."
        throw new Error(msg)
      }

      setFormState("success")
      setFormData(INITIAL_DATA)
      setTimeout(() => setFormState("idle"), 4000)
    } catch (err) {
      setFormState("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Submit failed. Please try again.",
      )
    }
  }

  return (
    <section
      id="contact"
      className="section-padding bg-linear-to-b from-gray-50 to-white"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Contact
            </span>
            <h2 className="heading-2 mt-4 mb-6">
              Check Availability + Get a Quote
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tell us a bit about your event and we will follow up with
              availability, package options, and next steps.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-primary-dark mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Phone</div>
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="text-secondary hover:text-secondary-dark transition-colors"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Email</div>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-secondary hover:text-secondary-dark transition-colors"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Service Area
                      </div>
                      <div className="text-gray-600">Northern California</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Botcheck (hidden) */}
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guestCount"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Expected Number of Guests (optional)
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    min={0}
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    placeholder="150"
                  />
                </div>

                <div>
                  <label
                    htmlFor="eventLocation"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Event Location *
                  </label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    required
                    value={formData.eventLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    placeholder="Venue name + city (or full address)"
                    autoComplete="street-address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="eventType"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Type of Event *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  >
                    <option value="">Select an option</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate / Company Event">
                      Corporate / Company Event
                    </option>
                    <option value="School Event">School Event</option>
                    <option value="Holiday Party">Holiday Party</option>
                    <option value="Grand Opening">Grand Opening</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Tell us more about your event (optional)
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={5}
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                    placeholder="Theme, timeline, indoor/outdoor, print preferences, custom template ideas, etc."
                  />
                </div>

                {formState === "error" && errorMessage ? (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                ) : null}

                {formState === "success" ? (
                  <p className="text-sm text-green-700 font-semibold">
                    ✓ Request sent! We will get back to you soon.
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="w-full btn-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={formState === "submitting"}
                >
                  {formState === "submitting" ? "Sending..." : "Send Request"}
                </button>

                <p className="text-xs text-gray-500">
                  By submitting, you agree to be contacted about your event
                  inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
