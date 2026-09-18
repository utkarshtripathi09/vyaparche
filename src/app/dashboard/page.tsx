"use client"

import React, { useState, useEffect } from "react"
import { Position, useTrading } from "@/context/TradingContext"
import { useAuth } from "@/context/AuthContext"
import { MarketHeader } from "@/components/layout/MarketHeader"
import { InstrumentSelector } from "@/components/trading/InstrumentSelector"
import { TradingViewWidget } from "@/components/trading/TradingViewWidget"
import { LightweightChart } from "@/components/trading/LightweightChart"
import { OrderCard } from "@/components/trading/OrderCard"
import { TechnicalFundamentalCard } from "@/components/trading/TechnicalFundamentalCard"
import { PositionsTable } from "@/components/trading/PositionsTable"
import { GoogleAuthModal } from "@/components/auth/GoogleAuthModal"
import { ChartTradeOverlay } from "@/components/trading/ChartTradeOverlay"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/context/ThemeContext"
import {
  Sparkles,
  TrendingUp,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function DashboardPage() {
  const { selectedInstrument, positions } = useTrading()
  const { user, setIsAuthModalOpen } = useAuth()
  const { theme } = useTheme()
  const [chartEngine, setChartEngine] = useState<"tradingview" | "native">("tradingview")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Order & Trades modal states
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [orderModalType, setOrderModalType] = useState<"BUY" | "SELL">("BUY")
  const [isFullscreenOrderOpen, setIsFullscreenOrderOpen] = useState(false)
  const [fullscreenOrderType, setFullscreenOrderType] = useState<"BUY" | "SELL">("BUY")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [positionToEdit, setPositionToEdit] = useState<Position | null>(null)

  // Listen for Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
        setIsFullscreenOrderOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen])

  // Trigger resize event so TradingView and canvas charts smoothly adapt
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 60)
    return () => clearTimeout(timer)
  }, [isFullscreen, isFullscreenOrderOpen])

  const handleOpenOrder = (type: "BUY" | "SELL") => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }
    if (isFullscreen) {
      if (isFullscreenOrderOpen && fullscreenOrderType === type) {
        setIsFullscreenOrderOpen(false)
      } else {
        setFullscreenOrderType(type)
        setIsFullscreenOrderOpen(true)
      }
    } else {
      setOrderModalType(type)
      setIsOrderModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <MarketHeader />
      <GoogleAuthModal />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-6 max-w-7xl">
        {/* Banner if not signed in */}
        {!user && (
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  You are exploring in Guest Mode
                </h4>
                <p className="text-xs text-muted-foreground">
                  Sign in with your Google account to get an instant{" "}
                  <span className="font-bold text-emerald-500">$100,000 USD</span> paper trading
                  balance and start executing real-time simulated trades.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs h-9 px-4"
            >
              Sign In with Gmail
            </Button>
          </div>
        )}

        {/* Market Category and Instrument Selection */}
        <InstrumentSelector />

        {/* Main Trading Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left / Center 2 Columns: Live Chart & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Container Card (supports full screen expansion) */}
            <div
              className={
                isFullscreen
                  ? "fixed inset-0 z-50 bg-background flex flex-col p-4 w-screen h-screen overflow-hidden animate-fade-in"
                  : "rounded-xl border border-border bg-card p-4 shadow-md space-y-4"
              }
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/60 shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight">{selectedInstrument.symbol}</h2>
                    <span className="text-xs px-2 py-0.5 rounded font-semibold uppercase bg-muted text-muted-foreground border border-border">
                      {selectedInstrument.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedInstrument.name}</p>
                </div>

                {/* Compact, Non-Overlapping Action Toolbar */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-right mr-1">
                    <div className="text-base sm:text-lg font-mono font-bold leading-tight">
                      ${selectedInstrument.price}
                    </div>
                    <div
                      className={`text-[11px] font-bold ${
                        selectedInstrument.changePercent >= 0 ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {selectedInstrument.changePercent >= 0 ? "+" : ""}
                      {selectedInstrument.changePercent}%
                    </div>
                  </div>

                  {/* Compact Quick Buy */}
                  <Button
                    size="sm"
                    onClick={() => handleOpenOrder("BUY")}
                    className={`h-7 px-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1 transition-all ${
                      isFullscreen && isFullscreenOrderOpen && fullscreenOrderType === "BUY"
                        ? "ring-2 ring-emerald-400 ring-offset-1 ring-offset-background font-black"
                        : ""
                    }`}
                  >
                    <ArrowUpRight className="h-3 w-3" />
                    Buy
                  </Button>

                  {/* Compact Quick Sell */}
                  <Button
                    size="sm"
                    onClick={() => handleOpenOrder("SELL")}
                    className={`h-7 px-2.5 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-sm flex items-center gap-1 transition-all ${
                      isFullscreen && isFullscreenOrderOpen && fullscreenOrderType === "SELL"
                        ? "ring-2 ring-rose-400 ring-offset-1 ring-offset-background font-black"
                        : ""
                    }`}
                  >
                    <ArrowDownRight className="h-3 w-3" />
                    Sell
                  </Button>

                  {/* Trades Dock Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    className="h-7 px-2 text-xs border-border bg-background hover:bg-muted text-foreground flex items-center gap-1"
                  >
                    <TrendingUp className="h-3 w-3 text-blue-500" />
                    <span>Trades ({positions.length})</span>
                  </Button>

                  {/* Chart Engine Switcher */}
                  <Tabs value={chartEngine} onValueChange={(v) => setChartEngine(v as "tradingview" | "native")}>
                    <TabsList className="h-7">
                      <TabsTrigger value="tradingview" className="text-[11px] px-2 h-5">
                        TradingView
                      </TabsTrigger>
                      <TabsTrigger value="native" className="text-[11px] px-2 h-5">
                        Interactive
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Fullscreen Toggle Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const next = !isFullscreen
                      setIsFullscreen(next)
                      if (!next) {
                        setIsFullscreenOrderOpen(false)
                      }
                    }}
                    className="h-7 px-2 text-xs flex items-center gap-1 border-border hover:bg-muted font-medium"
                    title={isFullscreen ? "Exit Fullscreen (Esc)" : "Expand to Fullscreen"}
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Exit</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Fullscreen</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Chart Area with On-Chart Trade Overlay and Fullscreen Order Panel */}
              <div
                className={`w-full relative ${
                  isFullscreen
                    ? "flex-1 min-h-0 flex flex-row gap-4 overflow-hidden"
                    : "h-[520px]"
                }`}
              >
                {/* Main Chart Column */}
                <div className="flex-1 min-w-0 h-full relative">
                  {/* On-Chart Live Positions Badge & Drawers */}
                  <ChartTradeOverlay
                    isFullscreen={isFullscreen}
                    isOrderModalOpen={isOrderModalOpen}
                    setIsOrderModalOpen={setIsOrderModalOpen}
                    orderModalType={orderModalType}
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                    positionToEdit={positionToEdit}
                    setPositionToEdit={setPositionToEdit}
                  />

                  {chartEngine === "tradingview" ? (
                    <TradingViewWidget
                      symbol={selectedInstrument.tradingViewSymbol}
                      theme={theme}
                      className="h-full w-full"
                    />
                  ) : (
                    <LightweightChart
                      instrument={selectedInstrument}
                      className="h-full w-full"
                    />
                  )}
                </div>

                {/* Fullscreen Order Execution Card */}
                {isFullscreen && isFullscreenOrderOpen && (
                  <div className="max-sm:absolute max-sm:inset-0 max-sm:z-30 w-full sm:w-96 shrink-0 h-full overflow-y-auto animate-in slide-in-from-right duration-200">
                    <OrderCard
                      initialType={fullscreenOrderType}
                      externalOrderType={fullscreenOrderType}
                      onOrderTypeChange={setFullscreenOrderType}
                      onClose={() => setIsFullscreenOrderOpen(false)}
                      isSidePanel={true}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Technical & Fundamental Analysis Card */}
            <TechnicalFundamentalCard />

            {/* Positions and Orders Table */}
            <PositionsTable />
          </div>

          {/* Right Column: Order Entry & Portfolio Quick View */}
          <div className="space-y-6">
            <OrderCard />

            {/* Market Quick Overview Card */}
            <Card className="shadow-md border border-border">
              <CardContent className="pt-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Market Conditions
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Exchange Status</span>
                    <span className="font-semibold text-emerald-500 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live (Paper Stream)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Execution Model</span>
                    <span className="font-semibold">Instant Simulated ECN</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Latency</span>
                    <span className="font-mono text-muted-foreground">~12ms</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Slippage Tolerance</span>
                    <span className="font-mono text-muted-foreground">0.05%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
