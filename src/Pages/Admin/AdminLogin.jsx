import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminAuthContext'

const AdminLogin = () => {
  const { login, loginError, loading } = useAdmin()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const ok = await login(username, password)
    if (ok) navigate('/admin/dashboard')
  }

  return (
    <section className="bg-bg-light border-t border-border-light">
      <div className="container-site py-12 min-h-[72vh] grid lg:grid-cols-[1fr_420px] gap-8 items-center">
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-pill bg-primary/10 text-primary px-4 py-2 text-xs font-bold mb-5">
              <ShieldIcon size={15} />
              Admin Pet Shop
            </div>
            <h1 className="font-heading font-bold text-brown-dark text-3xl leading-tight tracking-tight">
              Quản lý cửa hàng thú cưng trong một giao diện quen thuộc.
            </h1>
            <p className="text-text-light text-sm leading-relaxed mt-4 max-w-lg">
              Theo dõi đơn hàng, lịch hẹn chăm sóc và catalog sản phẩm với cùng màu sắc, nhịp spacing và phong cách của website Pet Shop.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                ['Sản phẩm', 'Catalog'],
                ['Đơn hàng', 'Theo dõi'],
                ['Lịch hẹn', 'Dịch vụ'],
              ].map(([title, sub]) => (
                <div key={title} className="bg-white border border-border-light rounded-card p-4 shadow-low">
                  <p className="font-bold text-brown-dark text-sm">{title}</p>
                  <p className="text-muted text-[11px] mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-red mb-4">
              <PawIcon size={22} />
            </div>
            <h2 className="font-heading font-bold text-brown-dark text-2xl tracking-tight">
              Đăng nhập quản trị
            </h2>
            <p className="text-muted text-xs mt-1.5">Chỉ dành cho quản trị viên hệ thống</p>
          </div>

          <div className="bg-white rounded-card border border-border-light shadow-mid p-6 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Tên đăng nhập">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                    <UserIcon size={15} />
                  </span>
                  <input
                    id="admin-username"
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="admin"
                    className={fieldCls + ' pl-10'}
                  />
                </div>
              </FormField>

              <FormField label="Mật khẩu">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                    <LockIcon size={15} />
                  </span>
                  <input
                    id="admin-password"
                    type={showPass ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={fieldCls + ' pl-10 pr-11'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(value => !value)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                    tabIndex={-1}
                    aria-label={showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPass ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                  </button>
                </div>
              </FormField>

              {loginError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-btn px-4 py-2.5 text-xs text-primary">
                  <AlertIcon size={15} />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-accent rounded-btn py-2.5 text-xs font-semibold disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    Đăng nhập
                    <ArrowRightIcon size={15} />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-muted text-[11px] mt-5">
            Quay lại <Link to="/" className="text-primary hover:underline font-semibold">Trang chủ</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

const fieldCls = 'w-full bg-bg-light border border-border-light rounded-btn px-4 py-2.5 text-xs text-brown-dark placeholder-muted outline-none focus:border-primary/40 focus:bg-white transition-all'

const FormField = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-bold text-brown-dark uppercase tracking-wider">
      {label}
    </label>
    {children}
  </div>
)

const Svg = ({ size = 16, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const PawIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <ellipse cx="6" cy="6.5" rx="2" ry="3" />
    <ellipse cx="17.5" cy="5.5" rx="2" ry="3" />
    <ellipse cx="2" cy="14" rx="2" ry="3" transform="rotate(-45 2 14)" />
    <ellipse cx="22" cy="14" rx="2" ry="3" transform="rotate(45 22 14)" />
    <path d="M12 12c-4 0-7 3-7 6s2.5 4 7 4 7-1 7-4-3-6-7-6z" />
  </svg>
)
const ShieldIcon = ({ size }) => <Svg size={size}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Svg>
const UserIcon = ({ size }) => <Svg size={size}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>
const LockIcon = ({ size }) => <Svg size={size}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Svg>
const EyeIcon = ({ size }) => <Svg size={size}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></Svg>
const EyeOffIcon = ({ size }) => <Svg size={size}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></Svg>
const AlertIcon = ({ size }) => <Svg size={size}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></Svg>
const ArrowRightIcon = ({ size }) => <Svg size={size}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Svg>

export default AdminLogin
