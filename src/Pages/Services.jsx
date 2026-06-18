// Services Page — Pet's Home
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { bookAppointment, fetchBookedSlots } from '../utils/api'

const ServiceGallery = ({ images, title }) => {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div className="space-y-3 w-full max-w-md sm:max-w-lg mx-auto">
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-card overflow-hidden border border-[#eeeeee] shadow-mid bg-[#f7f7f7] select-none group">
        <img
          src={images[activeIdx]}
          alt={`${title} - ảnh ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-103"
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`w-12 h-9 sm:w-14 sm:h-10 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                activeIdx === idx ? 'border-primary scale-102 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const Services = () => {
  const { lang, t } = useLanguage()
  const [searchParams] = useSearchParams()
  const [selectedService, setSelectedService] = useState(null)
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', checkoutDate: '', timeSlot: '', notes: '' })
  const [booked, setBooked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [bookError, setBookError] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [priceListType, setPriceListType] = useState(null) // 'grooming' | 'home_service'

  const servicesList = [
    {
      id: 'grooming',
      title: t('serviceGroomingTitle'),
      price: 'Tùy Loại',
      unit: t('serviceGroomingUnit'),
      desc: t('serviceGroomingDesc'),
      bulletPoints: [
        t('serviceGroomingBullet1'),
        t('serviceGroomingBullet2'),
        t('serviceGroomingBullet3'),
        t('serviceGroomingBullet4'),
      ],
      images: [
        '/pet.jpg',
        '/pet1.jpg',
        '/pet2.jpg',
        '/pet3.jpg',
        '/pet4.jpg',
        '/pet5.jpg'
      ],
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6z"/>
          <path d="M4 10h16v4H4v-4z"/>
          <path d="M12 2v8"/>
          <circle cx="12" cy="5" r="1"/>
        </svg>
      ),
      color: 'bg-[#edf4fe]',
      iconColor: 'text-[#1a73e8]',
      borderColor: 'border-[#d0e1fd]',
    },
    {
      id: 'boarding',
      title: t('serviceBoardingTitle'),
      price: 250000,
      unit: t('serviceBoardingUnit'),
      desc: t('serviceBoardingDesc'),
      bulletPoints: [
        t('serviceBoardingBullet1'),
        t('serviceBoardingBullet2'),
        t('serviceBoardingBullet3'),
        t('serviceBoardingBullet4'),
      ],
      images: [
        '/Pethome.jpg',
        '/Pethome1.jpg',
        '/Pethome2.jpg',
        '/Pethome3.jpg',
        '/Pethome4.jpg',
        '/Pethome5.jpg'
      ],
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      color: 'bg-[#fff8eb]',
      iconColor: 'text-[#e67e22]',
      borderColor: 'border-[#ffe8cc]',
    },
    {
      id: 'home_service',
      title: t('serviceHomeTitle'),
      price: 'Tùy Loại',
      unit: t('serviceHomeUnit'),
      desc: t('serviceHomeDesc'),
      bulletPoints: [
        t('serviceHomeBullet1'),
        t('serviceHomeBullet2'),
        t('serviceHomeBullet3'),
        t('serviceHomeBullet4'),
      ],
      images: [
        '/Home_service.png',
        '/Home_service1.png',
        '/Home_service2.png',
      ],
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <path d="M9 22V12h6v10"/>
          <circle cx="12" cy="7" r="1.5"/>
        </svg>
      ),
      color: 'bg-[#edfcf2]',
      iconColor: 'text-[#4fa373]',
      borderColor: 'border-[#d2f3df]',
    }
  ]

  // Auto-fill from URL parameters
  useEffect(() => {
    const serviceType = searchParams.get('service')
    const date = searchParams.get('date') || searchParams.get('checkin')
    const checkoutDate = searchParams.get('checkout')
    if (serviceType) {
      const match = servicesList.find(s => s.id === serviceType)
      if (match) {
        setSelectedService(match)
        setFormData(prev => ({
          ...prev,
          date: date || '',
          checkoutDate: checkoutDate || ''
        }))
      }
    }
  }, [searchParams])

  const loadBookedSlots = async (date, serviceId) => {
    if (!date || (serviceId !== 'grooming' && serviceId !== 'home_service')) { setBookedSlots([]); return }
    setLoadingSlots(true)
    try {
      const slots = await fetchBookedSlots(date, serviceId)
      setBookedSlots(Array.isArray(slots) ? slots : Array.from(slots))
    } catch {
      setBookedSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  const getTimeSlots = (serviceId) => {
    if (serviceId === 'grooming' || serviceId === 'home_service') {
      return [
        '08:00 - 09:30 (90 phút)',
        '09:30 - 11:00 (90 phút)',
        '11:00 - 12:30 (90 phút)',
        '13:30 - 15:00 (90 phút)',
        '15:00 - 16:30 (90 phút)',
        '16:30 - 18:00 (90 phút)',
        '18:00 - 19:30 (90 phút)'
      ]
    }
    return []
  }

  const handleBookSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setBookError(null)
    try {
      await bookAppointment({
        serviceType: selectedService.id,
        customerName: formData.name,
        phone: formData.phone,
        date: formData.date,
        checkoutDate: formData.checkoutDate || null,
        timeSlot: formData.timeSlot || null,
        notes: formData.notes || null,
      })
      setBooked(true)
      setTimeout(() => {
        setBooked(false)
        setSelectedService(null)
        setFormData({ name: '', phone: '', date: '', checkoutDate: '', timeSlot: '', notes: '' })
      }, 2500)
    } catch {
      setBookError('Có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-site py-10">
      
      {/* Banner / Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
        <h2 className="font-heading font-bold text-brown-dark text-2xl sm:text-3xl tracking-tight">
          {t('premiumServices')}
        </h2>
        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed">
          {t('servicesDesc')}
        </p>
      </div>

      {/* Alternating List of Services */}
      <div className="space-y-12 mb-16">
        {servicesList.map((service, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={service.id}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 p-6 sm:p-8 rounded-card border ${service.borderColor} ${service.color} transition-all duration-280 hover:shadow-mid`}
            >
              {/* Left/Right Column: Image Gallery */}
              <div className="w-full lg:w-1/2 flex justify-center shrink-0">
                <ServiceGallery images={service.images} title={service.title} />
              </div>

              {/* Left/Right Column: Service Info */}
              <div className="w-full lg:w-1/2 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Badge & Title */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 ${service.iconColor} shadow-sm text-xl`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-extrabold text-brown-dark text-lg sm:text-xl leading-tight">
                        {service.title}
                      </h3>
                      <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                        Dịch vụ Pet Home Spa
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-brown-dark/95 leading-relaxed">
                    {service.desc}
                  </p>

                  {service.id === 'boarding' && (
                    <div className="inline-flex items-center self-start gap-2 rounded-pill bg-[#fff3e2] border border-[#ffe0b2] px-3.5 py-2 text-xs">
                      <span className="font-semibold text-brown-dark">Giá trông giữ:</span>
                      <span className="font-extrabold text-primary">250.000đ/ngày</span>
                    </div>
                  )}

                  {/* Bulleted Perks */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#555555]">
                    {service.bulletPoints.map((pt, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing and Booking CTA */}
                <div className="pt-5 border-t border-dashed border-brown-dark/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                  {/* Pricing info */}
                  <div>
                    <span className="block text-[10px] text-muted font-bold uppercase tracking-wider mb-0.5">
                      Chi phí dịch vụ
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      {service.id === 'grooming' || service.id === 'home_service' ? (
                        <button
                          onClick={() => setPriceListType(service.id)}
                          className="group select-none cursor-pointer outline-none focus:outline-none text-left"
                        >
                          <span className="font-extrabold text-primary text-xl sm:text-2xl group-hover:underline cursor-pointer">
                            {service.price}
                          </span>
                          <span className="block text-[10px] text-primary group-hover:underline cursor-pointer font-bold mt-0.5">
                            (Xem bảng giá chi tiết)
                          </span>
                        </button>
                      ) : (
                        <>
                          <span className="font-extrabold text-primary text-xl sm:text-2xl">
                            {typeof service.price === 'number' ? `${service.price.toLocaleString('vi-VN')}đ` : service.price}
                          </span>
                          <span className="text-xs text-muted font-normal">
                            / {t('per')} {service.unit}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="px-8 py-3 bg-primary hover:bg-secondary text-white text-xs font-bold rounded-pill shadow-red transition-all duration-180 hover:-translate-y-px text-center"
                  >
                    {t('bookAppointment')}
                  </button>
                </div>

              </div>
            </div>
          )
        })}
      </div>

      {/* Booking Form Modal Overlay */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-card p-6 w-full max-w-md relative shadow-high">
            
            {/* Close */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-muted hover:text-brown-dark"
              aria-label="Close booking modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {booked ? (
              /* Success alert animation state */
              <div className="py-8 text-center space-y-3">
                <span className="text-5xl text-accent">✓</span>
                <h3 className="font-heading font-bold text-brown-dark text-lg">
                  {t('bookingConfirmed')}
                </h3>
                <p className="text-xs text-muted">
                  {t('bookingSuccessDesc')}
                </p>
              </div>
            ) : (
              /* Core Form */
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-brown-dark text-lg leading-tight">
                    {t('bookService')}: {selectedService.title}
                  </h3>
                  {selectedService.id === 'boarding' && (
                    <p className="font-bold text-primary text-sm">250.000đ/ngày</p>
                  )}
                  <p className="text-[11px] text-muted">
                    {t('fillGroomingForm')}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label htmlFor="book-name" className="block text-[11px] font-semibold text-brown-dark">{t('yourName')}</label>
                    <input
                      id="book-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2 text-xs outline-none focus:border-primary focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="book-phone" className="block text-[11px] font-semibold text-brown-dark">{t('phoneNum')}</label>
                    <input
                      id="book-phone"
                      type="tel"
                      required
                      placeholder="e.g. 0901234567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2 text-xs outline-none focus:border-primary focus:bg-white"
                    />
                  </div>

                  {selectedService.id === 'boarding' ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label htmlFor="book-date" className="block text-[11px] font-semibold text-brown-dark">{t('checkInDate')}</label>
                          <input
                            id="book-date"
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                            className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2 text-xs outline-none focus:border-primary focus:bg-white text-brown-dark"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="book-checkout-date" className="block text-[11px] font-semibold text-brown-dark">{t('checkOutDate')}</label>
                          <input
                            id="book-checkout-date"
                            type="date"
                            required
                            min={formData.date || new Date().toISOString().split('T')[0]}
                            value={formData.checkoutDate}
                            onChange={e => setFormData({ ...formData, checkoutDate: e.target.value })}
                            className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2 text-xs outline-none focus:border-primary focus:bg-white text-brown-dark"
                          />
                        </div>
                      </div>

                      {(() => {
                        if (formData.date && formData.checkoutDate) {
                          const d1 = new Date(formData.date)
                          const d2 = new Date(formData.checkoutDate)
                          const diff = d2 - d1
                          const days = Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)) + 1)
                          
                          let pct = 0
                          if (days >= 15) pct = 15
                          else if (days >= 8) pct = 10
                          else if (days >= 4) pct = 5
                          
                          const original = days * 250000
                          const savings = original * (pct / 100)
                          const finalPrice = original - savings
                          
                          return (
                            <div className="bg-[#fff8eb] p-3.5 rounded-card border border-[#ffe8cc] text-xs text-[#555555] space-y-2 mt-2">
                              <div className="flex justify-between font-semibold">
                                <span>{t('totalStay')}</span>
                                <span className="text-brown-dark">{days} ngày</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Đơn giá gốc:</span>
                                <span>250.000đ/ngày</span>
                              </div>
                              {pct > 0 ? (
                                <>
                                  <div className="flex justify-between text-accent font-semibold">
                                    <span>Ưu đãi áp dụng:</span>
                                    <span>-{pct}%</span>
                                  </div>
                                  <div className="flex justify-between text-green-600">
                                    <span>Số tiền được giảm:</span>
                                    <span>-{savings.toLocaleString('vi-VN')}đ</span>
                                  </div>
                                  <div className="flex justify-between font-bold text-sm border-t border-dashed border-[#ffe8cc] pt-2">
                                    <span>{t('estimatedCost')}</span>
                                    <div className="text-right">
                                      <span className="text-[10px] text-muted line-through mr-1.5">{original.toLocaleString('vi-VN')}đ</span>
                                      <span className="text-primary">{finalPrice.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="flex justify-between font-bold text-sm border-t border-dashed border-[#ffe8cc] pt-2">
                                  <span>{t('estimatedCost')}</span>
                                  <span className="text-primary">{original.toLocaleString('vi-VN')}đ</span>
                                </div>
                              )}
                            </div>
                          )
                        }
                        return null
                      })()}
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label htmlFor="book-date" className="block text-[11px] font-semibold text-brown-dark">{t('preferredDate')}</label>
                          <input
                            id="book-date"
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={e => {
                              const newDate = e.target.value
                              setFormData({ ...formData, date: newDate, timeSlot: '' })
                              loadBookedSlots(newDate, selectedService.id)
                            }}
                            className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2 text-xs outline-none focus:border-primary focus:bg-white text-brown-dark"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="book-time" className="block text-[11px] font-semibold text-brown-dark">
                            {t('timeSlot')}
                            {loadingSlots && <span className="ml-2 text-muted font-normal">(đang tải...)</span>}
                          </label>
                          <select
                            id="book-time"
                            required
                            value={formData.timeSlot}
                            onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                            className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2 text-xs outline-none focus:border-primary focus:bg-white text-brown-dark"
                            disabled={loadingSlots}
                          >
                            <option value="">{t('selectTimeSlot')}</option>
                            {getTimeSlots(selectedService.id).map(slot => {
                              const isBooked = bookedSlots.includes(slot)
                              return (
                                <option key={slot} value={slot} disabled={isBooked}>
                                  {isBooked ? `🔒 ${slot} — Đã đặt` : slot}
                                </option>
                              )
                            })}
                          </select>
                          {bookedSlots.length > 0 && (
                            <p className="text-[10px] text-muted mt-1">🔒 Các khung giờ có ký hiệu đã được đặt, vui lòng chọn khung giờ khác.</p>
                          )}
                        </div>
                      </div>
                      {formData.date && (() => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const selected = new Date(formData.date)
                        selected.setHours(0, 0, 0, 0)
                        const diffTime = selected - today
                        const diffDays = diffTime / (1000 * 60 * 60 * 24)
                        const isValid = diffDays >= 1
                        
                        return (
                          <div className={`p-3 rounded-card border text-xs leading-relaxed space-y-1.5 mt-2.5 ${
                            isValid 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            <div className="flex items-center gap-1.5 font-bold text-xs">
                              <span>{isValid ? '🎉 Ưu Đãi Đặt Trước Hợp Lệ!' : '💡 Ưu Đãi Đặt Lịch Trước'}</span>
                            </div>
                            <p className="text-[11px] text-text-light">
                              {isValid 
                                ? `Bạn được giảm ngay 10% trên tổng hóa đơn dịch vụ ${selectedService.title}!` 
                                : `Đặt lịch hẹn trước ít nhất 24 giờ (từ ngày mai trở đi) để nhận ưu đãi giảm giá 10% trên tổng hóa đơn.`}
                            </p>
                            {isValid && selectedService.id === 'home_service' && (
                              <div className="font-semibold text-xs border-t border-dashed border-green-200 pt-1.5 flex justify-between items-center">
                                <span>Giá tạm tính dịch vụ tại nhà:</span>
                                <div className="text-right">
                                  <span className="line-through text-[10px] text-muted mr-1.5">200.000đ</span>
                                  <span className="text-accent text-sm font-bold">180.000đ</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })()}
                    </>
                  )}

                  <div className="space-y-1">
                    <label htmlFor="book-notes" className="block text-[11px] font-semibold text-brown-dark">{t('extraNotes')}</label>
                    <textarea
                      id="book-notes"
                      rows="3"
                      placeholder="e.g. Husky puppy, 3 months old, very energetic..."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-[#eeeeee] rounded-card px-4 py-2.5 text-xs outline-none focus:border-primary focus:bg-white resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 py-2 rounded-pill border border-border-light text-xs font-semibold text-brown-dark hover:bg-bg-light transition-colors"
                  >
                    {t('cancel')}
                  </button>
                  {bookError && (
                    <p className="text-xs text-red-500 text-center w-full">{bookError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2 rounded-pill bg-primary hover:bg-secondary text-white text-xs font-semibold shadow-red transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Đang gửi...' : t('confirmBooking')}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Lightbox / Modal for Price Lists */}
      {priceListType && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setPriceListType(null)}
        >
          <div 
            className="relative bg-white rounded-card p-6 max-w-2xl w-full shadow-high overflow-hidden animate-fade-in-up"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => setPriceListType(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {priceListType === 'grooming' ? (
              /* Original Grooming Price Image (GiaVS.png) */
              <div className="w-full max-h-[80vh] overflow-y-auto rounded-card">
                <img 
                  src="/GiaVS.png" 
                  alt="Bảng giá dịch vụ vệ sinh tại cửa hàng" 
                  className="w-full h-auto object-contain block"
                />
              </div>
            ) : (
              /* At-home Service Detail HTML Table */
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border-light pb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg">
                    📋
                  </div>
                  <h3 className="font-heading font-bold text-brown-dark text-lg">
                    Chi Tiết Bảng Giá Dịch Vụ Tại Nhà
                  </h3>
                </div>
                
                <div className="overflow-x-auto rounded-card border border-[#cccccc] shadow-sm">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-bg-light border-b border-[#cccccc]">
                        <th className="px-4 py-3 text-left font-bold text-brown-dark border-r border-[#cccccc] w-1/3">
                          Tiêu Chí
                        </th>
                        <th className="px-4 py-3 text-left font-bold text-brown-dark">
                          Chi Tiết Dịch Vụ Pet Service
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#cccccc]">
                      <tr className="hover:bg-bg-light/30 transition-colors">
                        <td className="px-4 py-3 font-semibold text-brown-dark border-r border-[#cccccc]">
                          Khu vực phục vụ
                        </td>
                        <td className="px-4 py-3 text-text-light leading-relaxed">
                          Toàn TP.HCM (Q1, Q3, Q7, Bình Thạnh, Thủ Đức...)
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-light/30 transition-colors">
                        <td className="px-4 py-3 font-semibold text-[#362116] border-r border-[#cccccc]">
                          Dịch vụ chính
                        </td>
                        <td className="px-4 py-3 text-text-light leading-relaxed">
                          Tắm vệ sinh, Cắt tỉa tạo kiểu, Vệ sinh tai/móng, Tiêm vaccine
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-light/30 transition-colors">
                        <td className="px-4 py-3 font-semibold text-brown-dark border-r border-[#cccccc]">
                          Giá tham khảo
                        </td>
                        <td className="px-4 py-3 text-text-light leading-relaxed">
                          Từ <span className="font-bold text-primary">200.000 VNĐ</span> (Tùy cân nặng & dịch vụ)
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-light/30 transition-colors">
                        <td className="px-4 py-3 font-semibold text-brown-dark border-r border-[#cccccc]">
                          Hotline đặt lịch
                        </td>
                        <td className="px-4 py-3">
                          <a 
                            href="tel:0898520760" 
                            className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1.5"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            0898 520 760
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Services

