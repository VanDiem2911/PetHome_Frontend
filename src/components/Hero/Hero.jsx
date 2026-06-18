import { useLanguage } from '../../context/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative bg-black overflow-hidden min-h-[calc(100vh-112px)] flex items-start pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay for high text readability on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent pointer-events-none z-0" />

      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl opacity-35 z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full filter blur-3xl opacity-20 z-0" />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Transparent content styled high top-left */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 text-left">
            
            {/* Tag/Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4fa373]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#eeeeee]">
                {t('petStore')}
              </span>
            </div>
            
            {/* Title & Desc (Transparent background) */}
            <div className="text-left space-y-3 w-full max-w-xl">
              <h1 className="font-heading font-extrabold text-white tracking-tight leading-tight" style={{ fontSize: '38px', lineHeight: '1.2' }}>
                {t('heroTitle1')} <br />
                {t('heroTitle2')}{' '}
                <span className="text-primary relative inline-block">
                  {t('heroTitle3')}
                </span>
              </h1>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                {t('heroDesc')}
              </p>
            </div>

            {/* Checklist with transparent background & white text */}
            <div className="w-full max-w-xl text-left space-y-2.5 pt-2">
              {[
                'Tắm rửa & Vệ sinh chuyên nghiệp',
                'Trông giữ thú cưng 24/7 tiện nghi',
                'Dịch vụ chăm sóc tận nơi tại nhà'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                  <div className="w-5 h-5 rounded-full bg-[#4fa373]/25 flex items-center justify-center text-green-400 shrink-0 shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="4.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-heading font-semibold text-white text-xs sm:text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button with Arrow */}
            <div className="pt-2">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector('section.py-16');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-between gap-4 px-8 py-3 bg-[#4fa373] hover:bg-[#3d835b] text-white text-xs font-bold rounded-pill shadow-lg hover:shadow-green-500/30 transition-all duration-280 uppercase tracking-widest cursor-pointer"
              >
                <span>Đặt lịch ngay</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

          </div>

          {/* Right Side: Open space to show the video background action */}
          <div className="lg:col-span-5" />

        </div>
      </div>
    </section>
  )
}

export default Hero
