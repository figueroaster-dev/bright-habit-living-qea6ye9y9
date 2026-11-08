import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronRight,
  Package,
  Check,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Clock,
  Users,
} from 'lucide-react'
import {
  PRODUCT_REVIEWS,
  PRODUCT_REVIEW_DRAFTS,
  EXACT_AFFILIATE_DISCLOSURE,
  SITE_METADATA,
  HAS_ACTIVE_AFFILIATE_LINKS,
} from '@/data/content'
import { PendingPlaceholder } from '@/components/PendingPlaceholder'
import { SourceList } from '@/components/SourceList'
import { ReviewCard } from '@/components/ReviewCard'

export default function ReviewDetail() {
  const { slug } = useParams<{ slug: string }>()

  // Published reviews first; owner drafts (unpublished webinars etc.) resolve on
  // the same route but render with noindex and a disabled CTA.
  const review =
    PRODUCT_REVIEWS.find((r) => r.slug === slug) ??
    PRODUCT_REVIEW_DRAFTS.find((r) => r.slug === slug)

  const isDraft = Boolean(review?.isDraft)

  useEffect(() => {
    if (review) {
      document.title = isDraft
        ? `${review.productName} — ${SITE_METADATA.name}`
        : `${review.productName} Review — ${SITE_METADATA.name}`

      // Unverified/placeholder reviews and owner drafts must stay out of
      // search-engine indexes.
      const isIndexable = !review.isGenericPlaceholder
      let metaRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
      if (!metaRobots) {
        metaRobots = document.createElement('meta')
        metaRobots.setAttribute('name', 'robots')
        document.head.appendChild(metaRobots)
      }
      metaRobots.setAttribute('content', isIndexable ? 'index, follow' : 'noindex, nofollow')
    }
    return () => {
      const metaRobots = document.querySelector('meta[name="robots"]')
      if (metaRobots) metaRobots.remove()
    }
  }, [review])

  if (!review) {
    return <Navigate to="/reviews" replace />
  }

  const relatedReviews = PRODUCT_REVIEWS.filter((r) => r.slug !== review.slug).slice(0, 2)
  const hasPriceData = Boolean(review.quickFacts.priceDetails)

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* 1. Breadcrumb */}
      <nav
        aria-label="Breadcrumbs"
        className="flex items-center text-xs text-[#6B6B60] overflow-x-auto"
      >
        <Link to="/" className="hover:text-[#2F5233] shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-[#8FA88F]" />
        <Link to="/reviews" className="hover:text-[#2F5233] shrink-0">
          Reviews
        </Link>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-[#8FA88F]" />
        <span className="text-[#2B2B26] font-medium truncate max-w-xs sm:max-w-md">
          {review.productName}
        </span>
      </nav>

      {/* Draft status banner — rendered for owner drafts only. States the neutral
          verification note verbatim; never states a price. */}
      {isDraft && review.draftNote && (
        <div
          role="status"
          className="max-w-3xl mx-auto border border-[#E5E0D6] bg-[#FAF7F2] rounded-2xl p-5 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-[#2F5233] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1 text-left">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8FA88F] block">
              Owner draft — not published
            </span>
            <p className="text-sm text-[#2B2B26] leading-relaxed">{review.draftNote}</p>
          </div>
        </div>
      )}

      {/* 2. Hero Block: Product Image Placeholder (left) + Editable Fields (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Image Placeholder */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#E5E0D6] shadow-sm flex items-center justify-center p-8">
              {review.image ? (
                <img
                  src={review.image}
                  alt={review.productName}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#E5E0D6] text-[#2F5233] flex items-center justify-center">
                    <Package className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-lg text-[#2B2B26]">Product Image Placeholder</p>
                    <p className="text-xs text-[#6B6B60] max-w-xs">
                      // EDIT ME: Replace with official bottle/package image in{' '}
                      <code className="text-[#2F5233] bg-[#E8EFE6] px-1 py-0.5 rounded">
                        src/data/content.ts
                      </code>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Micro disclaimer */}
            <p className="text-[11px] text-center text-[#6B6B60]">
              Product imagery and trade dress are intellectual property of their respective owners.
            </p>
          </div>
        </div>

        {/* Right: Product Name, Brand, Category, Summary */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                {review.category}
              </span>
              {HAS_ACTIVE_AFFILIATE_LINKS && (
                <span className="bg-[#F3C9A8]/80 text-[#2B2B26] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  Contains affiliate links
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2B2B26] tracking-tight leading-tight">
              {review.productName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B6B60] border-b border-[#E5E0D6] pb-4">
              <span>
                <strong className="text-[#2B2B26]">Brand:</strong> {review.brand}
              </span>
              {review.lastReviewedDate && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8FA88F]" />
                    Reviewed: {review.lastReviewedDate}
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#6B6B60] leading-relaxed">{review.summary}</p>

          {/* 3. "Quick facts" Panel */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-normal text-[#2B2B26] border-b border-[#E5E0D6] pb-3">
              Quick facts
            </h2>

            {/* Field 1: What it is & who may want to learn more about it */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                What it is &amp; who may want to learn more about it
              </h3>
              {review.quickFacts.whatItIs ? (
                <p className="text-sm text-[#2B2B26] leading-relaxed">
                  {review.quickFacts.whatItIs}
                </p>
              ) : (
                <PendingPlaceholder
                  fieldName="What it is & who may want to learn more"
                  hint="Provide a concise 2-sentence summary of the product's primary positioning."
                />
              )}
            </div>

            {/* Field 2: Ingredients or materials (verified sources only) */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                Ingredients or materials (verified sources only)
              </h3>
              {review.quickFacts.ingredients ? (
                <p className="text-sm text-[#2B2B26] leading-relaxed">
                  {review.quickFacts.ingredients}
                </p>
              ) : (
                <PendingPlaceholder
                  fieldName="Ingredients or materials (verified sources only)"
                  hint="Enter verified Supplement Facts panel data directly from manufacturer COA."
                />
              )}
            </div>

            {/* Field 3: Directions & warnings (from producer's current materials) */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                Directions &amp; warnings (from the producer&apos;s current materials)
              </h3>
              {review.quickFacts.directionsWarnings ? (
                <p className="text-sm text-[#2B2B26] leading-relaxed">
                  {review.quickFacts.directionsWarnings}
                </p>
              ) : (
                <PendingPlaceholder
                  fieldName="Directions & warnings (producer materials)"
                  hint="Add exact manufacturer intake instructions, allergen warnings, and contraindications."
                />
              )}
            </div>

            {/* Field 4: Price & offer details (as supplied) */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                Price &amp; offer details (as supplied)
              </h3>
              {review.quickFacts.priceDetails ? (
                <div className="space-y-2">
                  <p className="text-sm text-[#2B2B26] leading-relaxed">
                    {review.quickFacts.priceDetails}
                  </p>
                  <p className="text-xs text-[#6B6B60] italic">
                    Price and availability are provided by the seller and may change — check the
                    official site for current details.
                  </p>
                </div>
              ) : (
                <PendingPlaceholder
                  fieldName="Price & offer details"
                  hint="Never fabricate pricing or discounts. Add verified pricing once supplied by seller."
                />
              )}
            </div>

            {/* Field 5: Evidence & sources */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                Evidence &amp; sources
              </h3>
              {review.quickFacts.evidenceSummary ? (
                <p className="text-sm text-[#2B2B26] leading-relaxed">
                  {review.quickFacts.evidenceSummary}
                </p>
              ) : (
                <PendingPlaceholder
                  fieldName="Evidence & sources summary"
                  hint="Summarize published clinical research on the active ingredients."
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3b. Webinar details — rendered only when the record carries vendor-verified
          event facts. Lists ONLY what the vendor page states; no price, no replay,
          no recording, no refund terms. */}
      {review.webinarDetails && (
        <section
          aria-labelledby="webinar-details-heading"
          className="max-w-3xl mx-auto space-y-6 pt-2"
        >
          <h2
            id="webinar-details-heading"
            className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26]"
          >
            Event Details
          </h2>
          <p className="text-sm text-[#6B6B60] leading-relaxed">
            The details below are limited to what the event&apos;s official vendor page states.
            Bright Habit Living has not attended, tested, endorsed, or independently validated this
            webinar. It is an educational event, not a treatment or medical service.
          </p>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D6] shadow-sm space-y-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                  Format
                </dt>
                <dd className="text-[#2B2B26] leading-relaxed">
                  {review.webinarDetails.eventFormat}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                  Date &amp; time
                </dt>
                <dd className="text-[#2B2B26] leading-relaxed flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8FA88F] shrink-0" aria-hidden="true" />
                  {review.webinarDetails.eventDate}, {review.webinarDetails.eventTime}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                  Platform
                </dt>
                <dd className="text-[#2B2B26] leading-relaxed">{review.webinarDetails.platform}</dd>
              </div>
            </dl>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                Sessions
              </h3>
              <ul className="space-y-2">
                {review.webinarDetails.presenters.map((presenter, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2B2B26]">
                    <Check className="w-4 h-4 text-[#4C7A4C] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed">{presenter}</span>
                  </li>
                ))}
              </ul>
            </div>

            {review.webinarDetails.extras.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  Also on the agenda
                </h3>
                <ul className="space-y-2">
                  {review.webinarDetails.extras.map((extra, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2B2B26]">
                      <Check
                        className="w-4 h-4 text-[#4C7A4C] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{extra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-[#6B6B60] italic leading-relaxed">
              No replay, recording, attendee materials, access duration, cancellation policy, or
              refund terms have been verified for this event, so none are listed here.
            </p>
          </div>
        </section>
      )}

      {/* 4. Pros & Considerations & Questions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pros (green check list) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E0D6] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </span>
            <h3 className="font-serif text-xl font-normal text-[#2B2B26]">Pros</h3>
          </div>
          {review.pros.length === 0 ? (
            <p className="text-sm text-[#6B6B60] leading-relaxed">
              No pros have been evaluated yet — this record has not been editorially reviewed.
            </p>
          ) : (
            <ul className="space-y-3">
              {review.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2B2B26]">
                  <Check className="w-4 h-4 text-[#4C7A4C] shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Considerations (amber dot list) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E0D6] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h3 className="font-serif text-xl font-normal text-[#2B2B26]">Considerations</h3>
          </div>
          <ul className="space-y-3">
            {review.considerations.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2B2B26]">
                <span className="w-2 h-2 rounded-full bg-[#D99A3D] shrink-0 mt-1.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions readers may want to ask the producer (numbered list) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E0D6] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#8FA88F] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h3 className="font-serif text-xl font-normal text-[#2B2B26]">Questions to Ask</h3>
          </div>
          <ol className="space-y-3 list-decimal list-inside text-sm text-[#2B2B26]">
            {review.questionsToAskProducer.map((q, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="ml-1">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 5. CTA BLOCK WITH EXACT DISCLOSURE IMMEDIATELY ABOVE */}
      <section aria-labelledby="cta-heading" className="max-w-3xl mx-auto space-y-6 pt-4">
        {/* Exact Near-Link Disclosure in a bordered callout */}
        <div className="border border-[#E5E0D6] bg-white rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#2F5233] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#2F5233] block">
                Editorial Transparency Notice
              </span>
              <p className="text-sm font-medium text-[#2B2B26] leading-relaxed">
                {EXACT_AFFILIATE_DISCLOSURE}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-[#FAF7F2] border border-[#E5E0D6] rounded-3xl p-8 text-center space-y-6">
          <h2
            id="cta-heading"
            className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26]"
          >
            Learn More from the Producer
          </h2>
          {isDraft ? (
            <p className="text-sm text-[#6B6B60] max-w-md mx-auto">
              No purchase or registration link is active on this page. Details will appear here only
              after they are verified.
            </p>
          ) : (
            <p className="text-sm text-[#6B6B60] max-w-md mx-auto">
              You will be redirected to the manufacturer’s official destination. Bright Habit Living
              never handles customer orders or billing.
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Draft CTA: permanently disabled while the record is a draft. The
                affiliate URL (if stored) is never rendered, never linked, and never
                shown as text. On activation the owner sets isDraft:false, moves the
                record into PRODUCT_REVIEWS and sets ctaLabel — at that point the
                standard sponsored-link CTA below takes over and the exact
                disclosure callout above sits beside it. */}
            {isDraft ? (
              <div className="w-full sm:w-auto flex flex-col items-center">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E5E0D6] text-[#6B6B60] font-semibold text-sm cursor-not-allowed opacity-80"
                >
                  {review.ctaLabel ?? 'Check current availability'}
                </button>
                {review.ctaDisabledReason && (
                  <span className="text-[11px] text-[#6B6B60] max-w-xs mt-1.5 leading-relaxed">
                    {review.ctaDisabledReason}
                  </span>
                )}
              </div>
            ) : review.affiliateUrl ? (
              <a
                href={review.affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-semibold text-sm shadow-md transition-all"
              >
                Visit the Official Site
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            ) : (
              <div className="w-full sm:w-auto flex flex-col items-center">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E5E0D6] text-[#6B6B60] font-semibold text-sm cursor-not-allowed opacity-80"
                >
                  Visit the Official Site (Disabled)
                </button>
                <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded mt-1.5 border border-dashed border-amber-300">
                  Affiliate link pending configuration
                </span>
              </div>
            )}

            {/* Secondary CTA: Check Price & Details */}
            {!isDraft && review.secondaryAffiliateUrl ? (
              <a
                href={review.secondaryAffiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-[#E5E0D6] text-[#2B2B26] hover:bg-[#FAF7F2] font-semibold text-sm transition-all"
              >
                Check Price &amp; Details
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            ) : (
              <div className="w-full sm:w-auto flex flex-col items-center">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/60 border border-[#E5E0D6] text-[#8FA88F] font-semibold text-sm cursor-not-allowed"
                >
                  Check Price &amp; Details
                </button>
                <span className="text-[11px] text-[#6B6B60] mt-1.5">
                  Link pending configuration
                </span>
              </div>
            )}
          </div>

          {/* Price availability note rendered ONLY when price data exists */}
          {!isDraft && hasPriceData && (
            <p className="text-xs text-[#6B6B60] max-w-md mx-auto pt-2">
              Price and availability are provided by the seller and may change — check the official
              site for current details.
            </p>
          )}
        </div>
      </section>

      {/* 6. Sources list */}
      <SourceList sources={review.sources} />

      {/* 7. Related Reviews */}
      {relatedReviews.length > 0 && (
        <section
          aria-labelledby="related-reviews-heading"
          className="space-y-6 pt-6 border-t border-[#E5E0D6]"
        >
          <h2
            id="related-reviews-heading"
            className="font-serif text-2xl font-normal text-[#2B2B26]"
          >
            More Product Checks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedReviews.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </section>
      )}

      {/* 8. Closing Not-Medical-Advice Disclaimer */}
      <div className="p-6 rounded-2xl bg-[#E8EFE6]/70 border border-[#8FA88F]/40 flex items-start gap-3 text-sm text-[#2B2B26]">
        <AlertCircle className="w-5 h-5 text-[#2F5233] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#2F5233]">Editorial Notice &amp; Medical Disclaimer</p>
          <p className="text-xs text-[#6B6B60] leading-relaxed">
            {SITE_METADATA.medicalDisclaimer} Bright Habit Living does not sell supplements directly
            and receives no compensation from sales unless initiated through an active affiliate
            link.
          </p>
        </div>
      </div>
    </article>
  )
}
