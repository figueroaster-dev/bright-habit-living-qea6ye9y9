import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ShieldCheck, AlertCircle } from 'lucide-react'
import { SITE_METADATA } from '@/data/content'

export default function Privacy() {
  const [activeSection, setActiveSection] = useState<'privacy' | 'terms'>('privacy')

  useEffect(() => {
    document.title = `Privacy Policy & Terms of Use — ${SITE_METADATA.name}`
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4 animate-fade-rise">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold tracking-wider uppercase">
          <FileText className="w-3.5 h-3.5" />
          Legal &amp; Transparency
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2B2B26] tracking-tight">
          Privacy Policy &amp; Terms of Use
        </h1>
        <p className="text-base sm:text-lg text-[#6B6B60] leading-relaxed">
          Please review these terms carefully before accessing or using Bright Habit Living. This
          document will be updated whenever our practices change.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Sticky In-Page Table of Contents (Desktop) */}
        <aside
          aria-label="Table of Contents"
          className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4"
        >
          <div className="bg-white rounded-2xl p-5 border border-[#E5E0D6] shadow-sm space-y-3">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
              On This Page
            </h2>
            <nav className="space-y-1 text-sm font-medium">
              <button
                type="button"
                onClick={() => {
                  setActiveSection('privacy')
                  scrollTo('privacy-policy-section')
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'privacy'
                    ? 'bg-[#E8EFE6] text-[#2F5233] font-semibold'
                    : 'text-[#6B6B60] hover:text-[#2B2B26] hover:bg-[#FAF7F2]'
                }`}
              >
                1. Privacy Policy
              </button>
              <div className="pl-4 space-y-1 text-xs text-[#6B6B60]">
                <button
                  type="button"
                  onClick={() => scrollTo('privacy-analytics')}
                  className="block text-left py-1 hover:text-[#2F5233]"
                >
                  • Analytics &amp; Cookies
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('privacy-affiliate')}
                  className="block text-left py-1 hover:text-[#2F5233]"
                >
                  • Affiliate Tracking
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('privacy-contact')}
                  className="block text-left py-1 hover:text-[#2F5233]"
                >
                  • Information You Provide
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveSection('terms')
                  scrollTo('terms-of-use-section')
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors mt-2 ${
                  activeSection === 'terms'
                    ? 'bg-[#E8EFE6] text-[#2F5233] font-semibold'
                    : 'text-[#6B6B60] hover:text-[#2B2B26] hover:bg-[#FAF7F2]'
                }`}
              >
                2. Terms of Use
              </button>
              <div className="pl-4 space-y-1 text-xs text-[#6B6B60]">
                <button
                  type="button"
                  onClick={() => scrollTo('terms-disclaimer')}
                  className="block text-left py-1 hover:text-[#2F5233]"
                >
                  • Medical Disclaimer
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('terms-links')}
                  className="block text-left py-1 hover:text-[#2F5233]"
                >
                  • Third-Party Links
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('terms-liability')}
                  className="block text-left py-1 hover:text-[#2F5233]"
                >
                  • Limitation of Liability
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Content Column (9 cols) */}
        <div className="lg:col-span-9 space-y-16">
          {/* SECTION 1: PRIVACY POLICY */}
          <section id="privacy-policy-section" className="space-y-8">
            <div className="border-b border-[#E5E0D6] pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                Section 1
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2B2B26]">
                Privacy Policy
              </h2>
            </div>

            <div className="prose prose-stone max-w-none space-y-6 text-[#2B2B26] leading-relaxed">
              <p>
                Bright Habit Living (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the site&rdquo;)
                respects the privacy of our readers. This Privacy Policy discloses what information
                may be gathered when you browse our editorial content, how that information is
                handled, and your choices.
              </p>

              {/* No active analytics/pixels notice placeholder */}
              <div
                id="privacy-analytics"
                className="border-2 border-dashed border-amber-400 bg-amber-50/70 rounded-2xl p-6 text-amber-950 space-y-2"
              >
                <div className="flex items-center gap-2 font-medium text-amber-900">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Current Site Configuration — No Active Tracking or Advertising Pixels</span>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  [Owner configuration placeholder: This initial version of Bright Habit Living does
                  NOT employ Google Analytics, Meta tracking pixels, behavioral retargeting scripts,
                  or third-party marketing cookies. Any future analytics or email newsletter
                  collection will be configured by the site owner and reflected in an updated
                  privacy schedule.]
                </p>
              </div>

              <div id="privacy-affiliate" className="space-y-3 pt-2">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
                  Affiliate Link Tracking &amp; Cookies
                </h3>
                <p>
                  When you click on an external link pointing to a third-party merchant or product
                  provider, that third party may set a session cookie or trackable identifier on
                  your browser to record that you arrived from Bright Habit Living. This cookie is
                  managed entirely by the third-party merchant network and is subject to their
                  independent privacy policy.
                </p>
                <p>
                  Bright Habit Living does not store your credit card information, billing address,
                  or transaction history. All commerce actions occur on third-party domains.
                </p>
              </div>

              <div id="privacy-contact" className="space-y-3 pt-2">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
                  Information You Voluntarily Provide
                </h3>
                <p>
                  If you submit correspondence through our contact form, you provide your name,
                  email address, topic selection, and the content of your message. We use this
                  information solely to respond to your inquiry, investigate reported factual
                  corrections, or address editorial questions.
                </p>
                <p>
                  We do not sell, rent, or lease reader email addresses to third-party data brokers
                  or marketing syndicates.
                </p>
              </div>

              {/* Editable placeholder for owner legal identity */}
              <div className="border-2 border-dashed border-amber-400 bg-amber-50/70 rounded-2xl p-6 text-amber-950 space-y-2">
                <span className="font-semibold text-xs uppercase tracking-wider text-amber-900">
                  Business Entity &amp; Contact Notice
                </span>
                <p className="text-sm text-amber-900 leading-relaxed font-mono">
                  [Owner to add: Registered business entity name, legal address, registered agent
                  details, and privacy contact email (e.g., privacy@brighthabitliving.com).]
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: TERMS OF USE */}
          <section id="terms-of-use-section" className="space-y-8 pt-8 border-t border-[#E5E0D6]">
            <div className="border-b border-[#E5E0D6] pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                Section 2
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2B2B26]">
                Terms of Use
              </h2>
            </div>

            <div className="prose prose-stone max-w-none space-y-6 text-[#2B2B26] leading-relaxed">
              <p>
                By accessing, browsing, or using Bright Habit Living, you agree to be bound by these
                Terms of Use and all applicable laws and regulations of the United States. If you do
                not agree with any part of these terms, please discontinue using this website.
              </p>

              <div
                id="terms-disclaimer"
                className="space-y-3 bg-[#E8EFE6]/70 p-6 rounded-2xl border border-[#8FA88F]/40"
              >
                <h3 className="font-serif text-xl font-normal text-[#2F5233]">
                  No Professional Medical Advice
                </h3>
                <p className="text-sm text-[#2B2B26] leading-relaxed">
                  The content published on Bright Habit Living — including articles, videos, product
                  evaluations, and graphics — is for general educational and informational purposes
                  only. It is not intended to be a substitute for professional medical advice,
                  clinical diagnosis, or treatment. Never disregard professional medical advice or
                  delay seeking it because of something you have read on this site.
                </p>
              </div>

              <div id="terms-links" className="space-y-3 pt-2">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
                  Third-Party Links &amp; Merchant Responsibility
                </h3>
                <p>
                  Bright Habit Living contains hyperlinks to third-party websites, online merchants,
                  and product manufacturers. We have no control over the content, privacy practices,
                  terms of sale, inventory availability, shipping practices, or pricing of
                  third-party domains.
                </p>
                <p>
                  Any purchase or contract entered into with a third-party seller is strictly
                  between you and that seller. Bright Habit Living disclaims all liability arising
                  from transactions conducted on external sites.
                </p>
              </div>

              <div id="terms-liability" className="space-y-3 pt-2">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
                  Limitation of Liability &amp; Disclaimers
                </h3>
                <p>
                  To the fullest extent permitted by applicable law, Bright Habit Living and its
                  editors, contributors, and operators shall not be liable for any direct, indirect,
                  incidental, consequential, or punitive damages arising from your access to or use
                  of, or inability to access or use, this website and its editorial materials.
                </p>
              </div>

              {/* Editable placeholder for jurisdiction */}
              <div className="border-2 border-dashed border-amber-400 bg-amber-50/70 rounded-2xl p-6 text-amber-950 space-y-2">
                <span className="font-semibold text-xs uppercase tracking-wider text-amber-900">
                  Governing Law &amp; Jurisdiction
                </span>
                <p className="text-sm text-amber-900 leading-relaxed font-mono">
                  [Owner to add: State of incorporation/operation, governing jurisdiction (e.g.,
                  &ldquo;These terms are governed by the laws of the State of Delaware, United
                  States&rdquo;), and arbitration/dispute resolution provisions.]
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
