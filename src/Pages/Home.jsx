import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import { fetchNews } from '../utils/api'
import { useLanguage } from '../context/LanguageContext'

const PhotoGrid = ({ images }) => {
  return (
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
}

const ServiceSection = () => {
  const groomingImages = ['/pet.jpg', '/pet1.jpg', '/pet2.jpg', '/pet3.jpg', '/pet4.jpg', '/pet5.jpg']
  const boardingImages = ['/Pethome.jpg', '/Pethome1.jpg', '/Pethome2.jpg', '/Pethome3.jpg', '/Pethome4.jpg', '/Pethome5.jpg']
  const homeImages = ['/Home_service.png', '/pet.jpg', '/pet1.jpg', '/pet2.jpg', '/pet3.jpg', '/pet4.jpg']

  return (
    <>
      {/* Service 1: Tắm rửa & Vệ sinh */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Paw watermark top-left */}
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
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto space-y-3 mb-16">
            <span className="text-primary text-[11px] font-bold uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-pill">
              Dịch vụ cốt lõi
            </span>
            <h2 className="font-heading font-bold text-brown-dark text-2xl sm:text-3xl tracking-tight">
              Chúng tôi chăm sóc thú cưng của bạn ra sao?
            </h2>
            <p className="text-[#555555] text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Môi trường an toàn, chuyên nghiệp và đầy ắp yêu thương dành cho bé yêu của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: Info Details */}
            <div className="space-y-6 md:pl-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  TIÊU CHUẨN 5 SAO
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-brown-dark text-3xl sm:text-4xl leading-tight">
                Dịch Vụ Tắm Rửa <br />
                <span className="italic text-primary drop-shadow-[1px_1px_0px_rgba(0,0,0,0.15)] relative inline-block">
                  & Vệ Sinh
                </span>
              </h2>

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

              {/* Price Row */}
              <div className="flex items-center gap-3 pt-4">
                <span className="text-xs sm:text-sm font-bold text-[#555555]">Từ</span>
                <span className="w-10 h-[2px] bg-primary/30" />
                <span className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                  150.000đ
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
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

      {/* Service 2: Trông giữ Thú cưng */}
      <section className="py-16 bg-[#faf9f8] border-t border-b border-border-light relative overflow-hidden">
        {/* Fence watermark top-right */}
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
                  DỊCH VỤ LƯU TRÚ
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-brown-dark text-3xl sm:text-4xl leading-tight">
                Dịch Vụ Trông Giữ <br />
                <span className="italic text-orange-500 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.15)] relative inline-block">
                  Thú Cưng
                </span>
              </h2>

              {/* Tick list */}
              <ul className="space-y-3 pt-2">
                {[
                  'Phòng Riêng Điều Hòa',
                  'Chế Độ Ăn Dinh Dưỡng',
                  'Vui Chơi Hàng Ngày',
                  'Giám Sát 24/7'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
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

              {/* Price Row */}
              <div className="flex items-center gap-3 pt-4">
                <span className="text-xs sm:text-sm font-bold text-brown-dark">Từ</span>
                <span className="w-10 h-[2px] bg-orange-300" />
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-500 tracking-tight">
                  250.000đ/ngày
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/services?service=boarding"
                  className="px-6 py-2.5 border border-orange-500 hover:bg-orange-50 text-orange-500 text-xs font-bold rounded-pill transition-colors tracking-wider uppercase"
                >
                  Xem thêm
                </Link>
                <Link
                  to="/services?service=boarding"
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-pill transition-all duration-180 hover:-translate-y-px shadow-orange-500/30 hover:shadow-orange-500/50 tracking-wider uppercase"
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

      {/* Service 3: Dịch vụ tại nhà */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Paw watermark bottom-left */}
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
            {/* Left: Info Details */}
            <div className="space-y-6 md:pl-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500">
                  THÔNG TIN & BẢNG GIÁ
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-brown-dark text-3xl sm:text-4xl leading-tight">
                Dịch Vụ Thú Cưng <br />
                <span className="italic text-blue-500 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.15)] relative inline-block">
                  Tại Nhà
                </span>
              </h2>

              {/* Tick list */}
              <ul className="space-y-3 pt-2">
                {[
                  'Tắm Vệ Sinh',
                  'Tỉa Lông Tạo Kiểu',
                  'Cạo Lông Vệ Sinh'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
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

              {/* Price Row */}
              <div className="flex items-center gap-3 pt-4">
                <span className="text-xs sm:text-sm font-bold text-brown-dark">Từ</span>
                <span className="w-10 h-[2px] bg-blue-300" />
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  200.000đ
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/services?service=home_service"
                  className="px-6 py-2.5 border border-blue-500 hover:bg-blue-50/50 text-blue-600 text-xs font-bold rounded-pill transition-colors tracking-wider uppercase"
                >
                  Xem thêm
                </Link>
                <Link
                  to="/services?service=home_service"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-pill transition-all duration-180 hover:-translate-y-px shadow-mid hover:shadow-high tracking-wider uppercase"
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
    </>
  )
}

const NewsFeed = () => {
  const { lang } = useLanguage()
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews()
        setNewsList(data.slice(0, 3)) // Get latest 3
      } catch (err) {
        console.error('Failed to load news:', err)
      } finally {
        setLoading(false)
      }
    }
    loadNews()
  }, [])

  return (
    <section className="py-16 bg-[#faf9f8] border-t border-border-light">
      <div className="container-site">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-accent text-[11px] font-bold uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-pill">
            Góc Chia Sẻ
          </span>
          <h2 className="font-heading font-bold text-brown-dark text-2xl sm:text-3xl tracking-tight">
            Tin Tức & Kinh Nghiệm
          </h2>
          <p className="text-[#555555] text-xs sm:text-sm leading-relaxed">
            Cập nhật các mẹo hay, kinh nghiệm nuôi dạy và chăm sóc chó mèo từ các chuyên gia tại spa.
          </p>
        </div>

        {loading ? (
          <div className="py-10 text-center">
            <div className="inline-block w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-muted mt-2">Đang tải tin tức...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div className="py-10 text-center text-muted text-xs">
            Chưa có bài viết tin tức nào được đăng tải.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {newsList.map(n => (
              <article
                key={n.id}
                className="bg-white border border-[#eeeeee] rounded-card overflow-hidden hover:shadow-mid transition-all duration-280 hover:-translate-y-0.5 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[16/10] bg-bg-light relative overflow-hidden select-none">
                  {n.imageUrl ? (
                    <img
                      src={n.imageUrl}
                      alt={n.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                      No Image
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded-sm">
                    {n.createdAt ? new Date(n.createdAt).toLocaleDateString('vi-VN') : ''}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-brown-dark text-sm leading-tight hover:text-primary transition-colors line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="text-xs text-text-light line-clamp-3 leading-relaxed">
                      {n.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border-light flex justify-between items-center text-[11px] text-muted">
                    <span>Tác giả: {n.author || 'Spa Staff'}</span>
                    <Link to="/news" className="font-bold text-primary hover:underline">
                      Đọc thêm &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const GroomingInlineBanner = () => (
  <section className="py-8 bg-white border-t border-border-light">
    <div className="container-site">
      <Link
        to="/services"
        className="block overflow-hidden rounded-card border border-border-light bg-[#4fa373] shadow-low transition-all duration-280 hover:-translate-y-1 hover:shadow-mid"
        aria-label="Dat lich tam goi cho thu cung"
      >
        <img
          src="/banner-grooming-price.png"
          alt="Dong gia tam goi cho thu cung"
          className="w-full aspect-[2048/335] object-cover"
          loading="lazy"
        />
      </Link>
    </div>
  </section>
)

const Home = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <GroomingInlineBanner />
      <ServiceSection />
      
      <NewsFeed />
    </div>
  )
}

export default Home
