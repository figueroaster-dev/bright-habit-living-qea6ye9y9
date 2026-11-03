import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'

// Pages
import Index from './pages/Index'
import GuidesIndex from './pages/GuidesIndex'
import GuideDetail from './pages/GuideDetail'
import VideosIndex from './pages/VideosIndex'
import ReviewsIndex from './pages/ReviewsIndex'
import ReviewDetail from './pages/ReviewDetail'
import About from './pages/About'
import EditorialStandards from './pages/EditorialStandards'
import AffiliateDisclosure from './pages/AffiliateDisclosure'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/guides" element={<GuidesIndex />} />
          <Route path="/guides/:slug" element={<GuideDetail />} />
          <Route path="/videos" element={<VideosIndex />} />
          <Route path="/reviews" element={<ReviewsIndex />} />
          <Route path="/reviews/:slug" element={<ReviewDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/editorial-standards" element={<EditorialStandards />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
