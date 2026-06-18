// Main App entrypoint with Routing and Context Provider — Pet's Home
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './Pages/Home'
import Deals from './Pages/Deals'
import Services from './Pages/Services'
import ContactUs from './Pages/ContactUs'
import News from './Pages/News'
import AppointmentTracking from './Pages/AppointmentTracking'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './App.css'

/* ────────────────────────────────────
   Shared Back to Top Button
──────────────────────────────────── */
const BackToTop = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (!show) return null
  return (
    <button
      id="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-10 h-10 bg-primary text-white rounded-full shadow-high flex items-center justify-center hover:bg-brown-dark transition-all duration-280 animate-fade-in z-50"
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  )
}

/* ────────────────────────────────────
   Public layout (with Navbar + Footer)
──────────────────────────────────── */
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    <BackToTop />
  </div>
)

const ScrollToTopOnRouteChange = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search])

  return null
}

function App() {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollToTopOnRouteChange />
          <Routes>
            {/* ── Admin routes (inside site layout) ── */}
            <Route path="/admin/login"     element={<PublicLayout><AdminLogin /></PublicLayout>} />
            <Route path="/admin/dashboard" element={<PublicLayout><AdminDashboard /></PublicLayout>} />
            <Route path="/admin"           element={<Navigate to="/admin/login" replace />} />

            {/* ── Public routes ── */}
            <Route path="/"        element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/deals"   element={<PublicLayout><Deals /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactUs /></PublicLayout>} />
            <Route path="/news"    element={<PublicLayout><News /></PublicLayout>} />
            <Route path="/track-appointment" element={<PublicLayout><AppointmentTracking /></PublicLayout>} />
            
            {/* Fallback to Home */}
            <Route path="*"        element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </LanguageProvider>
  )
}

export default App
