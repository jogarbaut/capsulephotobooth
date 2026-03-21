"use client"

import { useMemo, useState } from "react"

type FormState = "idle" | "submitting" | "success" | "error"

type FormData = {
  fullName: string
  email: string
  phone: string
  eventDate: string
  startTime: string
  endTime: string
  guestCount: string
  eventLocation: string
  eventType: string
  details: string
  botcheck: string
}

const buildInitial = (defaultEventType: string): FormData => ({
  fullName: "",
  email: "",
  phone: "",
  eventDate: "",
  startTime: "",
  endTime: "",
  guestCount: "",
  eventLocation: "",
  eventType: defaultEventType,
  details: "",
  botcheck: "",
})

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"

const labelClass = "block text-sm font-semibold text-gray-700 mb-2"

export default function BookingForm({
  defaultEventType = "",
}: {
  defaultEventType?: string
}) {
  const [formData, setFormData] = useState<FormData>(() =>
    buildInitial(defaultEventType),
  )
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

  const isReadyToSubmit = useMemo(
    () =>
      formData.fullName.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      formData.eventDate.trim().length > 0 &&
      formData.startTime.trim().length > 0 &&
      formData.endTime.trim().length > 0 &&
      formData.eventLocation.trim().length > 0 &&
      formData.eventType.trim().length > 0,
    [formData],
  )

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
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || "(not provided)",
        eventDate: formData.eventDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        expectedGuests: formData.guestCount || "(not provided)",
        eventLocation: formData.eventLocation,
        eventType: formData.eventType,
        details: formData.details || "(not provided)",
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
        throw new Error(data?.message || "Something went wrong. Please try again.")
      }

      setFormState("success")
      setFormData(buildInitial(defaultEventType))
      setTimeout(() => setFormState("idle"), 4000)
    } catch (err) {
      setFormState("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Submit failed. Please try again.",
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
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
        <label htmlFor="bf-fullName" className={labelClass}>
          Full Name *
        </label>
        <input
          type="text"
          id="bf-fullName"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          className={inputClass}
          placeholder="John Doe"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="bf-email" className={labelClass}>
          Email *
        </label>
        <input
          type="email"
          id="bf-email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="john@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="bf-phone" className={labelClass}>
          Phone Number (optional)
        </label>
        <input
          type="tel"
          id="bf-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="bf-eventDate" className={labelClass}>
          Event Date *
        </label>
        <input
          type="date"
          id="bf-eventDate"
          name="eventDate"
          required
          value={formData.eventDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-startTime" className={labelClass}>
            Start Time *
          </label>
          <input
            type="time"
            id="bf-startTime"
            name="startTime"
            required
            value={formData.startTime}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="bf-endTime" className={labelClass}>
            End Time *
          </label>
          <input
            type="time"
            id="bf-endTime"
            name="endTime"
            required
            value={formData.endTime}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="bf-guestCount" className={labelClass}>
          Expected Number of Guests (optional)
        </label>
        <input
          type="number"
          id="bf-guestCount"
          name="guestCount"
          min={0}
          value={formData.guestCount}
          onChange={handleChange}
          className={inputClass}
          placeholder="150"
        />
      </div>

      <div>
        <label htmlFor="bf-eventLocation" className={labelClass}>
          Event Location *
        </label>
        <input
          type="text"
          id="bf-eventLocation"
          name="eventLocation"
          required
          value={formData.eventLocation}
          onChange={handleChange}
          className={inputClass}
          placeholder="Venue name + city (or full address)"
          autoComplete="street-address"
        />
      </div>

      <div>
        <label htmlFor="bf-eventType" className={labelClass}>
          Type of Event *
        </label>
        <select
          id="bf-eventType"
          name="eventType"
          required
          value={formData.eventType}
          onChange={handleChange}
          className={inputClass}
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
        <label htmlFor="bf-details" className={labelClass}>
          Tell us more about your event (optional)
        </label>
        <textarea
          id="bf-details"
          name="details"
          rows={5}
          value={formData.details}
          onChange={handleChange}
          className={inputClass + " resize-none"}
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
        By submitting, you agree to be contacted about your event inquiry.
      </p>
    </form>
  )
}
