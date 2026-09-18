/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useTrading } from "@/context/TradingContext"
import { Button } from "@/components/ui/button"
import { TrendingUp, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export const MarketHeader = () => {
  const { user, signOut, setIsAuthModalOpen } = useAuth()
  const { instruments, setSelectedSymbol, totalEquity } = useTrading()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Live Running Ticker Tape */}
      <div className="w-full bg-muted/30 border-b border-border/50 overflow-hidden py-1.5 px-4">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {instruments.concat(instruments).map((inst, index) => {
            const isPos = inst.changePercent >= 0
            return (
              <button
                key={`${inst.symbol}-${index}`}
                onClick={() => setSelectedSymbol(inst.symbol)}
                className="inline-flex items-center gap-2 text-xs font-medium hover:text-primary transition-colors cursor-pointer"
              >
                <span className="font-bold text-foreground">{inst.symbol}</span>
                <span className="font-mono text-muted-foreground">${inst.price}</span>
                <span
                  className={`text-[11px] font-bold ${
                    isPos ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {isPos ? "+" : ""}
                  {inst.changePercent}%
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary">
                Vyapar<span className="text-blue-500">ché</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border/80 px-1.5 py-0.5 rounded">
                Simulated Forex & Markets
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors font-semibold"
            >
              Live Terminal
            </Link>
            <Link
              href="/#features"
              className="px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Markets
            </Link>
            <Link
              href="/#paper-trading"
              className="px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Paper Engine
            </Link>
          </nav>
        </div>

        {/* User / Paper Balance summary */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-muted-foreground">Simulated Portfolio</div>
                <div className="text-sm font-bold font-mono text-emerald-500">
                  ${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {/* User Dropdown / Sign out */}
              <div className="flex items-center gap-2 pl-2 border-l border-border">
                {/* Avatar */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full border border-border bg-muted"
                />
                <div className="hidden lg:block text-left text-xs">
                  <div className="font-semibold truncate max-w-[120px]">{user.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                    {user.email}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={signOut}
                  title="Sign Out"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              className="h-9 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm"
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
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
