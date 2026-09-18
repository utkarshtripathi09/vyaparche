"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { MarketHeader } from "@/components/layout/MarketHeader"
import { GoogleAuthModal } from "@/components/auth/GoogleAuthModal"
import { Hero195 } from "@/components/ui/hero-195"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Globe,
  BarChart3,
  LineChart,
  PieChart,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Activity,
} from "lucide-react"

export default function Home() {
  const { user, setIsAuthModalOpen } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <MarketHeader />
      <GoogleAuthModal />

      {/* Hero Section */}
      <Hero195 />

      {/* Features Overview Grid */}
      <section id="features" className="py-20 border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500">
              Institutional-Grade Intelligence
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              One Unified Terminal for All Major Asset Classes
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Whether you are scalping EUR/USD, swinging NVIDIA shares, hedging WTI Crude, or analyzing long-term index funds, Vyaparché equips you with professional market data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Forex */}
            <Card className="border border-border/80 bg-card hover:border-blue-500/50 transition-all hover:shadow-lg">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Globe className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Real-Time Forex</CardTitle>
                <CardDescription>
                  Trade EUR/USD, GBP/USD, USD/JPY with real-time bid/ask spreads, flexible lot sizes, and up to 50x simulated leverage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Micro-pips bid/ask quotes
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Custom leverage ratios
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 2: Stocks */}
            <Card className="border border-border/80 bg-card hover:border-indigo-500/50 transition-all hover:shadow-lg">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Global Equities</CardTitle>
                <CardDescription>
                  Access NASDAQ & NYSE high-beta leaders like NVDA, AAPL, TSLA, and MSFT with financial ratios and analyst consensus.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    P/E, Forward P/E, EPS metrics
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Market Cap & 52-Week ranges
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 3: Commodities & Crude */}
            <Card className="border border-border/80 bg-card hover:border-amber-500/50 transition-all hover:shadow-lg">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <LineChart className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Crude Oil & Metals</CardTitle>
                <CardDescription>
                  Monitor energy geopolitics and macro inflation hedging with WTI Crude, Brent Crude, Spot Gold (XAU), and Silver.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    WTI & Brent energy contracts
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Spot Gold safe-haven pricing
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 4: Mutual Funds & ETFs */}
            <Card className="border border-border/80 bg-card hover:border-emerald-500/50 transition-all hover:shadow-lg">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <PieChart className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Mutual Funds & ETFs</CardTitle>
                <CardDescription>
                  Build a diversified long-term core with SPDR S&P 500 (SPY), Vanguard S&P (VOO), and Invesco QQQ.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Expense Ratios & Total AUM
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Dividend yield calculations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical & Fundamental Analysis Section */}
      <section className="py-20 bg-background border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
                <Activity className="h-4 w-4" /> Technical & Fundamental Engine
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Make Data-Driven Trades With Zero Emotion
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Vyaparché computes algorithmic indicators in real time: Relative Strength Index (RSI 14), Moving Average Convergence Divergence (MACD), 20/50/200 Day Simple Moving Averages, and Volatility Bollinger Bands.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold">Automated Bias Scoring</h5>
                    <p className="text-xs text-muted-foreground">
                      Instantly assess whether an asset is in Strong Buy, Neutral, or Strong Sell territory based on multi-timeframe indicator alignment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold">Mark-To-Market Position Engine</h5>
                    <p className="text-xs text-muted-foreground">
                      Track floating unrealized P&L in real time as prices tick, and close positions at true simulated market value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/dashboard">
                  <Button className="h-11 px-6 font-semibold bg-blue-600 hover:bg-blue-500 text-white">
                    Explore Technical Signals <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Graphic Showcase */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                    NVDA
                  </div>
                  <div>
                    <div className="font-bold text-sm">NVIDIA Corporation</div>
                    <div className="text-xs text-muted-foreground">Technicals: Strong Buy</div>
                  </div>
                </div>
                <span className="font-mono text-emerald-500 font-bold">$129.40 (+2.05%)</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                  <div className="text-muted-foreground">RSI (14)</div>
                  <div className="text-base font-bold text-foreground mt-1">67.4 (Bullish)</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                  <div className="text-muted-foreground">MACD Histogram</div>
                  <div className="text-base font-bold text-emerald-500 mt-1">+0.47</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                  <div className="text-muted-foreground">P/E Ratio</div>
                  <div className="text-base font-bold text-foreground mt-1">68.4</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                  <div className="text-muted-foreground">52-Week Range</div>
                  <div className="text-base font-bold text-foreground mt-1">$39 - $140</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 flex items-center justify-between">
                <span>Try placing a test order with virtual funds</span>
                <span className="font-semibold underline cursor-pointer" onClick={() => setIsAuthModalOpen(true)}>
                  Sign In with Gmail →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="paper-trading" className="py-20 border-t border-border/60 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-6">
          <div className="h-14 w-14 rounded-2xl bg-blue-600/20 text-blue-500 mx-auto flex items-center justify-center border border-blue-500/30">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Claim Your $100,000 Paper Trading Account
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Zero financial deposit required. Test your trading edge across foreign exchange, crude oil, and top equities with complete peace of mind.
          </p>

          <div className="pt-2">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25">
                  Enter Trading Terminal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={() => setIsAuthModalOpen(true)}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/25 flex items-center gap-2 mx-auto"
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
                Sign In with Google to Start Trading
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-xs text-muted-foreground space-y-2">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-500" />
          <span className="font-bold text-foreground">Vyaparché</span> — Real-Time Paper Trading & Market Analytics
        </div>
        <p className="max-w-xl mx-auto px-4">
          Disclaimer: Vyaparché is a simulated paper trading simulation platform designed exclusively for educational and analytical research. No real currency is deposited, traded, or at risk.
        </p>
      </footer>
    </div>
  )
}
