"use client"

import React, { useState } from "react"
import { useTheme } from "@/context/ThemeContext"
import { Loader2, ExternalLink } from "lucide-react"

interface TradingViewWidgetProps {
  symbol: string
  theme?: "dark" | "light"
  className?: string
}

export const TradingViewWidget = ({ symbol, theme: propTheme, className }: TradingViewWidgetProps) => {
  const { theme: contextTheme } = useTheme()
  const activeTheme = propTheme || contextTheme || "dark"
  const [loading, setLoading] = useState(true)

  // Construct official TradingView embed URL
  const iframeSrc = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(
    symbol
  )}&interval=15&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=${
    activeTheme === "dark" ? "1e293b" : "f1f5f9"
  }&studies=%5B%22STD%3BRSI%22%2C%22STD%3BMACD%22%5D&theme=${activeTheme}&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en`

  return (
    <div
      className={`relative w-full ${
        className || "h-[520px]"
      } rounded-xl overflow-hidden border border-border bg-card shadow-inner`}
    >
      {/* Loading state indicator */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10 space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground font-medium">
            Loading Real-Time {symbol} Chart from TradingView...
          </p>
        </div>
      )}

      {/* Embedded TradingView Interactive Chart */}
      <iframe
        key={`${symbol}-${activeTheme}`}
        src={iframeSrc}
        title={`TradingView Chart for ${symbol}`}
        className="w-full h-full border-0"
        onLoad={() => setLoading(false)}
        allow="clipboard-write"
      />

      {/* Bottom quick brand attribution */}
      <div className="absolute bottom-1 right-2 z-20 pointer-events-auto">
        <a
          href={`https://www.tradingview.com/symbols/${encodeURIComponent(symbol)}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground/60 hover:text-muted-foreground flex items-center gap-0.5 bg-background/80 px-1.5 py-0.5 rounded backdrop-blur"
        >
          <span>TradingView</span>
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>
    </div>
  )
}
