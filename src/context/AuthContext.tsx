"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  paperBalance: number
  initialBalance: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: (email?: string, name?: string) => Promise<void>
  signOut: () => void
  resetPaperBalance: () => void
  updatePaperBalance: (delta: number) => void
  isAuthModalOpen: boolean
  setIsAuthModalOpen: (open: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEFAULT_BALANCE = 100000 // $100,000 USD virtual paper trading account

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vyaparche_user") || localStorage.getItem("equityiq_user")
      if (saved) {
        setUser(JSON.parse(saved))
      }
    } catch (e) {
      console.error("Failed to load user session", e)
    } finally {
      setLoading(false)
    }
  }, [])

  const signInWithGoogle = async (customEmail?: string, customName?: string) => {
    const email = customEmail || "alex.morgan.trader@gmail.com"
    const name = customName || "Alex Morgan"
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`

    const existingBalance = user ? user.paperBalance : DEFAULT_BALANCE
    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name,
      email,
      avatar,
      paperBalance: existingBalance,
      initialBalance: DEFAULT_BALANCE,
    }

    setUser(newUser)
    localStorage.setItem("vyaparche_user", JSON.stringify(newUser))
    localStorage.setItem("equityiq_user", JSON.stringify(newUser))
    setIsAuthModalOpen(false)
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("vyaparche_user")
    localStorage.removeItem("equityiq_user")
  }

  const resetPaperBalance = () => {
    if (!user) return
    const updated = { ...user, paperBalance: DEFAULT_BALANCE }
    setUser(updated)
    localStorage.setItem("vyaparche_user", JSON.stringify(updated))
    localStorage.setItem("equityiq_user", JSON.stringify(updated))
  }

  const updatePaperBalance = (delta: number) => {
    if (!user) return
    const updated = { ...user, paperBalance: Math.max(0, user.paperBalance + delta) }
    setUser(updated)
    localStorage.setItem("vyaparche_user", JSON.stringify(updated))
    localStorage.setItem("equityiq_user", JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut,
        resetPaperBalance,
        updatePaperBalance,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
