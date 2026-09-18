"use client"

import React from "react"
import { useTrading } from "@/context/TradingContext"
import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Briefcase, History, XCircle } from "lucide-react"

export const PositionsTable = () => {
  const { positions, history, closePosition, totalUnrealizedPnl } = useTrading()
  const { user } = useAuth()

  return (
    <Card className="shadow-md border border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Paper Portfolio & Orders
            </CardTitle>
            <CardDescription>
              Monitor open positions and closed trade history in real-time
            </CardDescription>
          </div>
          {positions.length > 0 && (
            <div className="text-sm font-semibold flex items-center gap-1.5">
              <span>Unrealized P&L:</span>
              <span
                className={
                  totalUnrealizedPnl >= 0 ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"
                }
              >
                {totalUnrealizedPnl >= 0 ? "+" : ""}$
                {totalUnrealizedPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="positions">
          <TabsList className="mb-4">
            <TabsTrigger value="positions" className="flex items-center gap-1.5">
              Open Positions ({positions.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1.5">
              <History className="h-4 w-4" /> Trade History ({history.length})
            </TabsTrigger>
          </TabsList>

          {/* Open Positions */}
          <TabsContent value="positions">
            {!user ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Sign in with your Google account to start paper trading and track active positions.
              </div>
            ) : positions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg">
                No active positions. Select an instrument above and execute a Buy or Sell order!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground pb-2">
                      <th className="pb-2 font-medium">Instrument</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Size</th>
                      <th className="pb-2 font-medium">Entry Price</th>
                      <th className="pb-2 font-medium">Mark Price</th>
                      <th className="pb-2 font-medium">Margin</th>
                      <th className="pb-2 font-medium">P&L ($ / %)</th>
                      <th className="pb-2 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {positions.map((pos) => {
                      const isProfit = pos.unrealizedPnl >= 0
                      return (
                        <tr key={pos.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 font-semibold text-foreground">
                            <div>{pos.symbol}</div>
                            <div className="text-[10px] text-muted-foreground font-normal">
                              {pos.openedAt}
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold ${
                                pos.type === "BUY"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : "bg-rose-500/10 text-rose-500"
                              }`}
                            >
                              {pos.type === "BUY" ? (
                                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-0.5" />
                              )}
                              {pos.type} {pos.leverage}x
                            </span>
                          </td>
                          <td className="py-3">{pos.quantity}</td>
                          <td className="py-3 font-mono">${pos.entryPrice}</td>
                          <td className="py-3 font-mono">${pos.currentPrice}</td>
                          <td className="py-3 font-mono">${pos.marginRequired.toLocaleString()}</td>
                          <td className="py-3 font-mono">
                            <div className={`font-bold ${isProfit ? "text-emerald-500" : "text-rose-500"}`}>
                              {isProfit ? "+" : ""}${pos.unrealizedPnl.toFixed(2)}
                            </div>
                            <div className={`text-[10px] ${isProfit ? "text-emerald-500" : "text-rose-500"}`}>
                              ({isProfit ? "+" : ""}{pos.unrealizedPnlPercent.toFixed(2)}%)
                            </div>
                          </td>
                          <td className="py-3 text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => closePosition(pos.id)}
                              className="h-7 text-xs border-border hover:bg-rose-500 hover:text-white transition-colors"
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" /> Close
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* Trade History */}
          <TabsContent value="history">
            {history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg">
                No trade history yet. Positions you close will appear here with realized performance.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground pb-2">
                      <th className="pb-2 font-medium">Instrument</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Size</th>
                      <th className="pb-2 font-medium">Entry</th>
                      <th className="pb-2 font-medium">Exit</th>
                      <th className="pb-2 font-medium">Realized P&L</th>
                      <th className="pb-2 font-medium text-right">Closed Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {history.map((hist) => {
                      const isProfit = hist.realizedPnl >= 0
                      return (
                        <tr key={hist.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 font-semibold text-foreground">{hist.symbol}</td>
                          <td className="py-3">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                                hist.type === "BUY"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : "bg-rose-500/10 text-rose-500"
                              }`}
                            >
                              {hist.type}
                            </span>
                          </td>
                          <td className="py-3">{hist.quantity}</td>
                          <td className="py-3 font-mono">${hist.entryPrice}</td>
                          <td className="py-3 font-mono">${hist.closePrice}</td>
                          <td className="py-3 font-mono">
                            <span className={`font-bold ${isProfit ? "text-emerald-500" : "text-rose-500"}`}>
                              {isProfit ? "+" : ""}${hist.realizedPnl.toFixed(2)} ({isProfit ? "+" : ""}{hist.realizedPnlPercent.toFixed(2)}%)
                            </span>
                          </td>
                          <td className="py-3 text-right text-muted-foreground">{hist.closedAt}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
