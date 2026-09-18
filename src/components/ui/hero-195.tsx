/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { ArrowRight, BarChart3, LineChart, Globe, Shield, Zap, Sparkles } from "lucide-react"

export const Hero195 = () => {
  const { user, setIsAuthModalOpen } = useAuth()

  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Background glow decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
            Real-Time Paper Trading & Multi-Asset Intelligence
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl max-w-5xl">
            Simulate the Global Markets with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Vyaparché
            </span>
          </h1>

          <p className="max-w-[44rem] leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            Trade Forex, Stocks, Crude Oil, Commodities, and Mutual Funds risk-free.
            Sign in with your Gmail to claim your <span className="font-semibold text-emerald-400">$100,000 USD</span> virtual
            portfolio, complete with live TradingView candlestick charts, technical indicators, and deep fundamental data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            {user ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="h-12 px-8 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25">
                  Launch Paper Terminal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={() => setIsAuthModalOpen(true)}
                className="h-12 px-8 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#ffffff"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#ffffff"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#ffffff"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#ffffff"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign In with Google
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}

            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-12 px-8 w-full border-border bg-card/80 hover:bg-muted font-semibold">
                Explore Live Terminal
              </Button>
            </Link>
          </div>

          {/* Value props badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-400" /> $100K Zero-Risk Capital
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-400" /> Instant Execution & Leverage
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-purple-400" /> Real TradingView Engine
            </span>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mx-auto mt-14 max-w-5xl relative rounded-2xl border border-border/80 bg-card p-2 sm:p-3 shadow-2xl backdrop-blur-sm">
          <div className="relative rounded-xl overflow-hidden bg-muted/30 border border-border/60">
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
              alt="Trading Terminal Dashboard Mockup"
              className="w-full h-[360px] sm:h-[480px] object-cover opacity-80 mix-blend-luminosity filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                    Active Multi-Asset Terminal
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">
                    EUR/USD • Crude Oil WTI • NVIDIA • S&P 500
                  </div>
                </div>
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md">
                    Open Trading Room
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2.5 bg-background/60 backdrop-blur-md px-3 py-2 rounded-lg border border-border/40">
                  <Globe className="h-5 w-5 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Forex Markets</div>
                    <div className="text-[10px] text-muted-foreground">EUR/USD, GBP/USD, USD/JPY</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-background/60 backdrop-blur-md px-3 py-2 rounded-lg border border-border/40">
                  <BarChart3 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Stocks</div>
                    <div className="text-[10px] text-muted-foreground">NVDA, AAPL, TSLA, MSFT</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-background/60 backdrop-blur-md px-3 py-2 rounded-lg border border-border/40">
                  <LineChart className="h-5 w-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Crude & Metals</div>
                    <div className="text-[10px] text-muted-foreground">WTI Oil, Brent, Gold, Silver</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-background/60 backdrop-blur-md px-3 py-2 rounded-lg border border-border/40">
                  <span className="text-lg font-bold text-purple-400 shrink-0">∑</span>
                  <div>
                    <div className="text-xs font-bold">Mutual Funds</div>
                    <div className="text-[10px] text-muted-foreground">SPY, VOO, QQQ, VTI</div>
                  </div>
                </div>
              </div>
            </div>
            {/* The BorderBeam dependency animated border effect */}
            <BorderBeam size={340} duration={14} delay={0} colorFrom="#3b82f6" colorTo="#8b5cf6" />
          </div>
        </div>
      </div>
    </section>
  )
}
