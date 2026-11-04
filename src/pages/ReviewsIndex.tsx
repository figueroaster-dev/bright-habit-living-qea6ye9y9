import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, Check, AlertCircle, Clock } from 'lucide-react'
import {
  PRODUCT_REVIEWS,
  COMPARISON_DATA,
  SITE_METADATA,
  HAS_ACTIVE_AFFILIATE_LINKS,
} from '@/data/content'
import { ReviewCard } from '@/components/ReviewCard'

export default function ReviewsIndex() {
  useEffect(() => {
    document.title = `Product Reviews & Comparisons — ${SITE_METADATA.name}`
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Intro Header */}
      <div className="max-w-3xl space-y-4 animate-fade-rise">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Editorial Checks
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2B2B26] tracking-tight">
          Product Reviews &amp; Comparisons
        </h1>
        <p className="text-base sm:text-lg text-[#6B6B60] leading-relaxed">
          We inspect wellness formulas, supplement facts panels, and manufacturer claims with a
          balanced editorial eye. We never publish fake clinical endorsements or exaggerated
          results.
        </p>

        {/* Affiliate Disclosure Notice Line — rendered only while active affiliate links exist */}
        {HAS_ACTIVE_AFFILIATE_LINKS && (
          <div className="pt-2">
            <p className="text-xs sm:text-sm text-[#2F5233] bg-[#FAF7F2] border border-[#E5E0D6] rounded-xl p-3 inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                Some reviews contain affiliate links — see our{' '}
                <Link
                  to="/affiliate-disclosure"
                  className="underline font-semibold hover:text-[#24402A]"
                >
                  disclosure
                </Link>
                .
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Grid of Review Cards — empty state shown while no verified reviews are published */}
      <div className="space-y-6">
        {PRODUCT_REVIEWS.length === 0 ? (
          <div className="bg-[#FAF7F2] border border-dashed border-[#E5E0D6] rounded-3xl p-10 sm:p-14 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26] leading-relaxed">
              Product reviews are coming soon. We publish them after checking product details and
              sources.
            </p>
            <p className="text-sm sm:text-base text-[#6B6B60] leading-relaxed">
              In the meantime, explore our{' '}
              <Link to="/guides" className="font-semibold text-[#2F5233] hover:underline">
                wellness guides
              </Link>{' '}
              or read our{' '}
              <Link
                to="/editorial-standards"
                className="font-semibold text-[#2F5233] hover:underline"
              >
                editorial standards
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
                Published Product Reviews ({PRODUCT_REVIEWS.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCT_REVIEWS.map((review) => (
                <ReviewCard key={review.slug} review={review} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Optional Comparison Table Component - RENDERS ONLY WHEN comparison data exists AND enabled */}
      {COMPARISON_DATA.enabled && COMPARISON_DATA.rows.length > 0 && (
        <section
          aria-labelledby="comparison-heading"
          className="space-y-6 pt-8 border-t border-[#E5E0D6]"
        >
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
              Side-by-Side Analysis
            </span>
            <h2
              id="comparison-heading"
              className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26]"
            >
              {COMPARISON_DATA.title}
            </h2>
            <p className="text-sm text-[#6B6B60]">{COMPARISON_DATA.description}</p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-[#E5E0D6] shadow-sm">
            <table className="w-full text-left text-sm text-[#2B2B26] border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E5E0D6]">
                  <th className="p-4 font-semibold text-xs uppercase tracking-wider text-[#6B6B60]">
                    Aspect
                  </th>
                  {COMPARISON_DATA.products.map((p, idx) => (
                    <th key={idx} className="p-4 font-serif text-base font-normal text-[#2B2B26]">
                      {p.name}
                    </th>
                  ))}
                  <th className="p-4 font-semibold text-xs uppercase tracking-wider text-[#6B6B60]">
                    Editorial Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D6]">
                {COMPARISON_DATA.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2]/50">
                    <td className="p-4 font-medium text-[#2F5233]">{row.aspect}</td>
                    <td className="p-4 text-[#2B2B26]">{row.productA}</td>
                    <td className="p-4 text-[#2B2B26]">{row.productB}</td>
                    <td className="p-4 text-xs text-[#6B6B60] leading-relaxed">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Verification standards banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#E8EFE6]/70 border border-[#8FA88F]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="font-serif text-xl font-normal text-[#2F5233]">
            How do we score or rank products?
          </h3>
          <p className="text-sm text-[#2B2B26] leading-relaxed">
            We do NOT use arbitrary 5-star ratings or paid sponsor placements. Our reviews focus on
            verifiable formulation facts, third-party testing disclosures, and realistic usage
            considerations.
          </p>
        </div>
        <Link
          to="/editorial-standards"
          className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-medium text-sm transition-colors shrink-0"
        >
          View Editorial Standards
        </Link>
      </div>
    </div>
  )
}
