import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronRight,
  Clock,
  Calendar,
  Share2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText,
  Sparkles,
} from 'lucide-react'
import {
  GUIDES,
  TOPICS,
  PRODUCT_REVIEWS,
  SITE_METADATA,
  GUIDE_PUBLISH_STATUS,
} from '@/data/content'
import { SourceList } from '@/components/SourceList'
import { AffiliateDisclosureCallout } from '@/components/AffiliateDisclosureCallout'
import { VideoEmbedPlaceholder } from '@/components/VideoEmbedPlaceholder'
import { GuideCard } from '@/components/GuideCard'
import { ReviewCard } from '@/components/ReviewCard'

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const guide = GUIDES.find((g) => g.slug === slug)

  useEffect(() => {
    if (guide) {
      document.title = `${guide.title} — ${SITE_METADATA.name}`

      // Guides whose factual claims rest only on pending sources stay unpublished:
      // the route still resolves but search engines are told not to index it.
      const publishStatus = GUIDE_PUBLISH_STATUS[guide.slug]
      const isIndexable = !publishStatus || publishStatus.isPublished
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
  }, [guide])

  if (!guide) {
    return <Navigate to="/guides" replace />
  }

  const topic = TOPICS.find((t) => t.slug === guide.topicSlug)

  // Related content
  const relatedGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 2)
  const relatedReview = guide.recommendedProductSlug
    ? PRODUCT_REVIEWS.find((r) => r.slug === guide.recommendedProductSlug)
    : PRODUCT_REVIEWS[0]

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* 1. Breadcrumb */}
      <nav
        aria-label="Breadcrumbs"
        className="flex items-center text-xs text-[#6B6B60] overflow-x-auto"
      >
        <Link to="/" className="hover:text-[#2F5233] shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-[#8FA88F]" />
        <Link to="/guides" className="hover:text-[#2F5233] shrink-0">
          Guides
        </Link>
        {topic && (
          <>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-[#8FA88F]" />
            <Link to={`/guides?topic=${topic.slug}`} className="hover:text-[#2F5233] shrink-0">
              {topic.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-[#8FA88F]" />
        <span className="text-[#2B2B26] font-medium truncate max-w-xs sm:max-w-md">
          {guide.title}
        </span>
      </nav>

      {/* 2. Header Area */}
      <header className="max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          {topic && (
            <Link
              to={`/guides?topic=${topic.slug}`}
              className="bg-[#E8EFE6] text-[#2F5233] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full hover:bg-[#2F5233] hover:text-white transition-colors"
            >
              {topic.name}
            </Link>
          )}
          {guide.type === 'video' && (
            <span className="bg-[#FAF7F2] border border-[#E5E0D6] text-[#2B2B26] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
              Video &amp; Article Guide
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2B2B26] tracking-tight leading-[1.15]">
          {guide.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#6B6B60] leading-relaxed">{guide.summary}</p>

        {/* Metadata bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-y border-[#E5E0D6] py-3 text-xs text-[#6B6B60]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {guide.publishedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8FA88F]" />
                Published: {guide.publishedDate}
              </span>
            )}
            {guide.lastReviewedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2F5233]" />
                <strong className="font-medium text-[#2B2B26]">Last reviewed:</strong>{' '}
                {guide.lastReviewedDate}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8FA88F]" />
              {guide.readTime}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Share this guide"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2F5233] hover:text-[#24402A] p-1 rounded"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Link copied!' : 'Share'}
          </button>
        </div>
      </header>

      {/* 3. Main Body + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
        {/* Left Column: Article & Media */}
        <div className="lg:col-span-8 space-y-10">
          {/* If video guide: video embed placeholder + collapsible transcript */}
          {guide.type === 'video' ? (
            <div className="space-y-6">
              <VideoEmbedPlaceholder
                posterImage={guide.image}
                title={guide.title}
                duration={guide.videoDuration}
                embedUrl={guide.videoEmbedUrl}
              />

              {/* Collapsible keyboard-accessible Transcript section */}
              {guide.transcript && (
                <div className="border border-[#E5E0D6] rounded-2xl bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setTranscriptOpen((prev) => !prev)}
                    aria-expanded={transcriptOpen}
                    aria-controls="transcript-panel"
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-serif text-lg text-[#2B2B26] hover:bg-[#FAF7F2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233]"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#2F5233]" />
                      Video Transcript &amp; Timecodes
                    </span>
                    {transcriptOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#8FA88F]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#8FA88F]" />
                    )}
                  </button>

                  {transcriptOpen && (
                    <div
                      id="transcript-panel"
                      role="region"
                      aria-label="Video transcript text"
                      className="p-5 sm:p-6 border-t border-[#E5E0D6] bg-[#FAF7F2]/60 text-sm text-[#2B2B26] font-mono whitespace-pre-line leading-relaxed overflow-x-auto"
                    >
                      {guide.transcript}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Standard article hero image */
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#E5E0D6] shadow-sm">
              <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Lead Intro Paragraph */}
          <div className="text-lg sm:text-xl text-[#2B2B26] font-serif leading-relaxed border-l-2 border-[#8FA88F] pl-5 italic">
            &ldquo;{guide.intro}&rdquo;
          </div>

          {/* Article Structured Body */}
          <div className="space-y-8 text-[#2B2B26] text-base sm:text-lg leading-relaxed">
            {guide.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2B26] pt-2">
                  {sec.heading}
                </h2>
                {sec.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#2B2B26] leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.callout && (
                  <div className="my-6 p-6 rounded-2xl bg-[#E8EFE6]/70 border border-[#8FA88F]/40 space-y-2">
                    <h3 className="font-serif text-lg font-normal text-[#2F5233]">
                      {sec.callout.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#2B2B26] leading-relaxed">
                      {sec.callout.text}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Product mention / Affiliate CTA callout if applicable */}
          {guide.hasProductMention && relatedReview && (
            <div className="space-y-4 pt-6 border-t border-[#E5E0D6]">
              {/* Exact plain-language disclosure directly above recommendation */}
              <AffiliateDisclosureCallout />

              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D99A3D]" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                    Related Product Review
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2B26]">
                  {relatedReview.productName}
                </h3>
                <p className="text-sm text-[#6B6B60] leading-relaxed">{relatedReview.summary}</p>
                <div className="pt-2">
                  <Link
                    to={`/reviews/${relatedReview.slug}`}
                    className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-medium text-sm transition-colors"
                  >
                    Read Our Full Editorial Review →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Sources & Further Reading block (renders whenever claims exist) */}
          <SourceList sources={guide.sources} />

          {/* Closing Medical Disclaimer Line */}
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E5E0D6] flex items-start gap-3 text-sm text-[#6B6B60]">
            <AlertCircle className="w-5 h-5 text-[#2F5233] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-[#2B2B26]">
                Have questions about your health? Talk with a qualified health professional.
              </p>
              <p className="text-xs text-[#6B6B60] leading-relaxed">
                This guide is for informational and educational purposes only and cannot replace
                personalized medical assessment.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar (stacks below on mobile) */}
        <aside aria-label="Related content" className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E0D6] space-y-6">
            <h3 className="font-serif text-xl font-normal text-[#2B2B26] pb-3 border-b border-[#E5E0D6]">
              About This Guide
            </h3>

            <div className="space-y-3 text-xs text-[#6B6B60]">
              <div>
                <span className="font-medium text-[#2B2B26] block">Editorial Pillar:</span>
                <span>{topic ? topic.name : 'Everyday Wellness'}</span>
              </div>
              <div>
                <span className="font-medium text-[#2B2B26] block">Verification Status:</span>
                {/* Derived from the actual sources on this guide — never claim verification that does not exist */}
                {(() => {
                  const sources = guide.sources ?? []
                  const allVerified =
                    sources.length > 0 && sources.every((s) => s.verified && s.url)
                  if (allVerified) {
                    return (
                      <span className="inline-flex items-center text-[#2F5233] bg-[#E8EFE6] px-2 py-0.5 rounded font-medium mt-1">
                        All sources verified
                      </span>
                    )
                  }
                  return (
                    <span className="inline-flex items-center text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-medium mt-1 border border-dashed border-amber-300">
                      Source verification pending
                    </span>
                  )
                })()}
              </div>
              <div>
                <span className="font-medium text-[#2B2B26] block">Editorial Standards:</span>
                <Link
                  to="/editorial-standards"
                  className="text-[#2F5233] underline hover:text-[#24402A]"
                >
                  Read how we review claims →
                </Link>
              </div>
            </div>
          </div>

          {/* Related Guides */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-normal text-[#2B2B26]">Related Guides</h3>
            <div className="space-y-4">
              {relatedGuides.map((rg) => (
                <GuideCard key={rg.slug} guide={rg} showImage={false} />
              ))}
            </div>
          </div>

          {/* Related Review */}
          {relatedReview && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-normal text-[#2B2B26]">Related Review</h3>
              <ReviewCard review={relatedReview} />
            </div>
          )}
        </aside>
      </div>
    </article>
  )
}
