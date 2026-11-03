import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { Header } from './Header'
import { Footer } from './Footer'

export default function Layout() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showTopDisclosure, setShowTopDisclosure] = useState(true)
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.search])

  // Scroll-to-top button appearance after 600px scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#2B2B26] antialiased font-sans selection:bg-[#F3C9A8] selection:text-[#2B2B26]">
      {/* Skip to main content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#2F5233] text-white px-4 py-2 rounded-full font-medium shadow-lg outline-none ring-2 ring-white"
      >
        Skip to main content
      </a>

      {/* Global Header */}
      <Header showTopBar={showTopDisclosure} onDismissTopBar={() => setShowTopDisclosure(false)} />

      {/* Main Content Container */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Circular Sage Scroll to top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-[#8FA88F] hover:bg-[#2F5233] text-white flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D99A3D]"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
