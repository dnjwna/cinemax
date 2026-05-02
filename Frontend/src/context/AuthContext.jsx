import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cinemax_token') || null)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cinemax_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (userData) => {
    const fakeToken = 'mock_token_' + Date.now()
    setToken(fakeToken)
    setUser(userData)
    localStorage.setItem('cinemax_token', fakeToken)
    localStorage.setItem('cinemax_user', JSON.stringify(userData))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('cinemax_token')
    localStorage.removeItem('cinemax_user')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
