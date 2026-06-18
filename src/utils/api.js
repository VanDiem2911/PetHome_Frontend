// API Utility — Pet's Home
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// ── Newsletter API ──
export const subscribeNewsletter = async (email) => {
  const response = await fetch(`${API_BASE_URL}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!response.ok) throw new Error('Newsletter subscription failed')
  return response.json()
}

// ── Appointments API ──
export const bookAppointment = async (appointmentData) => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData),
  })
  if (!response.ok) throw new Error('Failed to book appointment')
  return response.json()
}

export const fetchBookedSlots = async (date, serviceType = 'grooming') => {
  if (!date) return []
  const params = new URLSearchParams({ date, serviceType })
  const response = await fetch(`${API_BASE_URL}/appointments/booked-slots?${params}`)
  if (!response.ok) throw new Error('Failed to fetch booked slots')
  return response.json() // returns string[]
}

export const trackAppointments = async (phone) => {
  const params = new URLSearchParams({ phone })
  const response = await fetch(`${API_BASE_URL}/appointments/track?${params}`)
  if (!response.ok) throw new Error('Không thể tra cứu lịch hẹn')
  return response.json()
}

// ── Contacts API ──
export const submitContact = async (contactData) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  })
  if (!response.ok) throw new Error('Failed to submit contact')
  return response.json()
}

// ── News API ──
export const fetchNews = async () => {
  const response = await fetch(`${API_BASE_URL}/news`)
  if (!response.ok) throw new Error('Failed to fetch news')
  return response.json()
}
