"use client"

import React, { useEffect, useRef, useState, memo } from "react"
import { useTheme } from "@/context/ThemeContext"
import { Loader2 } from "lucide-react"

interface TradingViewWidgetProps {
  symbol: string
  theme?: "dark" | "light"
  className?: string
}

export const TradingViewWidget = memo(({ symbol, theme: propTheme, className }: TradingViewWidgetProps) => {
  const { theme: contextTheme } = useTheme()
  const activeTheme = propTheme || contextTheme || "dark"
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    setLoading(true)
    container.innerHTML = ""

    const widgetDiv = document.createElement("div")
    widgetDiv.className = "tradingview-widget-container__widget"
    widgetDiv.style.height = "100%"
    widgetDiv.style.width = "100%"
    container.appendChild(widgetDiv)

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "15",
      timezone: "Etc/UTC",
      theme: activeTheme,
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      withdateranges: true,
      hide_side_toolbar: false, // Enables instruments: Trendlines, Fibonacci, Horizontal lines, Brushes, Ruler, etc.
      hide_top_toolbar: false,
      save_image: true,
      calendar: false,
      support_host: "https://www.tradingview.com"
    })

    script.onload = () => {
      setTimeout(() => setLoading(false), 500)
    }

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    container.appendChild(script)

    return () => {
      clearTimeout(timer)
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [symbol, activeTheme])

  return (
    <div
      className={`relative w-full ${
        className || "h-[520px]"
      } rounded-xl overflow-hidden border border-border bg-card shadow-inner`}
    >
      {/* Loading state indicator */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/90 backdrop-blur-sm z-10 space-y-3 pointer-events-none transition-opacity duration-300">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground font-medium">
            Loading Real-Time {symbol} Chart with Technical Drawing Tools...
          </p>
        </div>
      )}

      {/* Advanced Chart Widget Container */}
      <div
        ref={containerRef}
        className="tradingview-widget-container w-full h-full"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  )
})

TradingViewWidget.displayName = "TradingViewWidget"
