import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Search, Menu, X, ArrowRight, ShieldCheck, FileText, Video, Sparkles } from 'lucide-react'
import {
  PUBLISHED_GUIDES,
  PUBLISHED_VIDEOS,
  PRODUCT_REVIEWS,
  SITE_METADATA,
  HAS_ACTIVE_AFFILIATE_LINKS,
} from '@/data/content'

interface HeaderProps {
  onDismissTopBar?: () => void
  showTopBar?: boolean
}

export const Header: React.FC<HeaderProps> = ({ showTopBar = true, onDismissTopBar }) => {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close search/drawer on navigation
  useEffect(() => {
    setDrawerOpen(false)
    setSearchQuery('')
    setSearchFocused(false)
    setMobileSearchOpen(false)
    setSelectedIndex(-1)
  }, [location.pathname, location.search])

  // Focus mobile input when mobile search opens
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => {
        mobileInputRef.current?.focus()
      }, 100)
    }
  }, [mobileSearchOpen])

  // Escape key handler for search & drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false)
        setMobileSearchOpen(false)
        setDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Search filtering
  const trimmed = searchQuery.trim().toLowerCase()
  const matchingGuides = trimmed
    ? PUBLISHED_GUIDES.filter(
        (g) => g.title.toLowerCase().includes(trimmed) || g.summary.toLowerCase().includes(trimmed),
      ).slice(0, 3)
    : []

  const matchingVideos = trimmed
    ? PUBLISHED_VIDEOS.filter(
        (v) => v.title.toLowerCase().includes(trimmed) || v.summary.toLowerCase().includes(trimmed),
      ).slice(0, 3)
    : []

  const matchingReviews = trimmed
    ? PRODUCT_REVIEWS.filter(
        (r) =>
          r.productName.toLowerCase().includes(trimmed) ||
          r.brand.toLowerCase().includes(trimmed) ||
          r.category.toLowerCase().includes(trimmed),
      ).slice(0, 3)
    : []

  const totalResults = [
    ...matchingGuides.map((g) => ({
      type: 'guide',
      path: `/guides/${g.slug}`,
      title: g.title,
      meta: 'Guide',
    })),
    ...matchingVideos.map((v) => ({
      type: 'video',
      path: `/guides/${v.guideSlug}`,
      title: v.title,
      meta: 'Video',
    })),
    ...matchingReviews.map((r) => ({
      type: 'review',
      path: `/reviews/${r.slug}`,
      title: r.productName,
      meta: 'Review',
    })),
  ]

  const handleSelectResult = (path: string) => {
    navigate(path)
    setSearchQuery('')
    setSearchFocused(false)
    setMobileSearchOpen(false)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (totalResults.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < totalResults.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalResults.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < totalResults.length) {
        handleSelectResult(totalResults[selectedIndex].path)
      } else if (totalResults[0]) {
        handleSelectResult(totalResults[0].path)
      }
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: 'Videos', path: '/videos' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
  ]

  return (
    <>
      {/* Top disclosure micro-bar (only when the site actually has active affiliate links) */}
      {showTopBar && HAS_ACTIVE_AFFILIATE_LINKS && (
        <aside
          aria-label="Affiliate Notice"
          className="bg-[#E8EFE6] text-[#2F5233] text-xs py-1.5 px-4 text-center border-b border-[#E5E0D6] flex items-center justify-center relative transition-colors"
        >
          <Link
            to="/affiliate-disclosure"
            className="inline-flex items-center gap-1.5 font-medium underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233] rounded"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#2F5233]" aria-hidden="true" />
            <span>This site contains affiliate links. Learn more →</span>
          </Link>
          {onDismissTopBar && (
            <button
              type="button"
              onClick={onDismissTopBar}
              aria-label="Dismiss affiliate notice"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2F5233] hover:text-[#24402A] p-1 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </aside>
      )}

      {/* Main Sticky Header */}
      <header
        role="banner"
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E5E0D6]'
            : 'bg-[#FAF7F2] border-b border-[#E5E0D6]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Wordmark logo */}
            <Link
              to="/"
              className="group flex flex-col justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233] rounded-lg p-1"
            >
              <span className="font-serif text-2xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#2B2B26] group-hover:text-[#2F5233] transition-colors">
                {SITE_METADATA.name}
              </span>
              <span className="hidden md:block text-[11px] uppercase tracking-widest text-[#8FA88F] font-medium font-sans -mt-0.5">
                {SITE_METADATA.tagline}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `relative py-2 text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'text-[#2F5233] font-semibold'
                        : 'text-[#2B2B26] hover:text-[#2F5233]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D99A3D] rounded-full animate-underline-grow" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Search */}
              <div className="relative hidden md:block w-64 lg:w-72">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8FA88F] pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    role="combobox"
                    aria-expanded={searchFocused && Boolean(trimmed)}
                    aria-controls="desktop-search-results"
                    aria-autocomplete="list"
                    aria-label="Search guides, videos, and reviews"
                    placeholder="Search guides, reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => {
                      // Slight delay so clicks on dropdown items register
                      setTimeout(() => setSearchFocused(false), 200)
                    }}
                    onKeyDown={handleSearchKeyDown}
                    className="w-full bg-white border border-[#E5E0D6] rounded-full pl-9 pr-8 py-2 text-sm text-[#2B2B26] placeholder-[#8FA88F] focus:outline-none focus:border-[#2F5233] focus:ring-2 focus:ring-[#2F5233]/20 transition-all shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8FA88F] hover:text-[#2B2B26] p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Dropdown Live Results */}
                {searchFocused && trimmed && (
                  <div
                    id="desktop-search-results"
                    role="listbox"
                    className="absolute top-full mt-2 w-80 lg:w-96 right-0 bg-white rounded-2xl border border-[#E5E0D6] shadow-xl overflow-hidden z-50 p-3 space-y-3"
                  >
                    {totalResults.length === 0 ? (
                      <div className="p-4 text-center text-sm text-[#6B6B60]">
                        No matching guides, videos, or reviews found for &ldquo;{searchQuery}
                        &rdquo;.
                      </div>
                    ) : (
                      <div className="space-y-1 max-h-96 overflow-y-auto">
                        <div className="px-2 py-1 text-[11px] uppercase tracking-wider font-semibold text-[#8FA88F]">
                          Matching Content ({totalResults.length})
                        </div>
                        {totalResults.map((item, idx) => (
                          <button
                            key={item.path}
                            type="button"
                            role="option"
                            aria-selected={idx === selectedIndex}
                            onMouseDown={() => handleSelectResult(item.path)}
                            className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-colors ${
                              idx === selectedIndex
                                ? 'bg-[#E8EFE6] text-[#2F5233]'
                                : 'hover:bg-[#FAF7F2] text-[#2B2B26]'
                            }`}
                          >
                            <span className="mt-0.5 text-[#2F5233]">
                              {item.type === 'guide' && <FileText className="w-4 h-4" />}
                              {item.type === 'video' && <Video className="w-4 h-4" />}
                              {item.type === 'review' && <Sparkles className="w-4 h-4" />}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold uppercase tracking-wider text-[#8FA88F]">
                                {item.meta}
                              </p>
                              <p className="text-sm font-medium truncate">{item.title}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#8FA88F] shrink-0 self-center" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Search Toggle Icon */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
                className="md:hidden p-2.5 rounded-full text-[#2B2B26] hover:bg-white border border-[#E5E0D6]"
              >
                {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {/* Mobile Hamburger Drawer Toggle */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={drawerOpen}
                className="lg:hidden p-2.5 rounded-full text-[#2B2B26] hover:bg-white border border-[#E5E0D6]"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Width Search Input (expanded below header) */}
        {mobileSearchOpen && (
          <div className="md:hidden border-t border-[#E5E0D6] bg-white p-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8FA88F]" />
              <input
                ref={mobileInputRef}
                type="search"
                aria-label="Search guides, videos, and reviews"
                placeholder="Search guides, videos, reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E5E0D6] rounded-full pl-9 pr-9 py-2.5 text-sm text-[#2B2B26] placeholder-[#8FA88F] focus:outline-none focus:border-[#2F5233]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear mobile search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA88F]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {trimmed && (
              <div className="max-h-72 overflow-y-auto space-y-1 pt-1">
                {totalResults.length === 0 ? (
                  <p className="text-sm text-center text-[#6B6B60] py-3">
                    No results for &ldquo;{searchQuery}&rdquo;
                  </p>
                ) : (
                  totalResults.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => handleSelectResult(item.path)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#FAF7F2] flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2F5233] bg-[#E8EFE6] px-2 py-0.5 rounded mr-2">
                          {item.meta}
                        </span>
                        <span className="font-medium text-[#2B2B26] truncate">{item.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8FA88F] shrink-0" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Mobile Slide-in Drawer with focus management */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Dim Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
            className="relative ml-auto w-full max-w-xs bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-drawer-slide z-10"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E0D6]">
                <div>
                  <span className="font-serif text-xl font-semibold text-[#2B2B26]">
                    {SITE_METADATA.name}
                  </span>
                  <p className="text-xs text-[#8FA88F]">{SITE_METADATA.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation drawer"
                  className="p-2 rounded-full hover:bg-white text-[#2B2B26] border border-[#E5E0D6]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav aria-label="Mobile Navigation" className="py-6 space-y-2">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#2F5233] text-white font-semibold'
                          : 'text-[#2B2B26] hover:bg-white'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#E5E0D6] space-y-1">
                <span className="px-4 text-xs uppercase tracking-wider font-semibold text-[#8FA88F]">
                  Editorial &amp; Legal
                </span>
                <Link
                  to="/editorial-standards"
                  className="block px-4 py-2 text-sm text-[#2B2B26] hover:text-[#2F5233]"
                >
                  Editorial Standards
                </Link>
                <Link
                  to="/affiliate-disclosure"
                  className="block px-4 py-2 text-sm text-[#2F5233] font-medium"
                >
                  Affiliate Disclosure
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-sm text-[#2B2B26] hover:text-[#2F5233]"
                >
                  Contact Us
                </Link>
                <Link
                  to="/privacy"
                  className="block px-4 py-2 text-sm text-[#6B6B60] hover:text-[#2B2B26]"
                >
                  Privacy Policy &amp; Terms
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E0D6]">
              <p className="text-xs text-[#6B6B60] leading-relaxed">{SITE_METADATA.brandPromise}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
