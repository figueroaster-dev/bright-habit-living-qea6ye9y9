import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Clock, ShieldCheck, CheckCircle2, AlertCircle, Send } from 'lucide-react'
import { SITE_METADATA } from '@/data/content'

type TopicOption =
  | 'General question'
  | 'Editorial feedback'
  | 'Correction request'
  | 'Partnership inquiry'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState<TopicOption>('General question')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.title = `Contact Us & Corrections — ${SITE_METADATA.name}`
  }, [])

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!name.trim()) {
      errs.name = 'Please provide your name.'
    }
    if (!email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!message.trim()) {
      errs.message = 'Please enter your message.'
    } else if (message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitted(true)
      // Stores submission in local component state only
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4 animate-fade-rise">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold tracking-wider uppercase">
          <Mail className="w-3.5 h-3.5" />
          Editorial Desk
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2B2B26] tracking-tight">
          Contact Bright Habit Living
        </h1>
        <p className="text-base sm:text-lg text-[#6B6B60] leading-relaxed">
          Have a question about a guide, feedback on a product review, or an evidence correction to
          share? Our editors welcome thoughtful reader correspondence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Container (left 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D6] shadow-sm">
          {isSubmitted ? (
            <div
              role="status"
              aria-live="polite"
              className="py-12 text-center space-y-5 animate-fade-rise"
            >
              <div className="w-16 h-16 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26]">
                  Thanks — your note has been received.
                </h3>
                <p className="text-sm sm:text-base text-[#6B6B60] max-w-md mx-auto leading-relaxed">
                  We appreciate you taking the time to write. An editor will review your submission
                  in accordance with our review schedule.
                </p>
              </div>

              {/* Informative note regarding owner email configuration */}
              <div className="border border-dashed border-[#8FA88F] bg-[#FAF7F2] p-4 rounded-xl text-xs text-[#2B2B26] max-w-md mx-auto text-left space-y-1">
                <p className="font-semibold text-[#2F5233]">
                  Site Configuration Note (Owner Reference):
                </p>
                <p className="text-[#6B6B60]">
                  // EDIT ME: Contact submissions are currently handled client-side. Live SMTP/API
                  email delivery will be configured by the site owner when integrating a custom mail
                  endpoint.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false)
                    setName('')
                    setEmail('')
                    setMessage('')
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#2F5233] text-white text-sm font-medium hover:bg-[#24402A] transition-colors"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-normal text-[#2B2B26]">Send a Message</h2>
                <p className="text-xs text-[#6B6B60]">
                  All fields marked with an asterisk (*) are required.
                </p>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#2B2B26]">
                  Your Name <span className="text-[#2F5233]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? 'border-red-500 bg-red-50/30' : 'border-[#E5E0D6] bg-[#FAF7F2]/50'
                  } text-sm text-[#2B2B26] focus:bg-white focus:outline-none focus:border-[#2F5233] focus:ring-2 focus:ring-[#2F5233]/20 transition-all`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#2B2B26]">
                  Your Email Address <span className="text-[#2F5233]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane@example.com"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email
                      ? 'border-red-500 bg-red-50/30'
                      : 'border-[#E5E0D6] bg-[#FAF7F2]/50'
                  } text-sm text-[#2B2B26] focus:bg-white focus:outline-none focus:border-[#2F5233] focus:ring-2 focus:ring-[#2F5233]/20 transition-all`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Topic Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="contact-topic" className="block text-sm font-medium text-[#2B2B26]">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as TopicOption)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E0D6] bg-[#FAF7F2]/50 text-sm text-[#2B2B26] focus:bg-white focus:outline-none focus:border-[#2F5233] focus:ring-2 focus:ring-[#2F5233]/20 transition-all"
                >
                  <option value="General question">General question</option>
                  <option value="Editorial feedback">Editorial feedback</option>
                  <option value="Correction request">Correction request</option>
                  <option value="Partnership inquiry">Partnership inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[#2B2B26]"
                >
                  Message <span className="text-[#2F5233]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your question, feedback, or specific citation correction..."
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message
                      ? 'border-red-500 bg-red-50/30'
                      : 'border-[#E5E0D6] bg-[#FAF7F2]/50'
                  } text-sm text-[#2B2B26] focus:bg-white focus:outline-none focus:border-[#2F5233] focus:ring-2 focus:ring-[#2F5233]/20 transition-all resize-y`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Notice */}
              <p className="text-xs text-[#6B6B60] leading-relaxed">
                By submitting this form, you acknowledge that submissions are stored in local
                session state and that live email delivery will be configured by the site owner
                later. We do not provide individualized medical diagnoses.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-semibold text-sm shadow-md transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D99A3D]"
              >
                Send Message
                <Send className="w-4 h-4 ml-2" />
              </button>
            </form>
          )}
        </div>

        {/* Sidebar (right 5 cols) */}
        <aside aria-label="Contact Guidelines" className="lg:col-span-5 space-y-6">
          {/* Response time card */}
          <div className="bg-[#E8EFE6]/70 rounded-3xl p-6 sm:p-8 border border-[#8FA88F]/40 space-y-3">
            <div className="flex items-center gap-2 text-[#2F5233]">
              <Clock className="w-5 h-5" />
              <h3 className="font-serif text-lg font-normal">Response Time</h3>
            </div>
            <p className="text-sm text-[#2B2B26] leading-relaxed">
              Our editorial desk reviews messages during normal weekday hours (Monday–Friday,
              9am–5pm EST). Factual correction requests are prioritized and reviewed within 1–2
              business days.
            </p>
          </div>

          {/* Quick links card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-normal text-[#2B2B26]">Helpful Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/editorial-standards"
                  className="flex items-start gap-2 text-[#2F5233] hover:underline font-medium"
                >
                  <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Editorial Standards &amp; Sourcing Guidelines</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/affiliate-disclosure"
                  className="flex items-start gap-2 text-[#2F5233] hover:underline font-medium"
                >
                  <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Affiliate Disclosure &amp; Partnership Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="flex items-start gap-2 text-[#6B6B60] hover:text-[#2B2B26]"
                >
                  <span>Privacy Policy &amp; Terms of Use</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Medical disclaimer note */}
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5E0D6] text-xs text-[#6B6B60] leading-relaxed">
            <p className="font-semibold text-[#2B2B26] mb-1">Important Medical Disclaimer:</p>
            Please do not send confidential medical records or acute symptom queries. Bright Habit
            Living cannot provide emergency care or personalized clinical advice.
          </div>
        </aside>
      </div>
    </div>
  )
}
