import React, { useState } from 'react'
import { Play, Video } from 'lucide-react'

interface VideoEmbedPlaceholderProps {
  posterImage: string
  title: string
  duration?: string
  embedUrl?: string
  className?: string
}

export const VideoEmbedPlaceholder: React.FC<VideoEmbedPlaceholderProps> = ({
  posterImage,
  title,
  duration,
  embedUrl,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  // If owner supplies an embed URL and user clicks Play, show the iframe without autoplay
  if (embedUrl && isPlaying) {
    return (
      <div
        className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg ${className}`}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#24402A] shadow-md group">
        <img
          src={posterImage}
          alt={`Video thumbnail for: ${title}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Play button trigger */}
        <button
          type="button"
          onClick={() => {
            if (embedUrl) {
              setIsPlaying(true)
            } else {
              // Intentionally informative alert or no-op since no embed URL exists yet
              setIsPlaying(false)
            }
          }}
          aria-label={embedUrl ? `Play video: ${title}` : `Video placeholder: ${title}`}
          className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] text-[#2F5233] flex items-center justify-center shadow-xl transition-all duration-200 group-hover:scale-110 group-hover:bg-[#F3C9A8]">
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" aria-hidden="true" />
          </div>
        </button>

        {/* Duration badge */}
        {duration && (
          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {duration}
          </div>
        )}
      </div>

      {/* Clearly marked owner instruction panel */}
      {!embedUrl && (
        <div
          role="note"
          aria-label="Video embed instructions"
          className="border-2 border-dashed border-[#8FA88F] bg-[#E8EFE6]/60 rounded-xl p-4 text-[#2B2B26] text-xs sm:text-sm flex items-start gap-3"
        >
          <Video className="w-5 h-5 text-[#2F5233] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold text-[#2F5233]">
              VIDEO EMBED PLACEHOLDER — Owner to insert embed URL
            </p>
            <p className="text-[#6B6B60] leading-relaxed">
              // EDIT ME: In{' '}
              <code className="bg-white/80 px-1.5 py-0.5 rounded text-[#2F5233] font-mono text-xs">
                src/data/content.ts
              </code>
              , add your YouTube or Vimeo embed URL to{' '}
              <code className="bg-white/80 px-1.5 py-0.5 rounded text-[#2F5233] font-mono text-xs">
                videoEmbedUrl
              </code>
              . Videos never autoplay to protect accessibility.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
