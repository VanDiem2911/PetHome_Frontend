// AdminAuthContext — Pet's Home Admin
import { createContext, useContext, useState, useCallback } from 'react'

const configuredApiUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api')
  .replace(/\/+$/, '')
const API_BASE_URL = configuredApiUrl.endsWith('/api')
  ? configuredApiUrl
  : `${configuredApiUrl}/api`
const API = `${API_BASE_URL}/admin`

const AdminAuthContext = createContext(null)

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null)
  const [loginError, setLoginError] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (username, password) => {
    setLoading(true)
    setLoginError(null)
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Sai tài khoản hoặc mật khẩu')
      }
      const { token: t } = await res.json()
      setToken(t)
      localStorage.setItem('admin_token', t)
      return true
    } catch (e) {
      setLoginError(e.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    if (token) {
      await fetch(`${API}/logout`, {
        method: 'POST',
        headers: { 'X-Admin-Token': token },
      }).catch(() => {})
    }
    setToken(null)
    localStorage.removeItem('admin_token')
  }, [token])

  const authFetch = useCallback(async (path, options = {}) => {
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': token || '',
        ...(options.headers || {}),
      },
    })
    if (res.status === 401) { logout(); throw new Error('Phiên đăng nhập hết hạn') }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      const msg = err.message || err.error || `Lỗi ${res.status}`
      console.error('API Error Response:', err)
      throw new Error(msg)
    }
    if (res.status === 204) return null
    return res.json()
  }, [token, logout])

  return (
    <AdminAuthContext.Provider value={{ token, login, logout, authFetch, loginError, loading, isAdmin: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminAuthContext)
