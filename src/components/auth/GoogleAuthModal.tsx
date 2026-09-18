"use client"

import React, { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, ShieldCheck, Sparkles } from "lucide-react"

export const GoogleAuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, signInWithGoogle } = useAuth()
  const [customEmail, setCustomEmail] = useState("")
  const [customName, setCustomName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isAuthModalOpen) return null

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customEmail) return
    setIsSubmitting(true)
    setTimeout(async () => {
      await signInWithGoogle(customEmail, customName || customEmail.split("@")[0])
      setIsSubmitting(false)
    }, 600)
  }

  const handleQuickGoogle = async () => {
    setIsSubmitting(true)
    setTimeout(async () => {
      await signInWithGoogle("alex.trader@gmail.com", "Alex Morgan (Demo)")
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl transition-all">
        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-6 w-6 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome to Vyaparché</h2>
          <p className="text-sm text-muted-foreground">
            Sign in with your Google account to receive your <span className="font-semibold text-emerald-500">$100,000</span> virtual paper trading portfolio.
          </p>
        </div>

        {/* Fast Google Auth button */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleQuickGoogle}
            disabled={isSubmitting}
            className="w-full h-12 text-sm font-semibold flex items-center justify-center gap-3 border border-border bg-background hover:bg-muted/60 transition-colors shadow-sm"
          >
            {/* Real Google SVG Icon */}
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google One-Tap
          </Button>

          <div className="relative flex items-center justify-center text-xs uppercase text-muted-foreground my-2">
            <span className="w-full border-t border-border" />
            <span className="bg-card px-2 font-medium">Or enter your Gmail</span>
            <span className="w-full border-t border-border" />
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div className="space-y-1 text-left">
              <Label htmlFor="customEmail" className="text-xs">Your Gmail Address</Label>
              <Input
                id="customEmail"
                type="email"
                placeholder="trader@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-1 text-left">
              <Label htmlFor="customName" className="text-xs">Display Name (Optional)</Label>
              <Input
                id="customName"
                type="text"
                placeholder="Warren B."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="h-10"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-primary text-primary-foreground font-medium hover:bg-primary/90"
            >
              {isSubmitting ? "Connecting to Vyaparché..." : "Sign In & Claim $100K Paper Cash"}
            </Button>
          </form>
        </div>

        {/* Guarantee footer */}
        <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>100% Risk-Free Simulated Market Environment</span>
        </div>
      </div>
    </div>
  )
}
