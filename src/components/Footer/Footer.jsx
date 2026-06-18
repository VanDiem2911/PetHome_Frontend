// Footer component — Pet's Home
import { useState } from 'react'
import { subscribeNewsletter } from '../../utils/api'
import { useLanguage } from '../../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await subscribeNewsletter(email)
      setSubscribed(true)
      setEmail('')
    } catch (err) {
      console.error(err)
      alert('Subscription failed. Please check your email and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer id="footer" className="bg-[#f8f9fa] border-t border-border-light text-text-light py-12 lg:py-16">
      <div className="container-site">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-red">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <ellipse cx="6" cy="6.5" rx="2" ry="3"/>
                  <ellipse cx="17.5" cy="5.5" rx="2" ry="3"/>
                  <ellipse cx="2" cy="14" rx="2" ry="3" transform="rotate(-45 2 14)"/>
                  <ellipse cx="22" cy="14" rx="2" ry="3" transform="rotate(45 22 14)"/>
                  <path d="M12 12c-4 0-7 3-7 6s2.5 4 7 4 7-1 7-4-3-6-7-6z"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-base text-brown-dark tracking-tight">
                Pet Shop<span className="text-primary">.</span>
              </span>
            </a>
            <p className="text-xs text-muted leading-relaxed max-w-sm">
              {t('footerAbout')}
            </p>
            {/* Social Icons */}
            <div className="flex gap-2.5 pt-2">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(s => (
                <a
                  key={s}
                  href={`#${s}`}
                  aria-label={s}
                  className="w-8 h-8 rounded-full bg-white border border-border-light flex items-center justify-center text-brown-dark hover:bg-primary hover:border-primary hover:text-white transition-all duration-180 shadow-sm"
                >
                  <span className="capitalize text-[10px] font-bold">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-brown-dark text-xs tracking-wider uppercase">{t('company')}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-primary transition-colors duration-180 text-muted">Trang chủ</a></li>
              <li><a href="/news" className="hover:text-primary transition-colors duration-180 text-muted">Tin tức</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors duration-180 text-muted">Dịch vụ</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors duration-180 text-muted">Liên hệ</a></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-brown-dark text-xs tracking-wider uppercase">{t('customerService')}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/contact" className="hover:text-primary transition-colors duration-180 text-muted">Liên hệ chúng tôi</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors duration-180 text-muted">Bảng giá Spa</a></li>
              <li><a href="/deals" className="hover:text-primary transition-colors duration-180 text-muted">Ưu đãi đặt trước</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors duration-180 text-muted">Trông giữ thú cưng</a></li>
            </ul>
          </div>

          {/* News / Subscribe Column */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-brown-dark text-xs tracking-wider uppercase">News</h4>
            {subscribed ? (
              <p className="text-xs text-accent font-semibold leading-relaxed">
                {t('subscribeSuccess')}
              </p>
            ) : (
              <>
                <p className="text-xs text-muted leading-relaxed">
                  {t('subscribeDesc')}
                </p>
                <form onSubmit={handleSubscribe} className="relative mt-2">
                  <input
                    type="email"
                    required
                    placeholder={t('subscribePlaceholder')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#eeeeee] rounded-pill pl-4 pr-10 py-2 text-xs outline-none focus:border-primary transition-colors duration-180 shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#111111] hover:bg-primary text-white rounded-pill flex items-center justify-center transition-colors duration-180 disabled:bg-muted"
                    aria-label="Subscribe"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </form>
              </>
            )}
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-[#eeeeee] mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-muted">
          <span>&copy; {new Date().getFullYear()} Pet Shop. All rights reserved.</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer


