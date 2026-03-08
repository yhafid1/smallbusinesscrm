import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const signIn = async (email, password) => {
    if (email && password) {
      setUser({ email, id: 'demo-user' })
      return { error: null }
    }
    return { error: { message: 'Please enter an email and password.' } }
  }

  const signOut = async () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
