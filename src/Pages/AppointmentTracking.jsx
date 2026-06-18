import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trackAppointments } from '../utils/api'

const STATUS = {
  PENDING: { label: 'Chờ xác nhận', tone: 'bg-amber-50 text-amber-700 border-amber-200', step: 1 },
  CONFIRMED: { label: 'Đã xác nhận', tone: 'bg-blue-50 text-blue-700 border-blue-200', step: 2 },
  DONE: { label: 'Đã hoàn thành', tone: 'bg-green-50 text-green-700 border-green-200', step: 3 },
  CANCELLED: { label: 'Đã hủy', tone: 'bg-red-50 text-red-700 border-red-200', step: 0 },
}

const SERVICES = {
  grooming: 'Tắm rửa & Vệ sinh',
  boarding: 'Trông giữ thú cưng',
  home_service: 'Dịch vụ tại nhà',
  veterinary: 'Chăm sóc thú y',
}

const formatDate = (value) => {
  if (!value) return '—'
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

const maskPhone = (phone = '') => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7) return phone
  return `${digits.slice(0, 4)} *** ${digits.slice(-3)}`
}

const AppointmentTracking = () => {
  const [phone, setPhone] = useState('')
  const [appointments, setAppointments] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 9 || digits.length > 12) {
      setError('Vui lòng nhập số điện thoại hợp lệ (9–11 chữ số).')
      setSearched(false)
      return
    }

    setLoading(true)
    setError('')
    try {
      setAppointments(await trackAppointments(phone.trim()))
      setSearched(true)
    } catch {
      setError('Chưa thể tra cứu lúc này. Vui lòng thử lại sau.')
      setSearched(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#faf8f6] min-h-[70vh] pb-20">
      <section className="bg-brown-dark text-white py-14 sm:py-18 relative overflow-hidden">
        <div className="absolute -right-12 -top-20 w-72 h-72 rounded-full bg-primary/15" />
        <div className="absolute left-10 -bottom-24 w-52 h-52 rounded-full border-[30px] border-white/5" />
        <div className="container-site relative text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary bg-white/10 rounded-pill px-4 py-1.5 mb-4">
            Tra cứu nhanh 24/7
          </span>
          <h1 className="font-heading text-white text-h1 sm:text-display font-bold mb-3">Theo dõi lịch hẹn</h1>
          <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto">
            Nhập số điện thoại đã dùng khi đặt lịch để xem trạng thái chăm sóc thú cưng của bạn.
          </p>
        </div>
      </section>

      <div className="container-site max-w-4xl -mt-8 relative z-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-card shadow-high border border-border-light p-5 sm:p-7">
          <label htmlFor="tracking-phone" className="block font-bold text-brown-dark text-xs mb-2">Số điện thoại đặt lịch</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <PhoneIcon />
              </span>
              <input
                id="tracking-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => { setPhone(event.target.value); setError('') }}
                placeholder="Ví dụ: 0898 520 760"
                className="w-full h-12 rounded-pill border border-[#dedbd8] pl-11 pr-4 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <button type="submit" disabled={loading} className="h-12 px-7 rounded-pill bg-primary text-white text-xs font-bold hover:bg-secondary shadow-red transition-all disabled:opacity-60">
              {loading ? 'Đang tra cứu...' : 'Tra cứu lịch hẹn'}
            </button>
          </div>
          {error && <p role="alert" className="mt-3 text-[11px] text-red-600">{error}</p>}
          <p className="mt-3 text-[11px] text-muted flex items-center gap-1.5"><LockIcon /> Thông tin của bạn được bảo mật và chỉ dùng để tra cứu.</p>
        </form>

        {searched && appointments.length === 0 && (
          <div className="mt-7 bg-white rounded-card border border-border-light text-center px-6 py-12 animate-fade-in">
            <div className="w-14 h-14 mx-auto rounded-full bg-bg-light text-muted flex items-center justify-center mb-4"><CalendarIcon /></div>
            <h2 className="font-bold text-brown-dark text-sm mb-2">Không tìm thấy lịch hẹn</h2>
            <p className="text-text-light text-xs mb-5">Hãy kiểm tra lại số điện thoại hoặc đặt một lịch hẹn mới.</p>
            <Link to="/services" className="inline-flex px-6 py-2.5 rounded-pill bg-brown-dark text-white text-xs font-bold hover:bg-brown-warm">Đặt lịch ngay</Link>
          </div>
        )}

        {searched && appointments.length > 0 && (
          <section className="mt-8 animate-fade-in-up">
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted font-bold mb-1">Kết quả tra cứu</p>
                <h2 className="font-heading font-bold text-brown-dark text-h4">Lịch hẹn của bạn</h2>
              </div>
              <span className="text-[11px] text-text-light">{appointments.length} lịch hẹn · {maskPhone(phone)}</span>
            </div>
            <div className="space-y-4">
              {appointments.map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

const AppointmentCard = ({ appointment }) => {
  const status = STATUS[appointment.status] || STATUS.PENDING
  const cancelled = appointment.status === 'CANCELLED'
  return (
    <article className="bg-white rounded-card border border-border-light p-5 sm:p-6 shadow-low">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-border-light">
        <div className="flex gap-3">
          <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><PawIcon /></div>
          <div>
            <h3 className="font-bold text-brown-dark text-sm">{SERVICES[appointment.serviceType] || appointment.serviceType}</h3>
            <p className="text-[11px] text-muted mt-0.5">Mã lịch hẹn: #{appointment.id?.slice(-8).toUpperCase()}</p>
          </div>
        </div>
        <span className={`self-start rounded-pill border px-3 py-1 text-[11px] font-bold ${status.tone}`}>{status.label}</span>
      </div>

      {!cancelled && (
        <div className="py-5">
          <div className="flex items-center">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className={`flex items-center ${index < 2 ? 'flex-1' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${status.step >= step ? 'bg-primary text-white' : 'bg-[#eeeae7] text-muted'}`}>
                  {status.step > step ? '✓' : step}
                </div>
                {index < 2 && <div className={`h-0.5 flex-1 ${status.step > step ? 'bg-primary' : 'bg-[#eeeae7]'}`} />}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 text-center text-[10px] sm:text-[11px] mt-2 font-semibold text-text-light">
            <span>Tiếp nhận</span><span>Xác nhận</span><span>Hoàn thành</span>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${cancelled ? 'pt-5' : ''}`}>
        <Info label="Khách hàng" value={appointment.customerName} />
        <Info label={appointment.checkoutDate ? 'Thời gian lưu trú' : 'Ngày hẹn'} value={appointment.checkoutDate ? `${formatDate(appointment.date)} – ${formatDate(appointment.checkoutDate)}` : formatDate(appointment.date)} />
        <Info label="Khung giờ" value={appointment.timeSlot || 'Cửa hàng sẽ liên hệ'} />
      </div>
    </article>
  )
}

const Info = ({ label, value }) => <div><p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">{label}</p><p className="text-xs text-brown-dark font-semibold">{value}</p></div>

const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>
const LockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
const CalendarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>
const PawIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="6" cy="6.5" rx="2" ry="3"/><ellipse cx="17.5" cy="5.5" rx="2" ry="3"/><ellipse cx="2" cy="14" rx="2" ry="3" transform="rotate(-45 2 14)"/><ellipse cx="22" cy="14" rx="2" ry="3" transform="rotate(45 22 14)"/><path d="M12 12c-4 0-7 3-7 6s2.5 4 7 4 7-1 7-4-3-6-7-6z"/></svg>

export default AppointmentTracking
