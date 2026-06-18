import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminAuthContext'

const AdminDashboard = () => {
  const { logout, authFetch, isAdmin } = useAdmin()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: ChartIcon },
    { id: 'appointments', label: 'Lịch hẹn', icon: CalendarIcon },
    { id: 'contacts', label: 'Liên hệ', icon: MailIcon },
    { id: 'news', label: 'Tin tức', icon: SparkIcon },
  ]

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
      return
    }
    authFetch('/stats').then(setStats).catch(() => {})
  }, [isAdmin, navigate, authFetch])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const active = tabs.find(tab => tab.id === activeTab)
  const ActiveIcon = active?.icon || ChartIcon

  return (
    <section className="bg-bg-light border-t border-border-light">
      <div className="container-site py-8">
        <div className="min-h-[76vh] grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <aside className="bg-white border border-border-light rounded-card shadow-low overflow-hidden self-start lg:sticky lg:top-24">
            <div className="p-5 border-b border-border-light">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-red">
                  <PawIcon size={18} />
                </div>
                <div>
                  <p className="font-heading font-bold text-brown-dark text-sm leading-tight">Pet Shop</p>
                  <p className="text-[10px] text-muted uppercase tracking-wider">Admin workspace</p>
                </div>
              </div>
            </div>

            <nav className="p-3 space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                const selected = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-btn text-xs font-semibold transition-all duration-180 ${
                      selected
                        ? 'bg-primary text-white shadow-red'
                        : 'text-text-light hover:bg-bg-light hover:text-primary'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>

            <div className="p-3 border-t border-border-light">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-btn text-xs font-semibold text-text-light hover:bg-red-50 hover:text-primary transition-colors"
              >
                <LogoutIcon size={16} />
                Đăng xuất
              </button>
            </div>
          </aside>

          <main className="min-w-0 space-y-6">
            <div className="bg-white border border-border-light rounded-card shadow-low p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ActiveIcon size={19} />
                </div>
                <div>
                  <h1 className="font-heading font-bold text-brown-dark text-xl sm:text-2xl tracking-tight">
                    {active?.label}
                  </h1>
                  <p className="text-muted text-xs mt-0.5">Quản lý vận hành dịch vụ Pet Shop</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 self-start sm:self-center rounded-pill bg-accent/10 px-3 py-1.5 text-[11px] font-semibold text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Online
              </div>
            </div>

            {activeTab === 'overview' && <OverviewTab stats={stats} />}
            {activeTab === 'appointments' && <AppointmentsTab authFetch={authFetch} />}
            {activeTab === 'contacts' && <ContactsTab authFetch={authFetch} />}
            {activeTab === 'news' && <NewsTab authFetch={authFetch} />}
          </main>
        </div>
      </div>
    </section>
  )
}

const OverviewTab = ({ stats }) => {
  if (!stats) return <LoadingSpinner />

  const cards = [
    { label: 'Tổng lịch đặt', value: stats.totalAppointments, icon: CalendarIcon },
    { label: 'Chờ xác nhận', value: stats.pendingAppointments, icon: ClockIcon },
    { label: 'Ý kiến liên hệ', value: stats.totalContacts, icon: MailIcon },
    { label: 'Bài viết tin tức', value: stats.totalNews, icon: SparkIcon },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white border border-border-light rounded-card shadow-low p-5">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <div className="text-2xl font-bold text-brown-dark">{card.value ?? 0}</div>
              <div className="text-xs text-muted mt-1 font-medium">{card.label}</div>
            </div>
          )
        })}
      </div>

      <Panel title="Hướng dẫn nhanh" icon={SparkIcon}>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            'Theo dõi lịch hẹn và cập nhật trạng thái chăm sóc thú cưng.',
            'Xem các phản hồi hợp tác, tư vấn của khách gửi ở form liên hệ.',
            'Đăng tải và chỉnh sửa các bài chia sẻ kinh nghiệm chăm thú cưng.',
          ].map(item => (
            <div key={item} className="rounded-btn border border-border-light bg-bg-light p-4 text-xs text-text-light leading-relaxed">
              {item}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

const AppointmentsTab = ({ authFetch }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setList(await authFetch('/appointments'))
    } catch {
      setList([])
    } finally {
      setLoading(false)
    }
  }, [authFetch])

  useEffect(() => {
    const timer = window.setTimeout(load, 0)
    return () => window.clearTimeout(timer)
  }, [load])

  const updateStatus = async (id, status) => {
    try {
      const updated = await authFetch(`/appointments/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setList(prev => prev.map(item => item.id === id ? updated : item))
    } catch (error) {
      console.warn(error.message)
    }
  }

  const del = async id => {
    if (!window.confirm('Xóa lịch hẹn này?')) return
    try {
      await authFetch(`/appointments/${id}`, { method: 'DELETE' })
      setList(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.warn(error.message)
    }
  }

  const filtered = filter === 'ALL' ? list : list.filter(item => item.status === filter)

  return (
    <Panel title="Lịch hẹn chăm sóc" icon={CalendarIcon}>
      <StatusFilters
        value={filter}
        onChange={setFilter}
        items={list}
        labels={appointmentStatusLabel}
        statuses={['ALL', 'PENDING', 'CONFIRMED', 'DONE', 'CANCELLED']}
      />

      {loading ? <LoadingSpinner /> : filtered.length === 0 ? <EmptyState msg="Không có lịch hẹn nào" /> : (
        <div className="space-y-3 mt-5">
          {filtered.map(item => (
            <div key={item.id} className="rounded-card border border-border-light bg-white p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-brown-dark text-sm">{item.customerName}</span>
                  <StatusBadge status={item.status} labels={appointmentStatusLabel} />
                  <span className="rounded-pill bg-bg-light px-2.5 py-1 text-[11px] font-semibold text-text-light">
                    {item.serviceType === 'grooming'
                      ? 'Tắm grooming'
                      : item.serviceType === 'home_service'
                      ? 'Dịch vụ tại nhà'
                      : 'Gửi thú'}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  {item.phone} · {item.date}{item.checkoutDate ? ` → ${item.checkoutDate}` : ''}{item.timeSlot ? ` · ${item.timeSlot}` : ''}
                </p>
                {item.notes && <p className="text-xs text-text-light italic">{item.notes}</p>}
              </div>
              <div className="flex gap-2 shrink-0 flex-wrap">
                {item.status === 'PENDING' && (
                  <ActionButton onClick={() => updateStatus(item.id, 'CONFIRMED')}>Xác nhận</ActionButton>
                )}
                {(item.status === 'PENDING' || item.status === 'CONFIRMED') && (
                  <ActionButton onClick={() => updateStatus(item.id, 'DONE')} variant="dark">Hoàn thành</ActionButton>
                )}
                {item.status !== 'CANCELLED' && (
                  <ActionButton onClick={() => updateStatus(item.id, 'CANCELLED')} variant="muted">Hủy</ActionButton>
                )}
                <IconButton onClick={() => del(item.id)} ariaLabel="Xóa lịch hẹn">
                  <TrashIcon size={14} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  )
}

const ContactsTab = ({ authFetch }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setList(await authFetch('/contacts'))
    } catch {
      setList([])
    } finally {
      setLoading(false)
    }
  }, [authFetch])

  useEffect(() => {
    load()
  }, [load])

  const updateStatus = async (id, status) => {
    try {
      const updated = await authFetch(`/contacts/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setList(prev => prev.map(item => item.id === id ? updated : item))
    } catch (error) {
      console.warn(error.message)
    }
  }

  const del = async id => {
    if (!window.confirm('Xóa liên hệ này?')) return
    try {
      await authFetch(`/contacts/${id}`, { method: 'DELETE' })
      setList(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.warn(error.message)
    }
  }

  const filtered = filter === 'ALL' ? list : list.filter(item => item.status === filter)

  return (
    <Panel title="Ý kiến liên hệ từ khách hàng" icon={MailIcon}>
      <StatusFilters
        value={filter}
        onChange={setFilter}
        items={list}
        labels={{
          ALL: 'Tất cả',
          PENDING: 'Chờ xử lý',
          RESOLVED: 'Đã giải quyết'
        }}
        statuses={['ALL', 'PENDING', 'RESOLVED']}
      />

      {loading ? <LoadingSpinner /> : filtered.length === 0 ? <EmptyState msg="Không có tin nhắn liên hệ nào" /> : (
        <div className="space-y-3 mt-5">
          {filtered.map(item => (
            <div key={item.id} className="rounded-card border border-border-light bg-white p-4 sm:p-5 flex flex-col xl:flex-row xl:items-start justify-between gap-4">
              <div className="min-w-0 space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-brown-dark text-sm">{item.name}</span>
                  <span className={`rounded-pill border px-2.5 py-0.5 text-[10px] font-bold ${
                    item.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-accent/10 text-accent border-accent/20'
                  }`}>
                    {item.status === 'PENDING' ? 'Chờ xử lý' : 'Đã giải quyết'}
                  </span>
                  <span className="rounded-pill bg-bg-light px-2.5 py-0.5 text-[10px] font-semibold text-text-light">
                    Mục: {item.subject}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  Email: {item.email} · Ngày gửi: {item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : ''}
                </p>
                <div className="bg-[#f8f9fa] border border-[#eeeeee] p-3 rounded-card text-xs text-brown-dark leading-relaxed">
                  {item.message}
                </div>
              </div>
              <div className="flex gap-2 shrink-0 self-end xl:self-center">
                {item.status === 'PENDING' && (
                  <ActionButton onClick={() => updateStatus(item.id, 'RESOLVED')}>Giải quyết</ActionButton>
                )}
                {item.status === 'RESOLVED' && (
                  <ActionButton onClick={() => updateStatus(item.id, 'PENDING')} variant="muted">Đánh dấu chưa xử lý</ActionButton>
                )}
                <IconButton onClick={() => del(item.id)} ariaLabel="Xóa liên hệ" tone="danger">
                  <TrashIcon size={14} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  )
}

const NewsTab = ({ authFetch }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  
  const EMPTY_NEWS = {
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    author: 'Pet Home Spa'
  }
  const [form, setForm] = useState(EMPTY_NEWS)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setList(await authFetch('/news'))
    } catch {
      setList([])
    } finally {
      setLoading(false)
    }
  }, [authFetch])

  useEffect(() => {
    load()
  }, [load])

  const openNew = () => {
    setForm(EMPTY_NEWS)
    setEditing('new')
  }

  const openEdit = item => {
    setForm({ ...item })
    setEditing(item)
  }

  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingImg(true)
    const formData = new FormData()
    formData.append('file', file)
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dpgr5y84c'
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'pethome_preset'
    formData.append('upload_preset', preset)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setForm(prev => ({ ...prev, imageUrl: data.secure_url }))
    } catch (err) {
      console.error(err)
      alert('Tải ảnh thất bại. Vui lòng nhập liên kết ảnh thủ công.')
    } finally {
      setUploadingImg(false)
    }
  }

  const save = async () => {
    if (!form.title || !form.summary || !form.content) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.')
      return
    }
    setSaving(true)
    try {
      if (editing === 'new') {
        const created = await authFetch('/news', {
          method: 'POST',
          body: JSON.stringify(form)
        })
        setList(prev => [created, ...prev])
      } else {
        const updated = await authFetch(`/news/${editing.id}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        })
        setList(prev => prev.map(item => item.id === editing.id ? updated : item))
      }
      setEditing(null)
    } catch (error) {
      console.warn(error.message)
      alert('Lưu bài viết thất bại: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const del = async id => {
    if (!window.confirm('Xóa bài viết này?')) return
    try {
      await authFetch(`/news/${id}`, { method: 'DELETE' })
      setList(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.warn(error.message)
    }
  }

  return (
    <>
      <Panel title="Danh sách bài viết tin tức & chia sẻ" icon={SparkIcon}>
        <div className="flex justify-end mb-5">
          <button type="button" onClick={openNew} className="btn-accent rounded-btn px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <PlusIcon size={14} />
            Thêm bài viết mới
          </button>
        </div>

        {loading ? <LoadingSpinner /> : list.length === 0 ? <EmptyState msg="Chưa có bài viết nào" /> : (
          <div className="overflow-x-auto rounded-card border border-border-light">
            <table className="w-full text-xs">
              <thead className="bg-bg-light text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left font-bold w-1/4">Tiêu đề</th>
                  <th className="px-4 py-3 text-left font-bold">Tóm tắt ngắn</th>
                  <th className="px-4 py-3 text-left font-bold">Tác giả</th>
                  <th className="px-4 py-3 text-left font-bold">Ngày đăng</th>
                  <th className="px-4 py-3 text-center font-bold">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light bg-white">
                {list.map(n => (
                  <tr key={n.id} className="hover:bg-bg-light/70 transition-colors">
                    <td className="px-4 py-3 font-semibold text-brown-dark">{n.title}</td>
                    <td className="px-4 py-3 text-text-light line-clamp-2 mt-2">{n.summary}</td>
                    <td className="px-4 py-3 text-text-light">{n.author}</td>
                    <td className="px-4 py-3 text-text-light whitespace-nowrap">
                      {n.createdAt ? new Date(n.createdAt).toLocaleDateString('vi-VN') : ''}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 justify-center">
                        <IconButton onClick={() => openEdit(n)} ariaLabel="Sửa bài viết">
                          <EditIcon size={14} />
                        </IconButton>
                        <IconButton onClick={() => del(n.id)} ariaLabel="Xóa bài viết" tone="danger">
                          <TrashIcon size={14} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {editing !== null && (
        <div className="fixed inset-0 bg-brown-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-border-light rounded-card shadow-high p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h3 className="font-heading font-bold text-brown-dark text-lg">
                {editing === 'new' ? 'Thêm bài viết mới' : 'Sửa bài viết'}
              </h3>
              <button type="button" onClick={() => setEditing(null)} className="text-muted hover:text-primary transition-colors" aria-label="Đóng">
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <FormField label="Tiêu đề bài viết (*)">
                <input
                  value={form.title || ''}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Nhập tiêu đề bài viết..."
                  className={fieldCls}
                  required
                />
              </FormField>

              <FormField label="Tác giả">
                <input
                  value={form.author || ''}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  placeholder="Tên tác giả..."
                  className={fieldCls}
                />
              </FormField>

              <FormField label="Hình ảnh bài viết">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      value={form.imageUrl || ''}
                      onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="Nhập liên kết ảnh hoặc tải lên"
                      className={fieldCls + ' flex-1'}
                    />
                    <label className="shrink-0 bg-[#111111] hover:bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn flex items-center gap-1.5 cursor-pointer transition-colors select-none">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImg}
                      />
                      {uploadingImg ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                          <span>Đang tải...</span>
                        </>
                      ) : (
                        <>
                          <CloudUploadIcon size={14} />
                          <span>Tải ảnh</span>
                        </>
                      )}
                    </label>
                  </div>
                  {form.imageUrl && (
                    <div className="relative w-16 h-16 rounded-card border border-border-light overflow-hidden bg-bg-light flex items-center justify-center">
                      <img src={form.imageUrl} alt="Preview" className="w-full h-full object-contain p-1" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, imageUrl: '' })}
                        className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors shadow-sm"
                        title="Xóa hình ảnh"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </FormField>

              <FormField label="Tóm tắt ngắn (*)">
                <textarea
                  value={form.summary || ''}
                  onChange={e => setForm({ ...form, summary: e.target.value })}
                  placeholder="Tóm tắt ngắn hiển thị trên danh sách..."
                  className={fieldCls + ' h-16 resize-none'}
                  maxLength={250}
                  required
                />
              </FormField>

              <FormField label="Nội dung chi tiết (*)">
                <textarea
                  value={form.content || ''}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Nội dung bài viết..."
                  className={fieldCls + ' h-48 resize-y'}
                  required
                />
              </FormField>
            </div>

            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setEditing(null)} className="flex-1 btn-outline rounded-btn py-2.5 text-xs font-semibold">
                Hủy
              </button>
              <button type="button" onClick={save} disabled={saving} className="flex-1 btn-accent rounded-btn py-2.5 text-xs font-semibold disabled:opacity-60">
                {saving ? 'Đang lưu...' : 'Lưu bài viết'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const appointmentStatusLabel = {
  ALL: 'Tất cả',
  PENDING: 'Chờ xác nhận',
  CONFIRMED: 'Đã xác nhận',
  CANCELLED: 'Đã hủy',
  DONE: 'Hoàn thành',
}

const statusTone = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  CONFIRMED: 'bg-accent/10 text-accent border-accent/20',
  DONE: 'bg-blue-50 text-blue-700 border-blue-200',
  CANCELLED: 'bg-red-50 text-primary border-red-200',
}

const fieldCls = 'w-full bg-bg-light border border-border-light rounded-btn px-4 py-2.5 text-xs text-brown-dark placeholder-muted outline-none focus:border-primary/40 focus:bg-white transition-all'

const Panel = ({ title, icon: Icon, children }) => (
  <section className="bg-white border border-border-light rounded-card shadow-low p-5 sm:p-6">
    <div className="flex items-center gap-3 mb-5">
      <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-pulse-soft">
        <Icon size={16} />
      </span>
      <h2 className="font-heading font-bold text-brown-dark text-base">{title}</h2>
    </div>
    {children}
  </section>
)

const StatusFilters = ({ value, onChange, items, labels, statuses }) => (
  <div className="flex gap-2 flex-wrap">
    {statuses.map(status => (
      <button
        key={status}
        type="button"
        onClick={() => onChange(status)}
        className={`px-3 py-1.5 rounded-pill border text-[11px] font-semibold transition-all ${
          value === status
            ? 'bg-primary text-white border-primary shadow-red'
            : 'bg-white text-text-light border-border-light hover:border-primary hover:text-primary'
        }`}
      >
        {labels[status]} ({status === 'ALL' ? items.length : items.filter(item => item.status === status).length})
      </button>
    ))}
  </div>
)

const StatusBadge = ({ status, labels }) => (
  <span className={`rounded-pill border px-2.5 py-1 text-[11px] font-bold ${statusTone[status] || 'bg-bg-light text-text-light border-border-light'}`}>
    {labels[status] || status}
  </span>
)

const ActionButton = ({ children, onClick, variant = 'primary' }) => {
  const cls = variant === 'dark'
    ? 'bg-brown-dark text-white border-brown-dark hover:bg-brown-warm'
    : variant === 'muted'
      ? 'bg-white text-text-light border-border-light hover:border-primary hover:text-primary'
      : 'bg-primary text-white border-primary hover:bg-secondary'

  return (
    <button type="button" onClick={onClick} className={`px-3 py-1.5 rounded-btn border text-[11px] font-semibold transition-colors ${cls}`}>
      {children}
    </button>
  )
}

const IconButton = ({ children, onClick, ariaLabel, tone = 'default' }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    title={ariaLabel}
    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
      tone === 'danger'
        ? 'border-red-100 bg-red-50 text-primary hover:bg-primary hover:text-white'
        : 'border-border-light bg-white text-text-light hover:border-primary hover:text-primary'
    }`}
  >
    {children}
  </button>
)

const FormField = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-bold text-brown-dark uppercase tracking-wider">{label}</label>
    {children}
  </div>
)

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-16 text-muted text-xs">
    <div className="w-6 h-6 border-2 border-border-light border-t-primary rounded-full animate-spin mr-3" />
    Đang tải...
  </div>
)

const EmptyState = ({ msg }) => (
  <div className="text-center py-14 text-muted text-xs bg-white">{msg}</div>
)

const Svg = ({ size = 16, children, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
const ChartIcon = ({ size }) => <Svg size={size}><path d="M3 3v18h18" /><path d="M8 17V9" /><path d="M13 17V5" /><path d="M18 17v-6" /></Svg>
const CalendarIcon = ({ size }) => <Svg size={size}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></Svg>
const BoxIcon = ({ size }) => <Svg size={size}><path d="M21 8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></Svg>
const BagIcon = ({ size }) => <Svg size={size}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></Svg>
const ClockIcon = ({ size }) => <Svg size={size}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>
const SparkIcon = ({ size }) => <Svg size={size}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" /><path d="M5 3v4" /><path d="M3 5h4" /><path d="M19 17v4" /><path d="M17 19h4" /></Svg>
const LogoutIcon = ({ size }) => <Svg size={size}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></Svg>
const SearchIcon = ({ size }) => <Svg size={size}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Svg>
const PlusIcon = ({ size }) => <Svg size={size}><path d="M12 5v14" /><path d="M5 12h14" /></Svg>
const EditIcon = ({ size }) => <Svg size={size}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></Svg>
const TrashIcon = ({ size }) => <Svg size={size}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></Svg>
const CloseIcon = ({ size }) => <Svg size={size}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Svg>
const MailIcon = ({ size }) => <Svg size={size}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></Svg>
const CloudUploadIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

export default AdminDashboard
