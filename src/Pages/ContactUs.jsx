// ContactUs Page — Pet's Home
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { submitContact } from '../utils/api'

const ContactUs = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Tư vấn', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const contactInfo = [
    {
      id: 'phone',
      title: t('phoneTitle'),
      value: '+1 567 890',
      subvalue: 'Toll-free: 1800.xxxx',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      )
    },
    {
      id: 'email',
      title: t('emailTitle'),
      value: 'contact@petshop.com',
      subvalue: 'support@petshop.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
    {
      id: 'location',
      title: t('locationTitle'),
      value: '123 Fake Street',
      subvalue: 'California, USA',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      )
    },
    {
      id: 'hours',
      title: t('hoursTitle'),
      value: t('hoursValue'),
      subvalue: t('hoursSub'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')
    try {
      await submitContact(formData)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', subject: 'Tư vấn', message: '' })
      }, 2500)
    } catch (err) {
      setErrorMsg(err.message || 'Có lỗi xảy ra khi gửi lời nhắn. Vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-site py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
        <h2 className="font-heading font-bold text-brown-dark text-2xl sm:text-3xl tracking-tight">
          {t('contactUs')}
        </h2>
        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed">
          {t('contactDesc')}
        </p>
      </div>

      {/* Grid: Left info cards, Right message form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Info Cards Column */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactInfo.map(info => (
            <div
              key={info.id}
              className="bg-[#f8f9fa] border border-[#eeeeee] p-5 rounded-card flex flex-col items-center text-center space-y-3 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-[#fff5eb] border border-[#ffe0cc] text-primary flex items-center justify-center">
                {info.icon}
              </div>
              <div className="space-y-0.5">
                <span className="block font-heading font-bold text-xs text-brown-dark">
                  {info.title}
                </span>
                <span className="block text-xs font-semibold text-[#555555]">
                  {info.value}
                </span>
                <span className="block text-[10px] text-muted font-normal">
                  {info.subvalue}
                </span>
              </div>
            </div>
          ))}
          
          {/* Decorative Map Placeholder */}
          <div className="sm:col-span-2 h-48 rounded-card border border-border-light overflow-hidden bg-[#e8eef5] relative flex items-center justify-center group shadow-sm">
            {/* Styled aesthetic grid representing map */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute w-8 h-8 bg-primary rounded-full animate-ping opacity-25 z-0" />
            <div className="relative z-10 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-md flex items-center justify-center" />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-[9px] font-bold px-2 py-0.5 rounded-pill shadow-sm">
              {t('mapPlaceholder')}
            </span>
          </div>
        </div>

        {/* Message Form Column */}
        <div className="lg:col-span-7 bg-white border border-[#eeeeee] p-6 sm:p-8 rounded-card shadow-sm">
          {submitted ? (
            /* Success confirmation card */
            <div className="py-16 text-center space-y-3">
              <span className="text-5xl text-accent">✓</span>
              <h3 className="font-heading font-bold text-brown-dark text-lg">
                {t('msgSentSuccess')}
              </h3>
              <p className="text-xs text-muted max-w-sm mx-auto text-center">
                {t('msgSentDesc')}
              </p>
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-heading font-bold text-brown-dark text-lg leading-tight mb-2">
                {t('sendMessage')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="block text-[11px] font-semibold text-brown-dark">{t('yourName')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2.5 text-xs outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="block text-[11px] font-semibold text-brown-dark">{t('emailTitle')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2.5 text-xs outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-subj" className="block text-[11px] font-semibold text-brown-dark">{t('subject')}</label>
                <select
                  id="contact-subj"
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2.5 text-xs text-brown-dark outline-none focus:border-primary focus:bg-white"
                >
                  <option value="Tư vấn">Tư vấn (Consultation)</option>
                  <option value="Hợp tác">Hợp tác (Cooperation)</option>
                  <option value="Khác">Khác (Other)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-msg" className="block text-[11px] font-semibold text-brown-dark">{t('messageDetails')}</label>
                <textarea
                  id="contact-msg"
                  required
                  rows="5"
                  placeholder={t('messageDetailsPlaceholder')}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-card px-4 py-3 text-xs outline-none focus:border-primary focus:bg-white resize-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-500 text-center">{errorMsg}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-[#111111] hover:bg-primary text-white text-xs font-semibold rounded-pill transition-colors shadow-md hover:shadow-red disabled:opacity-60"
                >
                  {submitting ? 'Đang gửi...' : t('sendMsgBtn')}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

    </div>
  )
}

export default ContactUs


