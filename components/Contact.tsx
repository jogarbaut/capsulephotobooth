"use client"

import { COMPANY_INFO } from "@/app/constants"
import { Phone, Mail, MapPin } from "lucide-react"
import BookingForm from "@/components/BookingForm"

export default function Contact() {
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

            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
