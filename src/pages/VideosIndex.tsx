import React, { useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Video, Filter, Sparkles, Clock } from 'lucide-react'
import { VIDEOS, TOPICS, SITE_METADATA } from '@/data/content'
import { VideoCard } from '@/components/VideoCard'

export default function VideosIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTopic = searchParams.get('topic') || 'all'

  useEffect(() => {
    document.title = `Video Library — ${SITE_METADATA.name}`
  }, [])

  const filteredVideos = useMemo(() => {
    if (activeTopic === 'all') return VIDEOS
    return VIDEOS.filter((v) => v.topicSlug === activeTopic)
  }, [activeTopic])

  const handleSelectTopic = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('topic')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ topic: slug })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4 animate-fade-rise">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold tracking-wider uppercase">
          <Video className="w-3.5 h-3.5" />
          Visual Guidance
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2B2B26] tracking-tight">
          Video Library
        </h1>
        <p className="text-base sm:text-lg text-[#6B6B60] leading-relaxed">
          Short, practical video walk-throughs covering mobility resets, morning circadian walks,
          label breakdowns, and calm evening routines.
        </p>
      </div>

      {/* Filter Row with Topic Pills */}
      <div className="border-y border-[#E5E0D6] py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F] mr-2 shrink-0 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>

          <button
            type="button"
            onClick={() => handleSelectTopic('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 ${
              activeTopic === 'all'
                ? 'bg-[#2F5233] text-white shadow-sm'
                : 'bg-white text-[#2B2B26] border border-[#E5E0D6] hover:bg-[#FAF7F2]'
            }`}
          >
            All Videos ({VIDEOS.length})
          </button>

          {TOPICS.map((topic) => {
            const count = VIDEOS.filter((v) => v.topicSlug === topic.slug).length
            const isSelected = activeTopic === topic.slug
            return (
              <button
                key={topic.slug}
                type="button"
                onClick={() => handleSelectTopic(topic.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#2F5233] text-white shadow-sm'
                    : 'bg-white text-[#2B2B26] border border-[#E5E0D6] hover:bg-[#FAF7F2]'
                }`}
              >
                {topic.name} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Responsive Grid of Video Cards */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <VideoCard key={video.slug} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#E5E0D6] space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF7F2] text-[#8FA88F] flex items-center justify-center">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-normal text-[#2B2B26]">
            No videos in this topic yet
          </h3>
          <p className="text-sm text-[#6B6B60] max-w-md mx-auto">
            Our editors are filming new walk-throughs. Try selecting &ldquo;All Videos&rdquo; or
            explore our written guides.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSelectTopic('all')}
              className="px-6 py-2.5 rounded-full bg-[#2F5233] text-white font-medium text-sm hover:bg-[#24402A]"
            >
              Show all videos
            </button>
          </div>
        </div>
      )}

      {/* Compliance Note */}
      <div className="pt-8 border-t border-[#E5E0D6] text-center text-xs text-[#6B6B60] flex flex-col sm:flex-row items-center justify-center gap-2">
        <Clock className="w-3.5 h-3.5 text-[#8FA88F]" />
        <span>
          Videos never autoplay on Bright Habit Living to respect your browsing pace and data.
        </span>
      </div>
    </div>
  )
}
