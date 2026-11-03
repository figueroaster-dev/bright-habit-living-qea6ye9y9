import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, AlertTriangle } from 'lucide-react'
import { ProductReview, TOPICS } from '@/data/content'

interface ReviewCardProps {
  review: ProductReview
  className?: string
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  const topic = TOPICS.find((t) => t.slug === review.topicSlug)

  return (
    <article
      className={`group bg-white rounded-2xl border border-[#E5E0D6] overflow-hidden flex flex-col card-lift ${className}`}
    >
      <Link
        to={`/reviews/${review.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F2] border-b border-[#E5E0D6] flex items-center justify-center group-hover:bg-[#E8EFE6]/40 transition-colors"
      >
        {review.image ? (
          <img
            src={review.image}
            alt={review.productName}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 text-[#6B6B60]">
            <div className="w-12 h-12 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center mb-2">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-[#2B2B26]">Product Image Placeholder</span>
            <span className="text-[11px] text-[#6B6B60]">// EDIT ME: photo URL</span>
          </div>
        )}

        {/* Affiliate links chip */}
        <span className="absolute top-3 right-3 bg-[#F3C9A8]/90 text-[#2B2B26] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
          Contains affiliate links
        </span>

        {topic && (
          <span className="absolute top-3 left-3 bg-white/95 text-[#2F5233] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
            {topic.shortLabel}
          </span>
        )}
      </Link>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#6B6B60] font-medium">
              {review.category}
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#2B2B26] group-hover:text-[#2F5233] transition-colors line-clamp-2">
            <Link
              to={`/reviews/${review.slug}`}
              className="focus:outline-none focus-visible:underline"
            >
              {review.productName}
            </Link>
          </h3>

          <p className="text-xs font-medium text-[#2F5233]">Brand: {review.brand}</p>

          <p className="text-sm text-[#6B6B60] leading-relaxed line-clamp-2">{review.summary}</p>

          {review.isGenericPlaceholder && (
            <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-dashed border-amber-300">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Generic placeholder — owner to verify data</span>
            </div>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-[#E5E0D6] flex items-center justify-between text-xs text-[#6B6B60]">
          <span>Reviewed {review.lastReviewedDate}</span>
          <Link
            to={`/reviews/${review.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-[#2F5233] hover:text-[#24402A]"
            aria-label={`Read review: ${review.productName}`}
          >
            Read review{' '}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
