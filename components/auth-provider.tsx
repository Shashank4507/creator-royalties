"use client"

import { createContext, useContext } from 'react'
import { useContracts } from '@/hooks/useContracts'

// Create a context that will be compatible with existing auth usage
const AuthContext = createContext<{
  isAuthenticated: boolean
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, address, connect, disconnect } = useContracts()

  // Map wallet connection state to auth state for compatibility
  const auth = {
    isAuthenticated: isConnected,
    user: address ? { address } : null,
    login: async () => {
      await connect() // Connect wallet instead of email login
    },
    logout: () => {
      disconnect() // Disconnect wallet
    },
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
} 