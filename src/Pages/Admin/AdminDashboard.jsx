import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminAuthContext'

const TIME_OPTIONS = [
  ...Array.from({ length: 96 }, (_, index) => {
    const hour = String(Math.floor(index / 4)).padStart(2, '0')
    const minute = String((index % 4) * 15).padStart(2, '0')
    return `${hour}:${minute}`
  }),
  '23:59',
]

const AdminDashboard = () => {
  const { logout, authFetch, isAdmin } = useAdmin()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: ChartIcon },
    { id: 'appointments', label: 'Lịch hẹn', icon: CalendarIcon },
    { id: 'contacts', label: 'Liên hệ', icon: MailIcon },
    { id: 'services', label: 'Dịch vụ', icon: PawIcon },
    { id: 'promotions', label: 'Khuyến mãi', icon: SparkIcon },
    { id: 'news', label: 'Tin tức', icon: MegaphoneIcon },
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
            {activeTab === 'services' && <CatalogTab type="services" authFetch={authFetch} />}
            {activeTab === 'promotions' && <CatalogTab type="promotions" authFetch={authFetch} />}
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
    { label: 'Bài viết tin tức', value: stats.totalNews, icon: MegaphoneIcon },
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
                {item.discountPercent > 0 && <p className="text-xs font-semibold text-green-700">Ưu đãi: {item.appliedPromotionTitle} (-{item.discountPercent}%)</p>}
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

const CatalogTab = ({ type, authFetch }) => {
  const isService = type === 'services'
  const empty = isService
    ? { code: '', title: '', price: '', priceLabel: '', unit: 'lượt', description: '', bulletPoints: [''], imageUrls: [''], active: true, sortOrder: 0 }
    : { title: '', description: '', promotionType: 'PREBOOK', discountPercent: 10, advanceHours: 24, startDate: '', endDate: '', startTime: '00:00', endTime: '23:59', imageUrl: '', serviceCode: '', tiers: [], active: true }
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [cloudifyingRows, setCloudifyingRows] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  const imageUrlTimers = useRef({})

  const load = useCallback(async () => {
    setLoading(true)
    try { setList(await authFetch(`/${type}`)) } catch { setList([]) } finally { setLoading(false) }
  }, [authFetch, type])

  useEffect(() => {
    load()
    if (!isService) authFetch('/services').then(setServiceOptions).catch(() => setServiceOptions([]))
  }, [load, isService, authFetch])

  const openNew = () => { setForm(empty); setEditing('new') }
  const openEdit = item => {
    const promotionText = `${item.title || ''} ${item.description || ''}`.toLowerCase()
    const looksLikeTimeSlot = /giờ vàng|khung giờ|theo giờ/.test(promotionText)
    const inferredPromotionType = item.tiers?.length
      ? 'LONG_STAY'
      : (item.startTime && item.endTime) || looksLikeTimeSlot
        ? 'TIME_SLOT'
        : item.promotionType || 'PREBOOK'
    setForm(isService ? {
      ...item,
      price: item.price ?? '',
      bulletPoints: item.bulletPoints?.length ? [...item.bulletPoints] : [''],
      imageUrls: item.imageUrls?.length ? [...item.imageUrls] : [''],
    } : {
      ...item,
      promotionType: inferredPromotionType,
      advanceHours: item.advanceHours || 24,
      tiers: item.tiers?.length ? item.tiers.map(tier => ({ ...tier })) : [],
      startTime: inferredPromotionType === 'TIME_SLOT' ? (item.startTime || '00:00') : (item.startTime || ''),
      endTime: inferredPromotionType === 'TIME_SLOT' ? (item.endTime || '23:59') : (item.endTime || ''),
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      serviceCode: item.serviceCode || '',
    })
    setEditing(item)
  }

  const save = async () => {
    if (!form.title || (isService && !form.code)) return alert('Vui lòng nhập đầy đủ tên và mã.')
    if (!isService && form.promotionType === 'TIME_SLOT') {
      if (!form.startTime || !form.endTime) return alert('Vui lòng chọn đầy đủ giờ bắt đầu và giờ kết thúc.')
      if (form.startTime >= form.endTime) return alert('Giờ kết thúc phải sau giờ bắt đầu.')
    }
    if (!isService && form.promotionType === 'LONG_STAY') {
      const activeTiers = (form.tiers || []).filter(tier => Number(tier.minDays) > 0)
      if (activeTiers.length === 0) {
        return alert('Vui lòng nhập ít nhất một mốc giảm giá cho loại ưu đãi Ở càng lâu.')
      }
    }
    const payload = isService ? {
      ...form,
      price: form.price === '' ? null : Number(form.price),
      sortOrder: Number(form.sortOrder || 0),
      bulletPoints: (form.bulletPoints || []).map(v => v.trim()).filter(Boolean),
      imageUrls: (form.imageUrls || []).map(v => v.trim()).filter(Boolean),
    } : {
      ...form,
      promotionType: form.promotionType,
      advanceHours: form.promotionType === 'PREBOOK' ? Number(form.advanceHours || 24) : null,
      discountPercent: form.promotionType === 'LONG_STAY'
        ? Math.max(0, ...(form.tiers || []).map(tier => Number(tier.discountPercent || 0)))
        : Number(form.discountPercent || 0),
      tiers: form.promotionType === 'LONG_STAY'
        ? (form.tiers || []).map(tier => ({ minDays: Number(tier.minDays), maxDays: tier.maxDays === '' || tier.maxDays == null ? null : Number(tier.maxDays), discountPercent: Number(tier.discountPercent || 0) })).filter(tier => tier.minDays > 0)
        : [],
    }
    setSaving(true)
    try {
      const saved = await authFetch(editing === 'new' ? `/${type}` : `/${type}/${editing.id}`, {
        method: editing === 'new' ? 'POST' : 'PUT', body: JSON.stringify(payload),
      })
      setList(prev => editing === 'new' ? [...prev, saved] : prev.map(v => v.id === saved.id ? saved : v))
      setEditing(null)
    } catch (error) { alert(`Không thể lưu: ${error.message}`) } finally { setSaving(false) }
  }

  const del = async item => {
    if (!window.confirm(`Xóa “${item.title}”?`)) return
    try { await authFetch(`/${type}/${item.id}`, { method: 'DELETE' }); setList(prev => prev.filter(v => v.id !== item.id)) }
    catch (error) { alert(error.message) }
  }

  const cloudifyImageUrl = async (index, sourceUrl) => {
    if (!/^https?:\/\//i.test(sourceUrl) || sourceUrl.includes('res.cloudinary.com')) return
    setCloudifyingRows(prev => [...new Set([...prev, index])])
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dpgr5y84c'
      const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'pethome_preset'
      const data = new FormData()
      data.append('file', sourceUrl)
      data.append('upload_preset', preset)
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: data })
      if (!response.ok) throw new Error('Cloudinary không thể tải ảnh từ URL này')
      const cloudinaryUrl = (await response.json()).secure_url
      setForm(prev => ({ ...prev, imageUrls: prev.imageUrls.map((value, i) => i === index && value === sourceUrl ? cloudinaryUrl : value) }))
    } catch (error) {
      alert(error.message)
    } finally {
      setCloudifyingRows(prev => prev.filter(row => row !== index))
    }
  }

  const handleImageUrlChange = (index, value) => {
    setForm(prev => ({ ...prev, imageUrls: prev.imageUrls.map((current, i) => i === index ? value : current) }))
    window.clearTimeout(imageUrlTimers.current[index])
    if (/^https?:\/\//i.test(value) && !value.includes('res.cloudinary.com')) {
      imageUrlTimers.current[index] = window.setTimeout(() => cloudifyImageUrl(index, value.trim()), 900)
    }
  }

  return <>
    <Panel title={isService ? 'Quản lý dịch vụ' : 'Quản lý khuyến mãi'} icon={isService ? PawIcon : SparkIcon}>
      <div className="flex justify-end mb-5">
        <button type="button" onClick={openNew} className="btn-accent rounded-btn px-5 py-2.5 text-xs font-semibold flex items-center gap-2">
          <PlusIcon size={14} /> {isService ? 'Thêm dịch vụ' : 'Thêm khuyến mãi'}
        </button>
      </div>
      {loading ? <LoadingSpinner /> : list.length === 0 ? <EmptyState msg="Chưa có dữ liệu" /> : (
        <div className="grid md:grid-cols-2 gap-4">
          {list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map(item => (
            <article key={item.id} className="border border-border-light rounded-card p-4 flex gap-4">
              {item.imageUrl || item.imageUrls?.[0] ? <img src={item.imageUrl || item.imageUrls[0]} alt="" className="w-20 h-20 rounded-btn object-cover bg-bg-light" /> : null}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div><h3 className="font-bold text-brown-dark text-sm">{item.title}</h3><p className="text-[11px] text-muted">{isService ? item.code : `${item.promotionType === 'LONG_STAY' || item.tiers?.length ? 'Ở càng lâu càng giảm' : item.promotionType === 'TIME_SLOT' ? `Khung giờ ${item.startTime || '?'}–${item.endTime || '?'}` : 'Đặt lịch trước'} · giảm đến ${item.discountPercent || 0}%`}</p></div>
                  <span className={`text-[10px] font-bold rounded-pill px-2 py-1 ${item.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-muted'}`}>{item.active ? 'Đang hiện' : 'Đã ẩn'}</span>
                </div>
                <p className="text-xs text-text-light line-clamp-2 my-2">{item.description}</p>
                {isService && <p className="font-bold text-primary text-xs">{item.price != null ? `${Number(item.price).toLocaleString('vi-VN')}đ` : item.priceLabel} / {item.unit}</p>}
                <div className="flex gap-2 mt-3"><IconButton onClick={() => openEdit(item)} ariaLabel="Chỉnh sửa"><EditIcon size={14} /></IconButton><IconButton onClick={() => del(item)} ariaLabel="Xóa" tone="danger"><TrashIcon size={14} /></IconButton></div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Panel>

    {editing !== null && <div className="fixed inset-0 bg-brown-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-card shadow-high p-6 w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5"><h3 className="font-heading font-bold text-lg">{editing === 'new' ? 'Thêm mới' : 'Chỉnh sửa'} {isService ? 'dịch vụ' : 'khuyến mãi'}</h3><button onClick={() => setEditing(null)}><CloseIcon size={18} /></button></div>
        <div className="grid sm:grid-cols-2 gap-4">
          {isService && <FormField label="Mã dịch vụ (*)"><input className={fieldCls} disabled={editing !== 'new'} value={form.code || ''} onChange={e => setForm({...form, code: e.target.value.trim().toLowerCase().replace(/\s+/g, '_')})} placeholder="grooming" /></FormField>}
          <FormField label="Tên (*)"><input className={fieldCls} value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} /></FormField>
          {isService ? <>
            <FormField label="Giá (VNĐ)"><input type="number" min="0" className={fieldCls} value={form.price ?? ''} onChange={e => setForm({...form, price: e.target.value})} placeholder="Để trống nếu tùy loại" /></FormField>
            <FormField label="Nhãn giá"><input className={fieldCls} value={form.priceLabel || ''} onChange={e => setForm({...form, priceLabel: e.target.value})} placeholder="Tùy loại" /></FormField>
            <FormField label="Đơn vị"><input className={fieldCls} value={form.unit || ''} onChange={e => setForm({...form, unit: e.target.value})} /></FormField>
            <FormField label="Thứ tự"><input type="number" className={fieldCls} value={form.sortOrder || 0} onChange={e => setForm({...form, sortOrder: e.target.value})} /></FormField>
          </> : <>
            <div className="sm:col-span-2">
              <FormField label="Loại khuyến mãi (*)">
                <select
                  className={fieldCls}
                  value={form.promotionType || 'PREBOOK'}
                  onChange={e => {
                    const promotionType = e.target.value
                    setForm(prev => ({
                      ...prev,
                      promotionType,
                      serviceCode: promotionType === 'LONG_STAY' ? 'boarding' : prev.serviceCode,
                      startTime: promotionType === 'TIME_SLOT' ? (prev.startTime || '00:00') : prev.startTime,
                      endTime: promotionType === 'TIME_SLOT' ? (prev.endTime || '23:59') : prev.endTime,
                      tiers: promotionType === 'LONG_STAY' && !prev.tiers?.length
                        ? [{ minDays: 1, maxDays: 3, discountPercent: 0 }, { minDays: 4, maxDays: 7, discountPercent: 5 }, { minDays: 8, maxDays: 14, discountPercent: 10 }, { minDays: 15, maxDays: '', discountPercent: 15 }]
                        : prev.tiers,
                    }))
                  }}
                >
                  <option value="PREBOOK">Đặt lịch trước — giảm theo phần trăm</option>
                  <option value="LONG_STAY">Ở càng lâu — giảm theo số ngày</option>
                  <option value="TIME_SLOT">Khung giờ cụ thể — giảm theo giờ</option>
                </select>
              </FormField>
            </div>
            <FormField label="Dịch vụ áp dụng">
              <select className={fieldCls} value={form.serviceCode || ''} onChange={e => setForm({...form, serviceCode: e.target.value})}>
                <option value="">Tất cả dịch vụ</option>
                {serviceOptions.map(service => <option key={service.id} value={service.code}>{service.title}</option>)}
              </select>
            </FormField>
            {form.promotionType === 'PREBOOK' && <>
              <FormField label="Phần trăm giảm"><input type="number" min="0" max="100" className={fieldCls} value={form.discountPercent || 0} onChange={e => setForm({...form, discountPercent: e.target.value})} /></FormField>
              <FormField label="Đặt trước tối thiểu (giờ)"><input type="number" min="1" className={fieldCls} value={form.advanceHours || 24} onChange={e => setForm({...form, advanceHours: e.target.value})} /></FormField>
            </>}
            {form.promotionType === 'TIME_SLOT' && <>
              <FormField label="Phần trăm giảm"><input type="number" min="0" max="100" className={fieldCls} value={form.discountPercent || 0} onChange={e => setForm({...form, discountPercent: e.target.value})} /></FormField>
              <FormField label="Giờ bắt đầu (24 giờ)">
                <select className={fieldCls} value={form.startTime || '00:00'} onChange={e => setForm({...form, startTime: e.target.value})}>
                  {TIME_OPTIONS.map(time => <option key={`start-${time}`} value={time}>{time}</option>)}
                </select>
              </FormField>
              <FormField label="Giờ kết thúc (24 giờ)">
                <select className={fieldCls} value={form.endTime || '23:59'} onChange={e => setForm({...form, endTime: e.target.value})}>
                  {TIME_OPTIONS.map(time => <option key={`end-${time}`} value={time}>{time}</option>)}
                </select>
              </FormField>
            </>}
            <FormField label="Ngày bắt đầu"><input type="date" className={fieldCls} value={form.startDate || ''} onChange={e => setForm({...form, startDate: e.target.value})} /></FormField>
            <FormField label="Ngày kết thúc"><input type="date" className={fieldCls} value={form.endDate || ''} onChange={e => setForm({...form, endDate: e.target.value})} /></FormField>
            <FormField label="URL ảnh"><input className={fieldCls} value={form.imageUrl || ''} onChange={e => setForm({...form, imageUrl: e.target.value})} /></FormField>
            {form.promotionType === 'LONG_STAY' && <div className="sm:col-span-2">
              <FormField label="Các mốc giảm theo số ngày">
                <div className="space-y-3">
                  {(form.tiers || []).map((tier, index) => (
                    <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end rounded-card border border-border-light bg-bg-light p-3">
                      <div><label className="text-[10px] font-bold text-muted">TỪ NGÀY</label><input type="number" min="1" className={fieldCls + ' bg-white'} value={tier.minDays} onChange={e => setForm(prev => ({...prev, tiers: prev.tiers.map((value, i) => i === index ? {...value, minDays: e.target.value} : value)}))} /></div>
                      <div><label className="text-[10px] font-bold text-muted">ĐẾN NGÀY</label><input type="number" min="1" className={fieldCls + ' bg-white'} value={tier.maxDays ?? ''} onChange={e => setForm(prev => ({...prev, tiers: prev.tiers.map((value, i) => i === index ? {...value, maxDays: e.target.value} : value)}))} placeholder="Không giới hạn" /></div>
                      <div><label className="text-[10px] font-bold text-muted">GIẢM %</label><input type="number" min="0" max="100" className={fieldCls + ' bg-white'} value={tier.discountPercent} onChange={e => setForm(prev => ({...prev, tiers: prev.tiers.map((value, i) => i === index ? {...value, discountPercent: e.target.value} : value)}))} /></div>
                      <IconButton onClick={() => setForm(prev => ({...prev, tiers: prev.tiers.filter((_, i) => i !== index)}))} ariaLabel="Xóa mốc" tone="danger"><TrashIcon size={14} /></IconButton>
                    </div>
                  ))}
                  <button type="button" onClick={() => setForm(prev => ({...prev, tiers: [...(prev.tiers || []), {minDays: '', maxDays: '', discountPercent: 0}]}))} className="btn-outline px-4 py-2 text-xs"><PlusIcon size={13} /> Thêm mốc giảm</button>
                </div>
              </FormField>
            </div>}
          </>}
          <div className="sm:col-span-2"><FormField label="Mô tả"><textarea className={fieldCls + ' h-24 resize-y'} value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} /></FormField></div>
          {isService && <>
            <div className="sm:col-span-2">
              <FormField label="Quyền lợi dịch vụ">
                <div className="space-y-3">
                  {(form.bulletPoints || ['']).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-card border border-border-light bg-bg-light p-2">
                      <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">{index + 1}</span>
                      <input
                        className={fieldCls + ' flex-1 bg-white'}
                        value={benefit}
                        onChange={e => setForm(prev => ({ ...prev, bulletPoints: prev.bulletPoints.map((value, i) => i === index ? e.target.value : value) }))}
                        placeholder={`Quyền lợi ${index + 1}`}
                      />
                      <IconButton
                        onClick={() => setForm(prev => ({ ...prev, bulletPoints: prev.bulletPoints.length === 1 ? [''] : prev.bulletPoints.filter((_, i) => i !== index) }))}
                        ariaLabel="Xóa quyền lợi"
                        tone="danger"
                      ><TrashIcon size={14} /></IconButton>
                    </div>
                  ))}
                  <button type="button" onClick={() => setForm(prev => ({ ...prev, bulletPoints: [...(prev.bulletPoints || []), ''] }))} className="btn-outline rounded-btn px-4 py-2 text-xs font-semibold flex items-center gap-1.5"><PlusIcon size={13} /> Thêm quyền lợi</button>
                </div>
              </FormField>
            </div>
            <div className="sm:col-span-2">
              <FormField label="Hình ảnh dịch vụ">
                <div className="space-y-3">
                  {(form.imageUrls || ['']).map((url, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-card border border-border-light bg-bg-light p-2">
                      <div className="w-14 h-14 rounded-btn border border-border-light bg-white overflow-hidden shrink-0 flex items-center justify-center">
                        {url ? <img src={url} alt={`Ảnh ${index + 1}`} className="w-full h-full object-cover" /> : <span className="text-[9px] text-muted">Ảnh {index + 1}</span>}
                      </div>
                      <input
                        className={fieldCls + ' flex-1 bg-white'}
                        value={url}
                        onChange={e => handleImageUrlChange(index, e.target.value)}
                        placeholder={`URL ảnh ${index + 1}`}
                        disabled={cloudifyingRows.includes(index)}
                      />
                      {cloudifyingRows.includes(index) && <span className="text-[10px] font-semibold text-primary whitespace-nowrap flex items-center gap-1"><span className="w-3 h-3 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /> Đang lưu</span>}
                      <IconButton
                        onClick={() => setForm(prev => ({ ...prev, imageUrls: prev.imageUrls.length === 1 ? [''] : prev.imageUrls.filter((_, i) => i !== index) }))}
                        ariaLabel="Xóa ảnh"
                        tone="danger"
                      ><TrashIcon size={14} /></IconButton>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => setForm(prev => ({ ...prev, imageUrls: [...(prev.imageUrls || []), ''] }))} className="btn-outline rounded-btn px-4 py-2 text-xs font-semibold flex items-center gap-1.5"><PlusIcon size={13} /> Thêm dòng URL</button>
                  </div>
                  <p className="text-[10px] text-muted">Dán URL ảnh để hệ thống tự lưu lên Cloudinary. Mỗi ảnh là một dòng riêng.</p>
                </div>
              </FormField>
            </div>
          </>}
          <label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={form.active !== false} onChange={e => setForm({...form, active: e.target.checked})} /> Hiển thị trên website</label>
        </div>
        <div className="flex gap-3 mt-6"><button onClick={() => setEditing(null)} className="flex-1 btn-outline py-2.5">Hủy</button><button onClick={save} disabled={saving} className="flex-1 btn-accent py-2.5 disabled:opacity-60">{saving ? 'Đang lưu...' : 'Lưu'}</button></div>
      </div>
    </div>}
  </>
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
      <Panel title="Danh sách bài viết tin tức & chia sẻ" icon={MegaphoneIcon}>
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
const MegaphoneIcon = ({ size = 16 }) => <img src="/megaphone.png" alt="" width={size} height={size} className="object-contain" />
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
