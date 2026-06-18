import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Deals = () => {
  const { lang, t } = useLanguage()
  
  // Boarding Calculator state
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [days, setDays] = useState(0)
  const [discountPercent, setDiscountPercent] = useState(0)
  const [pricePerDay, setPricePerDay] = useState(250000)
  const [originalTotal, setOriginalTotal] = useState(0)
  const [discountedTotal, setDiscountedTotal] = useState(0)
  const [savings, setSavings] = useState(0)

  // Grooming interactive preview state
  const [groomingDate, setGroomingDate] = useState('')
  const [groomingPrebookValid, setGroomingPrebookValid] = useState(false)

  // Home service interactive preview state
  const [homeServiceDate, setHomeServiceDate] = useState('')
  const [homeServicePrebookValid, setHomeServicePrebookValid] = useState(false)

  // Calculate boarding discount
  useEffect(() => {
    if (checkin && checkout) {
      const d1 = new Date(checkin)
      const d2 = new Date(checkout)
      
      if (d2 >= d1) {
        const diffTime = Math.abs(d2 - d1)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        setDays(diffDays)
        
        let pct = 0
        if (diffDays >= 15) {
          pct = 15
        } else if (diffDays >= 8) {
          pct = 10
        } else if (diffDays >= 4) {
          pct = 5
        }
        
        setDiscountPercent(pct)
        
        const orig = diffDays * 250000
        const discPrice = 250000 * (1 - pct / 100)
        const finalCost = diffDays * discPrice
        
        setOriginalTotal(orig)
        setDiscountedTotal(finalCost)
        setSavings(orig - finalCost)
      } else {
        setDays(0)
        setDiscountPercent(0)
        setOriginalTotal(0)
        setDiscountedTotal(0)
        setSavings(0)
      }
    } else {
      setDays(0)
      setDiscountPercent(0)
      setOriginalTotal(0)
      setDiscountedTotal(0)
      setSavings(0)
    }
  }, [checkin, checkout])

  // Validate grooming prebook (must be at least 1 day in the future)
  useEffect(() => {
    if (groomingDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selected = new Date(groomingDate)
      selected.setHours(0, 0, 0, 0)
      
      const diffTime = selected - today
      const diffDays = diffTime / (1000 * 60 * 60 * 24)
      
      if (diffDays >= 1) {
        setGroomingPrebookValid(true)
      } else {
        setGroomingPrebookValid(false)
      }
    } else {
      setGroomingPrebookValid(false)
    }
  }, [groomingDate])

  // Validate home service prebook (must be at least 1 day in the future)
  useEffect(() => {
    if (homeServiceDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selected = new Date(homeServiceDate)
      selected.setHours(0, 0, 0, 0)
      
      const diffTime = selected - today
      const diffDays = diffTime / (1000 * 60 * 60 * 24)
      
      if (diffDays >= 1) {
        setHomeServicePrebookValid(true)
      } else {
        setHomeServicePrebookValid(false)
      }
    } else {
      setHomeServicePrebookValid(false)
    }
  }, [homeServiceDate])

  const formatVND = (num) => {
    return num.toLocaleString('vi-VN') + 'đ'
  }

  const todayStr = new Date().toISOString().split('T')[0]

  const groomingImages = ['/pet.jpg', '/pet1.jpg', '/pet2.jpg', '/pet3.jpg', '/pet4.jpg', '/pet5.jpg']
  const boardingImages = ['/Pethome.jpg', '/Pethome1.jpg', '/Pethome2.jpg', '/Pethome3.jpg', '/Pethome4.jpg', '/Pethome5.jpg']
  const homeImages = ['/Home_service.png', '/pet.jpg', '/pet1.jpg', '/pet2.jpg', '/pet3.jpg', '/pet4.jpg']

  const PhotoGrid = ({ images }) => (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="aspect-square rounded-card overflow-hidden border border-[#eeeeee] shadow-low bg-[#f7f7f7] group relative"
        >
          <img
            src={img}
            alt={`pet illustration ${idx + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div>
      {/* Header Banner */}
      <section className="py-16 bg-primary from-[#ffa94d] via-primary to-[#ff6b6b] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full filter blur-2xl pointer-events-none" />
        <div className="container-site max-w-6xl mx-auto text-center relative z-10 space-y-4">
          <span className="inline-block bg-white/20 border border-white/30 backdrop-blur-md text-white text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
            {lang === 'vi' ? 'Chính Sách Ưu Đãi' : 'Offers & Promotions'}
          </span>
          <h1 className="font-heading font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight drop-shadow-sm">
            {lang === 'vi' ? 'Ưu Đãi Dịch Vụ Thú Cưng' : 'Pet Service Offers'}
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            {lang === 'vi'
              ? 'Tận hưởng các ưu đãi hấp dẫn khi đặt lịch chăm sóc trước hoặc gửi lưu trú lâu ngày tại Pet Home Spa.'
              : 'Enjoy hot discounts when booking grooming in advance or boarding your pets long-term.'}
          </p>
          
        </div>
      </section>

      {/* Deal 1: Grooming Pre-book — Images RIGHT */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-brown-dark">
            <circle cx="50" cy="55" r="20" />
            <circle cx="25" cy="30" r="10" />
            <circle cx="41" cy="18" r="10" />
            <circle cx="59" cy="18" r="10" />
            <circle cx="75" cy="30" r="10" />
          </svg>
        </div>

        <div className="container-site max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: Deal Info */}
            <div className="space-y-6 md:pl-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  ĐẶT LỊCH TRƯỚC — GIẢM 10%
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-brown-dark text-3xl sm:text-4xl leading-tight">
                Ưu Đãi Tắm Rửa <br />
                <span className="italic text-primary drop-shadow-[1px_1px_0px_rgba(0,0,0,0.15)] relative inline-block">
                  & Vệ Sinh
                </span>
              </h2>

              <div className="bg-gradient-to-r from-[#edf4fe] to-[#f7faff] border-l-4 border-[#1a73e8] p-4 rounded-2xl text-xs sm:text-sm text-brown-dark leading-relaxed space-y-1">
                <p className="font-extrabold text-[#1a73e8] flex items-center gap-1">
                  <span>✨</span> Giảm ngay 10% trên tổng hóa đơn
                </p>
                <p className="text-[#555555]">
                  Chỉ cần đặt lịch trước ít nhất <strong className="text-brown-dark">24 giờ (1 ngày)</strong> để nhận ưu đãi.
                </p>
              </div>

              {/* Tick list */}
              <ul className="space-y-3 pt-2">
                {[
                  'Tắm Sấy Khô Ráo',
                  'Cắt Móng & Dũa Móng',
                  'Vệ Sinh Tai & Tuyến Hôi',
                  'Chải Lông Khử Mùi'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="font-heading font-semibold text-brown-dark text-sm sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Interactive date picker */}
              <div className="space-y-3 pt-2">
                <label htmlFor="prebook-date" className="block text-[11px] font-bold text-brown-dark uppercase tracking-wider">
                  Nhập ngày thử để kiểm tra ưu đãi:
                </label>
                <div className="flex gap-3 max-w-md">
                  <input
                    id="prebook-date"
                    type="date"
                    min={todayStr}
                    value={groomingDate}
                    onChange={e => setGroomingDate(e.target.value)}
                    className="bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2.5 text-xs outline-none focus:border-primary focus:bg-white text-brown-dark flex-1 shadow-sm transition-colors"
                  />
                  {groomingDate && (
                    <Link
                      to={`/services?service=grooming&date=${groomingDate}`}
                      className="px-6 py-2.5 bg-primary hover:bg-secondary text-white text-xs font-bold rounded-pill flex items-center justify-center transition-all duration-180 hover:-translate-y-px shadow-red shrink-0"
                    >
                      Đặt lịch ngay
                    </Link>
                  )}
                </div>

                {groomingDate && (
                  <div className={`text-xs font-semibold p-3.5 rounded-2xl flex items-start gap-2.5 border transition-all duration-300 animate-fade-in ${
                    groomingPrebookValid
                      ? 'bg-green-50 text-green-700 border-green-200 shadow-sm'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    <span className="text-sm mt-0.5">{groomingPrebookValid ? '🎉' : '⚠️'}</span>
                    <div className="space-y-0.5">
                      <p className="font-bold">{groomingPrebookValid ? 'Ưu đãi hợp lệ!' : 'Lưu ý đặt lịch trước'}</p>
                      <p className="font-normal opacity-90">
                        {groomingPrebookValid
                          ? 'Bạn đủ điều kiện nhận ưu đãi giảm giá 10% khi hoàn thành đặt lịch này.'
                          : 'Ngày đặt lịch phải từ ngày mai trở đi để nhận ưu đãi đặt trước 24h.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/services?service=grooming"
                  className="px-6 py-2.5 border border-primary hover:bg-primary/5 text-primary text-xs font-bold rounded-pill transition-colors tracking-wider uppercase"
                >
                  Xem thêm
                </Link>
                <Link
                  to="/services?service=grooming"
                  className="px-6 py-2.5 bg-primary hover:bg-secondary text-white text-xs font-bold rounded-pill transition-all duration-180 hover:-translate-y-px shadow-red hover:shadow-red-dark tracking-wider uppercase"
                >
                  Đặt lịch ngay
                </Link>
              </div>
            </div>

            {/* Right: 3x2 Grid */}
            <div className="w-full flex justify-center shrink-0">
              <PhotoGrid images={groomingImages} />
            </div>
          </div>
        </div>
      </section>

      {/* Deal 2: Boarding Long Stay — Images LEFT */}
      <section className="py-16 bg-[#faf9f8] border-t border-b border-border-light relative overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-brown-dark">
            <path d="M10 20h80v10H10zM15 30v40h5V30zm15 0v40h5V30zm15 0v40h5V30zm15 0v40h5V30zm15 0v40h5V30zm15 0v40h5V30z" />
          </svg>
        </div>

        <div className="container-site max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Info Details (Right on Desktop) */}
            <div className="space-y-6 md:pl-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-500">
                  LƯU TRÚ LÂU DÀI — GIẢM ĐẾN 15%
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-brown-dark text-3xl sm:text-4xl leading-tight">
                Ưu Đãi Trông Giữ <br />
                <span className="italic text-orange-500 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.15)] relative inline-block">
                  Thú Cưng
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Gửi trông giữ càng lâu — Chiết khấu càng sâu. Chính sách chiết khấu lũy tiến:
              </p>

              {/* Discount Tiers */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { range: '1 - 3 ngày', discount: 'Giá gốc (250K/ngày)', active: days > 0 && days <= 3, highlight: 'Không giảm' },
                  { range: '4 - 7 ngày', discount: 'Giảm 5% (237.5K/ngày)', active: days >= 4 && days <= 7, highlight: 'Giảm 5%' },
                  { range: '8 - 14 ngày', discount: 'Giảm 10% (225K/ngày)', active: days >= 8 && days <= 14, highlight: 'Giảm 10%' },
                  { range: 'Trên 14 ngày', discount: 'Giảm 15% (212.5K/ngày)', active: days >= 15, highlight: 'Giảm 15%' },
                ].map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border transition-all duration-300 ${
                      tier.active
                        ? 'border-orange-400 bg-gradient-to-br from-[#fff8eb] to-[#fffdfa] font-bold text-brown-dark shadow-md ring-2 ring-orange-400/15'
                        : 'bg-white border-[#eeeeee] hover:border-orange-300 text-[#555555] hover:shadow-sm'
                    }`}
                  >
                    <div className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1">Lưu trú</div>
                    <div className="font-heading font-extrabold text-sm text-brown-dark">{tier.range}</div>
                    <div className="border-t border-dashed border-brown-dark/10 pt-1.5 mt-1.5">
                      <span className="text-orange-500 font-extrabold text-[11px]">{tier.highlight}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculator */}
              <div className="bg-gradient-to-br from-[#fff8eb] to-white border border-[#ffe3cb] p-5 rounded-2xl space-y-4">
                <h4 className="font-heading font-extrabold text-brown-dark text-sm flex items-center gap-1.5">
                  <span>🧮</span> Bộ Tính Toán Lưu Trú
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="calc-checkin" className="block text-[10px] font-bold text-brown-dark uppercase tracking-wider">Check-in</label>
                    <input
                      id="calc-checkin"
                      type="date"
                      min={todayStr}
                      value={checkin}
                      onChange={e => setCheckin(e.target.value)}
                      className="w-full bg-white border border-[#ffe0cc] rounded-pill px-3 py-2 text-xs outline-none focus:border-primary text-brown-dark shadow-sm transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="calc-checkout" className="block text-[10px] font-bold text-brown-dark uppercase tracking-wider">Check-out</label>
                    <input
                      id="calc-checkout"
                      type="date"
                      min={checkin || todayStr}
                      value={checkout}
                      onChange={e => setCheckout(e.target.value)}
                      className="w-full bg-white border border-[#ffe0cc] rounded-pill px-3 py-2 text-xs outline-none focus:border-primary text-brown-dark shadow-sm transition-colors"
                    />
                  </div>
                </div>

                {days > 0 ? (
                  <div className="space-y-3 pt-3 border-t border-dashed border-[#ffe8cc] animate-fade-in">
                    <div className="space-y-2 text-xs text-brown-dark">
                      <div className="flex justify-between">
                        <span className="text-[#666666]">Tổng thời gian:</span>
                        <span className="font-extrabold">{days} ngày</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666666]">Chiết khấu:</span>
                        <span className="font-extrabold text-accent">-{discountPercent}%</span>
                      </div>
                      {discountPercent > 0 && (
                        <div className="flex justify-between text-green-600 font-bold">
                          <span>Tiết kiệm:</span>
                          <span>-{formatVND(savings)}</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-[#ffe8cc] flex justify-between items-center">
                      <span className="text-xs font-bold text-brown-dark">Dự kiến:</span>
                      <div className="text-right">
                        {discountPercent > 0 && (
                          <span className="text-[10px] text-muted line-through block">{formatVND(originalTotal)}</span>
                        )}
                        <span className="text-lg font-extrabold text-primary">{formatVND(discountedTotal)}</span>
                      </div>
                    </div>
                    <Link
                      to={`/services?service=boarding&checkin=${checkin}&checkout=${checkout}`}
                      className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-pill flex items-center justify-center transition-all duration-180 hover:-translate-y-px shadow-lg uppercase tracking-wider"
                    >
                      Đặt Lịch Ngay
                    </Link>
                  </div>
                ) : (
                  <div className="bg-[#faf9f8] p-4 rounded-xl border border-border-light text-center text-[11px] text-muted leading-relaxed">
                    <span className="text-xl animate-pulse block mb-1">👉</span>
                    Chọn ngày Check-in & Check-out để tính chi phí
                  </div>
                )}
              </div>

              {/* Price Row */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs sm:text-sm font-bold text-brown-dark">Từ</span>
                <span className="w-10 h-[2px] bg-orange-300" />
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-500 tracking-tight">
                  250.000đ/ngày
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/services?service=boarding"
                  className="px-6 py-2.5 border border-orange-500 hover:bg-orange-50 text-orange-500 text-xs font-bold rounded-pill transition-colors tracking-wider uppercase"
                >
                  Xem thêm
                </Link>
                <Link
                  to="/services?service=boarding"
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-pill transition-all duration-180 hover:-translate-y-px shadow-orange-500/30 tracking-wider uppercase"
                >
                  Đặt lịch ngay
                </Link>
              </div>
            </div>

            {/* Left: 3x2 Grid (Image on left for Desktop) */}
            <div className="w-full flex justify-center shrink-0 lg:order-first">
              <PhotoGrid images={boardingImages} />
            </div>
          </div>
        </div>
      </section>

      {/* Deal 3: Home Service Pre-book — Images RIGHT */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-32 h-32 opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-brown-dark">
            <circle cx="50" cy="55" r="20" />
            <circle cx="25" cy="30" r="10" />
            <circle cx="41" cy="18" r="10" />
            <circle cx="59" cy="18" r="10" />
            <circle cx="75" cy="30" r="10" />
          </svg>
        </div>

        <div className="container-site max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: Deal Info */}
            <div className="space-y-6 md:pl-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#4fa373]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4fa373]">
                  ĐẶT LỊCH TRƯỚC — GIẢM 10%
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-brown-dark text-3xl sm:text-4xl leading-tight">
                Ưu Đãi Dịch Vụ <br />
                <span className="italic text-[#4fa373] drop-shadow-[1px_1px_0px_rgba(0,0,0,0.15)] relative inline-block">
                  Tại Nhà
                </span>
              </h2>

              <div className="bg-gradient-to-r from-[#edfcf2] to-[#f5fdf8] border-l-4 border-[#4fa373] p-4 rounded-2xl text-xs sm:text-sm text-brown-dark leading-relaxed space-y-1">
                <p className="font-extrabold text-[#4fa373] flex items-center gap-1">
                  <span>✨</span> Giảm ngay 10% trên tổng hóa đơn
                </p>
                <p className="text-[#555555]">
                  Đặt lịch chăm sóc tại nhà trước ít nhất <strong className="text-brown-dark">24 giờ (1 ngày)</strong> để nhận chiết khấu 10%.
                </p>
              </div>

              {/* Tick list */}
              <ul className="space-y-3 pt-2">
                {[
                  'Tắm Vệ Sinh Tại Nhà',
                  'Tỉa Lông Tạo Kiểu',
                  'Cạo Lông Vệ Sinh'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-[#4fa373] shrink-0 shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="font-heading font-semibold text-brown-dark text-sm sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Interactive date picker */}
              <div className="space-y-3 pt-2">
                <label htmlFor="home-prebook-date" className="block text-[11px] font-bold text-brown-dark uppercase tracking-wider">
                  Nhập ngày thử để kiểm tra ưu đãi:
                </label>
                <div className="flex gap-3 max-w-md">
                  <input
                    id="home-prebook-date"
                    type="date"
                    min={todayStr}
                    value={homeServiceDate}
                    onChange={e => setHomeServiceDate(e.target.value)}
                    className="bg-[#f8f9fa] border border-[#eeeeee] rounded-pill px-4 py-2.5 text-xs outline-none focus:border-[#4fa373] focus:bg-white text-brown-dark flex-1 shadow-sm transition-colors"
                  />
                  {homeServiceDate && (
                    <Link
                      to={`/services?service=home_service&date=${homeServiceDate}`}
                      className="px-6 py-2.5 bg-[#4fa373] hover:bg-[#3d8a5f] text-white text-xs font-bold rounded-pill flex items-center justify-center transition-all duration-180 hover:-translate-y-px shadow-sm shrink-0"
                    >
                      Đặt lịch ngay
                    </Link>
                  )}
                </div>

                {homeServiceDate && (
                  <div className={`text-xs font-semibold p-3.5 rounded-2xl flex items-start gap-2.5 border transition-all duration-300 animate-fade-in ${
                    homeServicePrebookValid
                      ? 'bg-green-50 text-green-700 border-green-200 shadow-sm'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    <span className="text-sm mt-0.5">{homeServicePrebookValid ? '🎉' : '⚠️'}</span>
                    <div className="space-y-0.5">
                      <p className="font-bold">{homeServicePrebookValid ? 'Ưu đãi hợp lệ!' : 'Lưu ý đặt lịch trước'}</p>
                      <p className="font-normal opacity-90">
                        {homeServicePrebookValid
                          ? 'Bạn đủ điều kiện nhận ưu đãi giảm giá 10% khi hoàn thành đặt lịch chăm sóc tại nhà này.'
                          : 'Ngày đặt lịch phải từ ngày mai trở đi để nhận ưu đãi đặt trước 24h.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/services?service=home_service"
                  className="px-6 py-2.5 border border-[#4fa373] hover:bg-green-50 text-[#4fa373] text-xs font-bold rounded-pill transition-colors tracking-wider uppercase"
                >
                  Xem thêm
                </Link>
                <Link
                  to="/services?service=home_service"
                  className="px-6 py-2.5 bg-[#4fa373] hover:bg-[#3d8a5f] text-white text-xs font-bold rounded-pill transition-all duration-180 hover:-translate-y-px shadow-sm tracking-wider uppercase"
                >
                  Đặt lịch ngay
                </Link>
              </div>
            </div>

            {/* Right: 3x2 Grid */}
            <div className="w-full flex justify-center shrink-0">
              <PhotoGrid images={homeImages} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Deals
