import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, XCircle, Heart, Shield } from 'lucide-react'
import { SITE_METADATA, TOPICS } from '@/data/content'

export default function About() {
  useEffect(() => {
    document.title = `About Us — ${SITE_METADATA.name}`
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. Header & Lifestyle Photo Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 animate-fade-rise">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold tracking-wider uppercase">
            <Heart className="w-3.5 h-3.5" />
            Our Mission &amp; Approach
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#2B2B26] tracking-tight leading-[1.15]">
            Small habits create brighter, steadier days.
          </h1>

          <p className="text-lg sm:text-xl text-[#6B6B60] leading-relaxed">
            {SITE_METADATA.brandPromise}
          </p>

          <p className="text-base text-[#2B2B26] leading-relaxed">
            Bright Habit Living was founded on a simple realization: the modern wellness
            conversation is flooded with impossible morning routines, sensational before-and-after
            claims, and pressure to buy dozens of proprietary blends. We believe true well-being is
            quieter, simpler, and built on verifiable daily rhythms.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5E0D6] shadow-lg aspect-[4/5]">
            <img
              src="https://img.usecurling.com/p/800/1000?q=person%20reading%20tea%20cozy%20natural%20light&color=green"
              alt="Natural lifestyle setting showing a peaceful morning reading routine"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20">
              <p className="font-serif text-base italic">
                &ldquo;Approach well-being with curiosity, patience, and good questions.&rdquo;
              </p>
              <span className="text-xs text-[#F3C9A8] mt-1 block uppercase tracking-wider">
                The Bright Habit Editorial Team
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What We Cover (The four topics) */}
      <section aria-labelledby="what-we-cover-heading" className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
            Editorial Pillars
          </span>
          <h2
            id="what-we-cover-heading"
            className="font-serif text-3xl sm:text-4xl font-normal text-[#2B2B26]"
          >
            What we cover.
          </h2>
          <p className="text-base text-[#6B6B60]">
            We keep our focus deliberate, exploring four practical areas where small daily
            adjustments yield noticeable long-term returns:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOPICS.map((topic) => (
            <div
              key={topic.slug}
              className="bg-white rounded-2xl p-6 border border-[#E5E0D6] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <h3 className="font-serif text-xl font-normal text-[#2B2B26]">{topic.name}</h3>
                <p className="text-xs sm:text-sm text-[#6B6B60] leading-relaxed">
                  {topic.description}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to={`/guides?topic=${topic.slug}`}
                  className="text-xs font-semibold text-[#2F5233] hover:underline inline-flex items-center"
                >
                  Explore guides <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. What We DON'T Do (Strict compliance boundaries) */}
      <section
        aria-labelledby="what-we-dont-do-heading"
        className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E5E0D6] space-y-8"
      >
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
            Clear Boundaries
          </span>
          <h2
            id="what-we-dont-do-heading"
            className="font-serif text-3xl sm:text-4xl font-normal text-[#2B2B26]"
          >
            What we don’t do.
          </h2>
          <p className="text-base text-[#6B6B60]">
            Building genuine trust requires knowing where editorial journalism stops and medical
            expertise begins:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E5E0D6] space-y-3">
            <XCircle className="w-6 h-6 text-red-600" />
            <h3 className="font-serif text-lg font-normal text-[#2B2B26]">
              No diagnosing or treating
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6B60] leading-relaxed">
              We never prescribe medications, suggest replacing clinical care, or diagnose
              conditions. Our content is general lifestyle education.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E5E0D6] space-y-3">
            <XCircle className="w-6 h-6 text-red-600" />
            <h3 className="font-serif text-lg font-normal text-[#2B2B26]">
              No unverifiable claims
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6B60] leading-relaxed">
              If a manufacturer cannot supply reliable peer-reviewed citations or independent lab
              testing for a claim, we omit it or flag it as unverified.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E5E0D6] space-y-3">
            <XCircle className="w-6 h-6 text-red-600" />
            <h3 className="font-serif text-lg font-normal text-[#2B2B26]">No miracle promises</h3>
            <p className="text-xs sm:text-sm text-[#6B6B60] leading-relaxed">
              We strictly reject extreme weight loss guarantees, overnight cures, fake star ratings,
              and misleading before-and-after imagery.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Editorial Integrity & Links to Standards & Contact */}
      <section className="bg-[#E8EFE6] rounded-3xl p-8 sm:p-12 border border-[#8FA88F]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#2F5233]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#2F5233]">
              Accountability
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26]">
            Our Editorial Standards &amp; Policies
          </h2>
          <p className="text-sm text-[#2B2B26] leading-relaxed">
            Learn how we select sources, evaluate evidence, and disclose commercial affiliate
            relationships with full clarity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Link
            to="/editorial-standards"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-medium text-sm transition-colors text-center"
          >
            Editorial Standards
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#E5E0D6] text-[#2B2B26] font-medium text-sm transition-colors text-center"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
