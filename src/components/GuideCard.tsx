import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight, Play } from 'lucide-react'
import { Guide, TOPICS } from '@/data/content'

interface GuideCardProps {
  guide: Guide
  className?: string
  showImage?: boolean
}

export const GuideCard: React.FC<GuideCardProps> = ({
  guide,
  className = '',
  showImage = true,
}) => {
  const topic = TOPICS.find((t) => t.slug === guide.topicSlug)

  return (
    <article
      className={`group bg-white rounded-2xl border border-[#E5E0D6] overflow-hidden flex flex-col card-lift ${className}`}
    >
      {showImage && (
        <Link
          to={`/guides/${guide.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F2] block"
        >
          <img
            src={guide.image}
            alt={guide.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {guide.type === 'video' && (
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-white/90 text-[#2F5233] flex items-center justify-center shadow-md">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </span>
            </div>
          )}
          {topic && (
            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#2F5233] text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {topic.shortLabel}
            </span>
          )}
        </Link>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {!showImage && topic && (
            <span className="inline-block bg-[#E8EFE6] text-[#2F5233] text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              {topic.shortLabel}
            </span>
          )}
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#2B2B26] group-hover:text-[#2F5233] transition-colors line-clamp-2">
            <Link
              to={`/guides/${guide.slug}`}
              className="focus:outline-none focus-visible:underline"
            >
              {guide.title}
            </Link>
          </h3>
          <p className="text-sm text-[#6B6B60] leading-relaxed line-clamp-2">{guide.summary}</p>
        </div>

        <div className="pt-4 mt-4 border-t border-[#E5E0D6] flex items-center justify-between text-xs text-[#6B6B60]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#8FA88F]" aria-hidden="true" />
            {guide.readTime}
          </span>
          <Link
            to={`/guides/${guide.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-[#2F5233] hover:text-[#24402A] transition-colors"
            aria-label={`Read guide: ${guide.title}`}
          >
            Read{' '}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
