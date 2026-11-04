import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Clock, ArrowRight } from 'lucide-react'
import { VideoItem, TOPICS } from '@/data/content'

interface VideoCardProps {
  video: VideoItem
  className?: string
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, className = '' }) => {
  const topic = TOPICS.find((t) => t.slug === video.topicSlug)

  return (
    <article
      className={`group bg-white rounded-2xl border border-[#E5E0D6] overflow-hidden flex flex-col card-lift ${className}`}
    >
      <Link
        to={`/guides/${video.guideSlug}`}
        className="relative aspect-video overflow-hidden bg-[#24402A] block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233]"
        aria-label={`Watch video: ${video.title}`}
      >
        <img
          src={video.thumbnail}
          alt={`Thumbnail for ${video.title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 text-[#2F5233] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 group-hover:bg-[#F3C9A8]">
            <Play className="w-5 h-5 fill-current ml-0.5" aria-hidden="true" />
          </div>
        </div>

        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded">
            {video.duration}
          </div>
        )}

        {topic && (
          <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#2F5233] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
            {topic.shortLabel}
          </span>
        )}
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-serif text-base sm:text-lg font-normal text-[#2B2B26] group-hover:text-[#2F5233] transition-colors line-clamp-2">
            <Link to={`/guides/${video.guideSlug}`}>{video.title}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6B60] leading-relaxed line-clamp-2">
            {video.summary}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-[#E5E0D6] flex items-center justify-between text-xs text-[#6B6B60]">
          {video.publishedDate ? (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#8FA88F]" aria-hidden="true" />
              {video.publishedDate}
            </span>
          ) : (
            <span />
          )}
          <Link
            to={`/guides/${video.guideSlug}`}
            className="inline-flex items-center gap-1 font-semibold text-[#2F5233] hover:text-[#24402A]"
          >
            Watch{' '}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
