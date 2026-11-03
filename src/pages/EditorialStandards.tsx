import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowRight, BookOpen, AlertCircle } from 'lucide-react'
import { EDITORIAL_STANDARDS, SITE_METADATA } from '@/data/content'

export default function EditorialStandards() {
  useEffect(() => {
    document.title = `Editorial Standards & Sourcing — ${SITE_METADATA.name}`
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 animate-fade-rise">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold tracking-wider uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          Editorial Integrity
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2B2B26] tracking-tight">
          Editorial Standards &amp; Sourcing
        </h1>
        <p className="text-base sm:text-lg text-[#6B6B60] leading-relaxed">
          Bright Habit Living adheres to strict guidelines to ensure that all guidance remains
          grounded in verified physiology, balanced education, and clear compliance with U.S.
          consumer protection standards.
        </p>

        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D6] flex items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[#2F5233]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Have questions about commercial compensation?</span>
          </div>
          <Link
            to="/affiliate-disclosure"
            className="text-[#2F5233] font-semibold underline hover:text-[#24402A] inline-flex items-center"
          >
            Read Affiliate Disclosure <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>

      {/* Numbered Readable Sections */}
      <div className="space-y-10">
        {EDITORIAL_STANDARDS.map((standard) => (
          <section
            key={standard.number}
            aria-labelledby={`standard-${standard.number}`}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl font-bold text-[#8FA88F]">
                {standard.number}.
              </span>
              <h2
                id={`standard-${standard.number}`}
                className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]"
              >
                {standard.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base font-medium text-[#2F5233] bg-[#E8EFE6]/60 p-3.5 rounded-xl border border-[#8FA88F]/30 leading-relaxed">
              {standard.summary}
            </p>

            <div className="space-y-3 text-sm sm:text-base text-[#2B2B26] leading-relaxed pt-1">
              {standard.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Closing Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E5E0D6] space-y-3 text-sm text-[#6B6B60]">
        <div className="flex items-center gap-2 text-[#2B2B26] font-semibold">
          <AlertCircle className="w-4 h-4 text-[#2F5233]" />
          <span>Found an error or unverified claim?</span>
        </div>
        <p className="leading-relaxed">
          We welcome reader corrections. If you notice a broken citation, an outdated price
          reference, or an inaccurate claim in any guide or review, please contact our editorial
          desk via our{' '}
          <Link to="/contact" className="text-[#2F5233] underline font-medium">
            Contact Form
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
