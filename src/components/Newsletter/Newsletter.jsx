// Newsletter — Subscribe section + trust badges
import { useState } from 'react'
import { subscribeNewsletter } from '../../utils/api'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      await subscribeNewsletter(email)
      setStatus('success')
      setMessage('Đăng ký thành công. Ưu đãi dịch vụ mới nhất sẽ được gửi tới email của bạn.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <section id="newsletter" className="py-12 bg-bg-light border-t border-border-light">
      <div className="container-site">
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '🩺', title: 'Chăm sóc chuyên nghiệp', sub: 'Đội ngũ nhiều kinh nghiệm' },
            { icon: '🧼', title: 'Vệ sinh & Tắm rửa',     sub: 'Sạch sẽ, thơm tho 100%' },
            { icon: '📹', title: 'Giám sát trực tuyến',    sub: 'Theo dõi bé yêu 24/7' },
            { icon: '❤️', title: 'Hỗ trợ tận tình',       sub: 'Yêu thương như con cưng' },
          ].map((b, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 bg-white rounded-card shadow-low hover:shadow-mid transition-shadow duration-280 text-center sm:text-left"
            >
              <span className="text-3xl shrink-0">{b.icon}</span>
              <div>
                <div className="font-medium text-xs text-[#333333]">{b.title}</div>
                <div className="text-caption text-muted mt-0.5">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter box */}
        <div className="bg-gradient-to-br from-brown-dark to-brown-warm rounded-card p-8 sm:p-12 relative overflow-hidden text-center">
          {/* BG deco */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-white/10" />
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border-2 border-white/10" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-60 h-60 rounded-full bg-primary/10" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <div className="text-2xl">🐾</div>
            <h2
              className="text-white font-heading font-medium"
              style={{ fontSize: '26px' }}
            >
              Đăng ký nhận ưu đãi
            </h2>
            <p className="text-white/70 text-xs leading-relaxed">
              Nhận ngay các chương trình ưu đãi dịch vụ chăm sóc và bài viết chia sẻ bổ ích mới nhất từ Pet's Home.
            </p>
            <form
              id="newsletter-form"
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                className="flex-1 px-4 py-3 rounded-btn text-xs text-[#333333] placeholder-muted border border-white/20 bg-white/10 text-white placeholder:text-white/50 outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-180"
                required
              />
              <button
                type="submit"
                id="newsletter-submit"
                className="btn-accent px-6 py-3 rounded-btn text-xs font-medium whitespace-nowrap shrink-0"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Đang gửi...' : 'Đăng ký ngay'}
              </button>
            </form>
            {message && (
              <p className={`text-[11px] ${status === 'success' ? 'text-white' : 'text-accent'}`}>
                {message}
              </p>
            )}
            <p className="text-white/40 text-[10px]">
              Chúng tôi không spam. Hủy đăng ký bất kỳ lúc nào.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
