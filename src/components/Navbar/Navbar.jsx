// Navbar component — Pet's Home
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useAdmin } from '../../context/AdminAuthContext'

const Navbar = () => {
  const { lang, changeLanguage, t } = useLanguage()
  const { isAdmin, logout } = useAdmin()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [adminMenuOpen, setAdminMenuOpen] = useState(false)

  const handleAdminLogout = async () => {
    await logout()
    setAdminMenuOpen(false)
    navigate('/')
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('deals'), href: '/deals' },
    { label: t('services'), href: '/services' },
    { label: t('trackAppointment'), href: '/track-appointment' },
    { label: t('newsBlog'), href: '/news' },
    { label: t('contactUs'), href: '/contact' },
  ]

  return (
    <header
      id="navbar"
      className={`bg-white transition-shadow duration-280 ${scrolled ? 'shadow-md sticky top-0 z-50' : 'border-b border-border-light'}`}
    >
      {/* ── Top utility bar ── */}
      <div className="bg-white border-b border-border-light text-[11px] text-text-light">
        <div className="container-site flex items-center justify-between py-2 gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-normal">
              <PhoneIcon /> +1 567 890
            </span>
            <span className="flex items-center gap-1.5 font-normal">
              <MailIcon /> contact@petshop.com
            </span>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-normal text-right">
              <MapPinIcon /> {t('address')}
            </div>
            <span className="text-[#dddddd] select-none">|</span>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => changeLanguage('vi')}
                className={`font-bold transition-colors ${lang === 'vi' ? 'text-primary' : 'text-text-light hover:text-primary'}`}
              >
                VI
              </button>
              <span className="text-[#dddddd] font-light select-none">/</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`font-bold transition-colors ${lang === 'en' ? 'text-primary' : 'text-text-light hover:text-primary'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <div className="container-site">
        <div className="flex items-center justify-between gap-4 py-4">
          
          {/* Logo */}
          <Link to="/" id="navbar-logo" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-red">
              <PawIcon className="text-white" size={16} />
            </div>
            <span className="font-heading font-bold text-base text-brown-dark tracking-tight">
              Pet Shop<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Navigation links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-xs font-semibold tracking-wide transition-colors duration-180 hover:text-primary ${
                    isActive ? 'text-primary' : 'text-text-light'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions: Search + Icons */}
          <div className="flex items-center gap-4">
            {/* Icons */}
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <div className="relative">
                  <button
                    id="navbar-account-btn"
                    type="button"
                    onClick={() => setAdminMenuOpen(v => !v)}
                    className="relative p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                    aria-label="Admin menu"
                    aria-expanded={adminMenuOpen}
                  >
                    <UserIcon size={18} />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-white" />
                  </button>

                  {adminMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-border-light rounded-card shadow-high p-2 z-50">
                      <div className="px-3 py-2 border-b border-border-light mb-1">
                        <p className="text-xs font-bold text-brown-dark leading-tight">Admin</p>
                        <p className="text-[10px] text-muted">Đã đăng nhập</p>
                      </div>
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setAdminMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-btn text-xs font-semibold text-text-light hover:bg-bg-light hover:text-primary transition-colors"
                      >
                        <DashboardIcon size={14} />
                        Quản lý
                      </Link>
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-btn text-xs font-semibold text-text-light hover:bg-red-50 hover:text-primary transition-colors text-left"
                      >
                        <LogoutIcon size={14} />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/admin/login" id="navbar-account-btn" className="p-2 rounded-full hover:bg-bg-light transition-colors text-text-light hover:text-primary flex items-center justify-center" aria-label={t('account')}>
                  <UserIcon size={18} />
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                id="navbar-menu-btn"
                className="md:hidden p-2 rounded-full hover:bg-bg-light transition-colors"
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border-light shadow-high animate-fade-in">
          <div className="container-site py-4 space-y-4">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-3 py-2 rounded-btn text-xs hover:bg-bg-light hover:text-primary transition-colors ${
                        isActive ? 'text-primary font-bold bg-bg-light' : 'text-text-light'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

/* ── Inline SVG icons ── */
const PhoneIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)
const MapPinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const SearchIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
)
const HeartIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
)
const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const CartIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
)
const PawIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="6" cy="6.5" rx="2" ry="3"/><ellipse cx="17.5" cy="5.5" rx="2" ry="3"/>
    <ellipse cx="2" cy="14" rx="2" ry="3" transform="rotate(-45 2 14)"/>
    <ellipse cx="22" cy="14" rx="2" ry="3" transform="rotate(45 22 14)"/>
    <path d="M12 12c-4 0-7 3-7 6s2.5 4 7 4 7-1 7-4-3-6-7-6z"/>
  </svg>
)
const MenuIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const CloseIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const DashboardIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
)
const LogoutIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

export default Navbar


