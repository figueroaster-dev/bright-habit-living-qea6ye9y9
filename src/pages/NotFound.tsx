import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Compass, BookOpen, Video, Sparkles, ArrowRight, Home } from 'lucide-react'
import { SITE_METADATA } from '@/data/content'

export default function NotFound() {
  useEffect(() => {
    document.title = `Page Not Found (404) — ${SITE_METADATA.name}`
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-8 animate-fade-rise">
      <div className="w-20 h-20 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center mx-auto shadow-sm">
        <Compass className="w-10 h-10 stroke-[1.5]" />
      </div>

      <div className="space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8FA88F]">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2B2B26] tracking-tight">
          Page not found
        </h1>
        <p className="text-base sm:text-lg text-[#6B6B60] max-w-md mx-auto leading-relaxed">
          The page you are looking for may have moved or no longer exists. Let’s get you back to
          calm, practical guidance.
        </p>
      </div>

      {/* Suggested navigation cards: Guides, Videos, Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-left pt-4">
        <Link
          to="/guides"
          className="bg-white rounded-2xl p-6 border border-[#E5E0D6] card-lift hover:border-[#8FA88F] space-y-3 block"
        >
          <div className="w-10 h-10 rounded-full bg-[#E8EFE6] text-[#2F5233] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-lg font-normal text-[#2B2B26]">Wellness Guides</h2>
          <p className="text-xs text-[#6B6B60] leading-relaxed">
            Explore articles on sleep, nutrition, and daily routines.
          </p>
          <span className="text-xs font-semibold text-[#2F5233] inline-flex items-center">
            Browse guides <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </Link>

        <Link
          to="/videos"
          className="bg-white rounded-2xl p-6 border border-[#E5E0D6] card-lift hover:border-[#8FA88F] space-y-3 block"
        >
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#2F5233] flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-lg font-normal text-[#2B2B26]">Video Library</h2>
          <p className="text-xs text-[#6B6B60] leading-relaxed">
            Short, practical video walk-throughs and mobility tips.
          </p>
          <span className="text-xs font-semibold text-[#2F5233] inline-flex items-center">
            Watch videos <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </Link>

        <Link
          to="/reviews"
          className="bg-white rounded-2xl p-6 border border-[#E5E0D6] card-lift hover:border-[#8FA88F] space-y-3 block"
        >
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#2F5233] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#D99A3D]" />
          </div>
          <h2 className="font-serif text-lg font-normal text-[#2B2B26]">Product Reviews</h2>
          <p className="text-xs text-[#6B6B60] leading-relaxed">
            Objective formulation checks and honest pros &amp; cons.
          </p>
          <span className="text-xs font-semibold text-[#2F5233] inline-flex items-center">
            See reviews <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </Link>
      </div>

      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-[#2F5233] hover:bg-[#24402A] text-white font-medium text-sm transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
