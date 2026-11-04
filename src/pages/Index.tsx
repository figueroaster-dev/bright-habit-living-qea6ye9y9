import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Play, Search, ShieldCheck, CheckCircle2 } from 'lucide-react'
import {
  SITE_METADATA,
  TOPICS,
  PUBLISHED_GUIDES,
  PUBLISHED_VIDEOS,
  PRODUCT_REVIEWS,
} from '@/data/content'
import { TopicCard } from '@/components/TopicCard'
import { GuideCard } from '@/components/GuideCard'
import { ReviewCard } from '@/components/ReviewCard'
import { VideoCard } from '@/components/VideoCard'

export default function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `${SITE_METADATA.name} — ${SITE_METADATA.tagline}`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', SITE_METADATA.brandPromise)
    }
  }, [])

  // Featured video selection (published videos only)
  const featuredVideo = PUBLISHED_VIDEOS.find((v) => v.isFeatured) || PUBLISHED_VIDEOS[0]
  const smallerVideos = PUBLISHED_VIDEOS.filter((v) => v.slug !== featuredVideo?.slug).slice(0, 3)

  // Recent content (published content only)
  const recentGuides = PUBLISHED_GUIDES.slice(0, 3)
  const recentReviews = PRODUCT_REVIEWS.slice(0, 2)

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section
        aria-labelledby="hero-heading"
        className="relative pt-6 sm:pt-12 lg:pt-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Eyebrow, Exact Headline, Exact Supporting Copy, Exact CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 animate-fade-rise">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE6] border border-[#8FA88F]/40 text-[#2F5233] text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#2F5233]" />
                SMALL HABITS. BRIGHTER DAYS.
              </div>

              <h1
                id="hero-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#2B2B26] leading-[1.12]"
              >
                Wellness choices, made clearer.
              </h1>

              <p className="text-lg sm:text-xl text-[#6B6B60] leading-relaxed max-w-2xl">
                Explore practical guides, short videos, and thoughtful reviews for everyday
                wellness.
              </p>

              {/* Exact CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/guides"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-[#FAF7F2] font-semibold text-base shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D99A3D]"
                >
                  Explore the Guides
                </Link>

                <Link
                  to="/videos"
                  className="inline-flex items-center justify-center px-6 py-4 rounded-full text-[#2F5233] hover:bg-[#E8EFE6] font-semibold text-base transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233]"
                >
                  Watch the Latest Videos
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Small trust indicator */}
              <div className="pt-4 flex items-center gap-4 text-xs text-[#6B6B60]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F5233]" />
                  General education
                </span>
                <span className="text-[#8FA88F]">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F5233]" />
                  Citations required
                </span>
                <span className="text-[#8FA88F]">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F5233]" />
                  No miracle claims
                </span>
              </div>
            </div>

            {/* Right Column: Natural lifestyle photography with organic backdrop */}
            <div className="lg:col-span-5 relative">
              <div
                aria-hidden="true"
                className="absolute -top-8 -right-8 w-72 h-72 sm:w-96 sm:h-96 bg-[#8FA88F]/20 rounded-full blur-3xl pointer-events-none"
              />
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E5E0D6] bg-white aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                <img
                  src="https://img.usecurling.com/p/800/1000?q=person%20nourishing%20breakfast%20morning%20sunlight&color=green"
                  alt="A nourishing, calm morning breakfast setting bathed in warm natural sunlight"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F5233]/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E5E0D6] shadow-sm">
                  <p className="font-serif text-sm font-medium text-[#2B2B26]">
                    &ldquo;Clear, practical guidance for everyday wellness choices.&rdquo;
                  </p>
                  <span className="text-[11px] uppercase tracking-wider text-[#8FA88F] font-semibold mt-1 block">
                    The Bright Habit Promise
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOPIC CARDS SECTION */}
      <section aria-labelledby="topics-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
              Explore Pillars
            </span>
            <h2
              id="topics-heading"
              className="font-serif text-3xl sm:text-4xl font-normal text-[#2B2B26]"
            >
              Start with a topic.
            </h2>
          </div>
          <Link
            to="/guides"
            className="text-sm font-semibold text-[#2F5233] hover:text-[#24402A] inline-flex items-center group"
          >
            View all guides{' '}
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-across desktop, 2x2 tablet, stacked mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED VIDEO AREA (poster + play button to page — never inline, never autoplay) */}
      <section
        aria-labelledby="video-section-heading"
        className="bg-[#E8EFE6]/70 py-16 sm:py-20 border-y border-[#E5E0D6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#2F5233]">
                Video Library
              </span>
              <h2
                id="video-section-heading"
                className="font-serif text-3xl sm:text-4xl font-normal text-[#2B2B26]"
              >
                Short videos for everyday routines.
              </h2>
            </div>
            <Link
              to="/videos"
              className="text-sm font-semibold text-[#2F5233] hover:text-[#24402A] inline-flex items-center group"
            >
              Browse all videos{' '}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Split layout: 16:9 poster with play button + right summary */}
          {featuredVideo && (
            <div className="bg-white rounded-3xl border border-[#E5E0D6] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-7 relative aspect-video bg-[#24402A] group">
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                {/* Click navigates to the video page — never autoplay inline */}
                <button
                  type="button"
                  onClick={() => navigate(`/guides/${featuredVideo.guideSlug}`)}
                  aria-label={`Watch video: ${featuredVideo.title}`}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D99A3D]"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] text-[#2F5233] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#F3C9A8] transition-transform">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  </div>
                </button>

                {featuredVideo.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2.5 py-1 rounded">
                    {featuredVideo.duration}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E5E0D6]">
                  Featured Video
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26] leading-snug">
                  {featuredVideo.title}
                </h3>
                <p className="text-sm sm:text-base text-[#6B6B60] leading-relaxed">
                  {featuredVideo.summary}
                </p>
                <div className="pt-3">
                  <Link
                    to={`/guides/${featuredVideo.guideSlug}`}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-semibold text-sm transition-colors"
                  >
                    Watch Video &amp; Read Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Row of three smaller video thumbnails */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F] mb-4">
              More from the Video Library
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {smallerVideos.map((vid) => (
                <VideoCard key={vid.slug} video={vid} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECENT GUIDES + REVIEWS SECTION (two-column editorial layout) */}
      <section aria-labelledby="recent-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Recent Guides */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-end justify-between border-b border-[#E5E0D6] pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                  Editorial
                </span>
                <h2
                  id="recent-heading"
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26]"
                >
                  Recent Guides
                </h2>
              </div>
              <Link to="/guides" className="text-xs font-semibold text-[#2F5233] hover:underline">
                View all →
              </Link>
            </div>

            <div className="space-y-4">
              {recentGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>

          {/* Right Column: Recent Reviews (empty state while no verified reviews exist) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-end justify-between border-b border-[#E5E0D6] pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                  Evaluations
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26]">
                  Recent Reviews
                </h2>
              </div>
              <Link to="/reviews" className="text-xs font-semibold text-[#2F5233] hover:underline">
                All reviews →
              </Link>
            </div>

            <div className="space-y-6">
              {recentReviews.length === 0 ? (
                <div className="bg-[#FAF7F2] border border-dashed border-[#E5E0D6] rounded-2xl p-8 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <p className="font-serif text-lg font-normal text-[#2B2B26]">
                    Product reviews are coming soon. We publish them after checking product details
                    and sources.
                  </p>
                  <p className="text-sm text-[#6B6B60] leading-relaxed">
                    We only publish a review after its facts are verified. In the meantime, browse
                    our{' '}
                    <Link to="/guides" className="font-semibold text-[#2F5233] hover:underline">
                      guides
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
                  <Link
                    to="/reviews"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-semibold text-sm transition-colors"
                  >
                    Visit the Reviews Section
                  </Link>
                </div>
              ) : (
                recentReviews.map((rev) => <ReviewCard key={rev.slug} review={rev} />)
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. "HOW WE REVIEW PRODUCTS" SECTION (Research -> Check sources -> Review clearly) */}
      <section
        aria-labelledby="review-process-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-[#E8EFE6] rounded-3xl p-8 sm:p-12 border border-[#8FA88F]/40 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#2F5233]">
              Transparency in Practice
            </span>
            <h2
              id="review-process-heading"
              className="font-serif text-3xl sm:text-4xl font-normal text-[#2B2B26]"
            >
              How we review products.
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B60] leading-relaxed">
              We separate manufacturer hype from verifiable facts. Every review follows three core
              steps before publication:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D6] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#E8EFE6] text-[#2F5233] font-serif text-lg font-bold flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif text-xl font-normal text-[#2B2B26]">Research</h3>
              <p className="text-sm text-[#6B6B60] leading-relaxed">
                We inspect what is actually verifiable: the Supplement Facts panel, serving sizes,
                manufacturer certifications, and facility standards.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D6] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#E8EFE6] text-[#2F5233] font-serif text-lg font-bold flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif text-xl font-normal text-[#2B2B26]">Check sources</h3>
              <p className="text-sm text-[#6B6B60] leading-relaxed">
                Claims need reliable sourcing. We check clinical literature on ingredients versus
                finished products and flag any claims lacking backing.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D6] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#E8EFE6] text-[#2F5233] font-serif text-lg font-bold flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif text-xl font-normal text-[#2B2B26]">Review clearly</h3>
              <p className="text-sm text-[#6B6B60] leading-relaxed">
                We deliver balanced pros, considerations, and thoughtful questions readers can ask
                the producer directly before making a purchase.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#8FA88F]/30 pt-6">
            <p className="text-xs sm:text-sm text-[#2F5233]">
              Read how we protect editorial integrity and verify claims:
            </p>
            <Link
              to="/editorial-standards"
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-semibold text-sm transition-colors shadow-sm"
            >
              Read our Editorial Standards
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. COMPLIANCE NOTE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#E5E0D6] bg-white rounded-2xl p-4 sm:p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-[#6B6B60]">
          <ShieldCheck className="w-4 h-4 text-[#2F5233] shrink-0" />
          <span>{SITE_METADATA.medicalDisclaimer}</span>
          <Link
            to="/editorial-standards"
            className="text-[#2F5233] underline font-semibold hover:text-[#24402A]"
          >
            Learn more
          </Link>
        </div>
      </section>
    </div>
  )
}
