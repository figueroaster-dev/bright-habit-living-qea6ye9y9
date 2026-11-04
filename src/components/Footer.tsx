import React from 'react'
import { Link } from 'react-router-dom'
import { SITE_METADATA, TOPICS } from '@/data/content'

export const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      className="bg-[#24402A] text-[#FAF7F2] pt-16 pb-12 mt-auto border-t border-[#2F5233]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-column desktop / stacked mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#FAF7F2]/15">
          {/* Col 1: Wordmark & Promise */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                {SITE_METADATA.name}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#F3C9A8] font-medium font-sans block mt-0.5">
                {SITE_METADATA.tagline}
              </span>
            </div>
            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed">
              {SITE_METADATA.brandPromise}
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs text-[#FAF7F2]/70 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Editorial Wellness Guidance
              </span>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-normal text-white">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>
                <Link to="/guides" className="hover:text-white transition-colors">
                  All Wellness Guides
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-white transition-colors">
                  Video Library
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition-colors">
                  Product Reviews &amp; Checks
                </Link>
              </li>
              {TOPICS.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    to={`/guides?topic=${topic.slug}`}
                    className="hover:text-white transition-colors text-xs text-[#FAF7F2]/60"
                  >
                    • {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial & Company */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-normal text-white">Site</h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Bright Habit Living
                </Link>
              </li>
              <li>
                <Link to="/editorial-standards" className="hover:text-white transition-colors">
                  Editorial Standards &amp; Sourcing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Corrections
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-normal text-white">Legal &amp; Trust</h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>
                <Link
                  to="/affiliate-disclosure"
                  className="text-[#F3C9A8] font-medium hover:underline"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy &amp; Terms of Use
                </Link>
              </li>
            </ul>
            <p className="text-xs text-[#FAF7F2]/60 leading-relaxed pt-2">
              We never process customer payments or provide telemedicine consultations.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/70 text-center md:text-left">
          <p className="max-w-2xl leading-relaxed">
            © {new Date().getFullYear()} {SITE_METADATA.copyrightNotice}{' '}
            <Link to="/editorial-standards" className="underline hover:text-white ml-1">
              Read our full medical disclaimer →
            </Link>
          </p>
          <div className="shrink-0 text-xs text-[#FAF7F2]/50">
            Natural US English • No Autoplay • Accessible
          </div>
        </div>
      </div>
    </footer>
  )
}
