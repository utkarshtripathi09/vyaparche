"use client"

import React from "react"
import { useTrading } from "@/context/TradingContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Info, Gauge } from "lucide-react"

export const TechnicalFundamentalCard = () => {
  const { selectedInstrument } = useTrading()
  const { technical, fundamental, name, symbol } = selectedInstrument

  const getSignalBadgeColor = (sig: string) => {
    switch (sig) {
      case "Strong Buy":
      case "Buy":
        return "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
      case "Sell":
      case "Strong Sell":
        return "bg-rose-500/15 text-rose-500 border-rose-500/30"
      default:
        return "bg-amber-500/15 text-amber-500 border-amber-500/30"
    }
  }

  return (
    <Card className="shadow-md border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {symbol} Analysis & Research
            </CardTitle>
            <CardDescription>{name}</CardDescription>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSignalBadgeColor(
              technical.signal
            )}`}
          >
            Bias: {technical.signal}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="technical">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" /> Technicals
            </TabsTrigger>
            <TabsTrigger value="fundamental" className="flex items-center gap-2">
              <Info className="h-4 w-4" /> Fundamentals
            </TabsTrigger>
          </TabsList>

          {/* Technicals View */}
          <TabsContent value="technical" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <div className="text-xs text-muted-foreground">RSI (14)</div>
                <div className="text-lg font-bold flex items-center gap-1.5 mt-1">
                  {technical.rsi14}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      technical.rsiState === "Bullish" || technical.rsiState === "Overbought"
                        ? "text-emerald-500 bg-emerald-500/10"
                        : technical.rsiState === "Oversold" || technical.rsiState === "Bearish"
                        ? "text-rose-500 bg-rose-500/10"
                        : "text-muted-foreground bg-muted"
                    }`}
                  >
                    {technical.rsiState}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <div className="text-xs text-muted-foreground">MACD (12, 26, 9)</div>
                <div className="text-lg font-bold mt-1">
                  {technical.macd.macd}
                  <span className="text-xs text-muted-foreground ml-1.5 font-normal">
                    (Hist: {technical.macd.histogram})
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <div className="text-xs text-muted-foreground">20-Day SMA</div>
                <div className="text-lg font-bold mt-1">${technical.sma20}</div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <div className="text-xs text-muted-foreground">200-Day SMA</div>
                <div className="text-lg font-bold mt-1">${technical.sma200}</div>
              </div>
            </div>

            {/* Bollinger Bands summary */}
            <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Bollinger Bands (20, 2)
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">Upper Band:</span>
                  <span className="font-semibold text-rose-500">${technical.bollinger.upper}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Middle Band:</span>
                  <span className="font-semibold">${technical.bollinger.middle}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Lower Band:</span>
                  <span className="font-semibold text-emerald-500">${technical.bollinger.lower}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Fundamentals View */}
          <TabsContent value="fundamental" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {fundamental.marketCap && (
                <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="text-base font-bold mt-1">{fundamental.marketCap}</div>
                </div>
              )}
              {fundamental.aum && (
                <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                  <div className="text-xs text-muted-foreground">Total AUM</div>
                  <div className="text-base font-bold mt-1">{fundamental.aum}</div>
                </div>
              )}
              {fundamental.peRatio && (
                <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                  <div className="text-xs text-muted-foreground">P/E Ratio</div>
                  <div className="text-base font-bold mt-1">{fundamental.peRatio}</div>
                </div>
              )}
              {fundamental.expenseRatio && (
                <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                  <div className="text-xs text-muted-foreground">Expense Ratio</div>
                  <div className="text-base font-bold text-emerald-500 mt-1">
                    {fundamental.expenseRatio}
                  </div>
                </div>
              )}
              {fundamental.dividendYield && (
                <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                  <div className="text-xs text-muted-foreground">Dividend Yield</div>
                  <div className="text-base font-bold mt-1">{fundamental.dividendYield}</div>
                </div>
              )}
              {fundamental.beta && (
                <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                  <div className="text-xs text-muted-foreground">Beta (Volatility)</div>
                  <div className="text-base font-bold mt-1">{fundamental.beta}</div>
                </div>
              )}
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <div className="text-xs text-muted-foreground">52-Week Range</div>
                <div className="text-sm font-semibold mt-1">{fundamental.range52w}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <div className="text-xs text-muted-foreground">24h Volume</div>
                <div className="text-sm font-semibold mt-1">{fundamental.volume24h}</div>
              </div>
              {fundamental.sector && (
                <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                  <div className="text-xs text-muted-foreground">Sector / Industry</div>
                  <div className="text-sm font-semibold mt-1">{fundamental.sector}</div>
                </div>
              )}
            </div>

            <div className="p-3 rounded-lg bg-muted/20 border border-border/50 text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground block mb-1">Asset Profile:</span>
              {fundamental.description}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
