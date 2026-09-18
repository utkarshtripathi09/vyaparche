"use client"

import React from "react"
import { ThemeProvider } from "@/context/ThemeContext"
import { AuthProvider } from "@/context/AuthContext"
import { TradingProvider } from "@/context/TradingContext"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TradingProvider>
          {children}
        </TradingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
