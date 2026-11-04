import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react'
import { EXACT_AFFILIATE_DISCLOSURE, SITE_METADATA } from '@/data/content'

export default function AffiliateDisclosure() {
  useEffect(() => {
    document.title = `Affiliate Disclosure — ${SITE_METADATA.name}`
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 animate-fade-rise">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          Full Transparency
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2B2B26] tracking-tight">
          Affiliate Disclosure
        </h1>
        <p className="text-base sm:text-lg text-[#6B6B60] leading-relaxed">
          At Bright Habit Living, we believe honest editorial judgment is the cornerstone of
          wellness journalism. This page explains how our site generates revenue and how commercial
          relationships never compromise our evaluations.
        </p>
      </div>

      {/* The EXACT disclosure statement highlighted in a primary callout */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 stroke-[2]" />
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
            Our Exact Near-Link Disclosure
          </h2>
        </div>

        <blockquote className="border-l-4 border-[#2F5233] pl-4 sm:pl-6 py-2 bg-[#FAF7F2] rounded-r-xl font-serif text-base sm:text-lg text-[#2B2B26] italic">
          &ldquo;{EXACT_AFFILIATE_DISCLOSURE}&rdquo;
        </blockquote>

        <p className="text-xs sm:text-sm text-[#6B6B60] leading-relaxed">
          Whenever an editorial review or article contains a recommended product with a trackable
          link, this statement appears immediately adjacent to the action button or link.
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-8 text-base text-[#2B2B26] leading-relaxed">
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
            1. How Affiliate Compensation Works
          </h3>
          <p>
            When you click a link on Bright Habit Living that leads to a third-party merchant,
            brand, or retail partner (such as an official supplement producer or authorized
            distributor) and make a purchase, we may receive a referral commission or percentage of
            the sale.
          </p>
          <p>
            This comes at <strong>no additional cost to you</strong>. You pay the exact same retail
            or sale price as any other customer who navigates directly to the merchant’s storefront.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
            2. Compensation Never Affects Our Editorial Conclusions
          </h3>
          <p>
            Our reviews, pros, considerations, and questions to ask are created independently. We do
            not accept paid compensation to write positive reviews, nor do we alter our assessment
            of formulation drawbacks, high price points, or weak scientific evidence in exchange for
            higher commissions.
          </p>
          <p>
            If a product fails to provide batch testing, Certificate of Analysis verification, or
            reliable peer-reviewed citations for its claims, our editors state that fact plainly
            regardless of affiliate relationships.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
            3. Distinct Marking Near Recommendations
          </h3>
          <p>
            Every product card that contains commercial links clearly identifies those links as
            affiliate links near the recommendation itself. Furthermore, all outgoing commercial
            links are coded with{' '}
            <code className="bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E5E0D6] text-xs font-mono">
              rel=&quot;sponsored noopener noreferrer&quot;
            </code>{' '}
            in strict accordance with search engine and Federal Trade Commission guidelines.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
            4. We Do Not Process Payments or Fulfill Orders
          </h3>
          <p>
            Bright Habit Living is an editorial publication and information portal. We do not
            operate a warehouse, collect credit card details, ship physical items, manage
            subscriptions, or handle customer returns.
          </p>
          <p>
            All financial transactions and orders take place securely on the third-party
            merchant&apos;s own servers. If you have questions regarding your order status,
            delivery, billing, or returns, please contact the product manufacturer or merchant
            directly.
          </p>
        </section>
      </div>

      {/* Summary Footer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#E8EFE6]/70 border border-[#8FA88F]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-serif text-lg font-normal text-[#2F5233]">
            Explore Our Review Methodology
          </h4>
          <p className="text-xs sm:text-sm text-[#2B2B26]">
            Learn how we check ingredient sources, evaluate clinical research, and verify claims.
          </p>
        </div>
        <Link
          to="/editorial-standards"
          className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#2F5233] text-white font-medium text-sm hover:bg-[#24402A] shrink-0"
        >
          Editorial Standards <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </div>
    </div>
  )
}
