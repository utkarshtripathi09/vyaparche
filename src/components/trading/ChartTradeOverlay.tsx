"use client"

import React from "react"
import { Position, useTrading } from "@/context/TradingContext"
import { OrderCard } from "./OrderCard"
import { ModifyPositionModal } from "./ModifyPositionModal"
import {
  ArrowUpRight,
  ArrowDownRight,
  XCircle,
  History,
  SlidersHorizontal,
} from "lucide-react"

interface ChartTradeOverlayProps {
  isFullscreen?: boolean
  isOrderModalOpen: boolean
  setIsOrderModalOpen: (open: boolean) => void
  orderModalType: "BUY" | "SELL"
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
  positionToEdit: Position | null
  setPositionToEdit: (pos: Position | null) => void
}

export const ChartTradeOverlay = ({
  isFullscreen = false,
  isOrderModalOpen,
  setIsOrderModalOpen,
  orderModalType,
  isDrawerOpen,
  setIsDrawerOpen,
  positionToEdit,
  setPositionToEdit,
}: ChartTradeOverlayProps) => {
  const { selectedInstrument, positions, history, closePosition } = useTrading()
  const [activeTab, setActiveTab] = React.useState<"positions" | "history">("positions")

  // Filter positions for current selected instrument
  const currentSymbolPositions = positions.filter((p) => p.symbol === selectedInstrument.symbol)

  return (
    <>
      {/* On-Chart Comprehensive Order Execution Modal (when opened outside fullscreen) */}
      {!isFullscreen && isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in pointer-events-auto">
          <div className="relative w-full max-w-md">
            <OrderCard
              initialType={orderModalType}
              onClose={() => setIsOrderModalOpen(false)}
              isSidePanel={true}
            />
          </div>
        </div>
      )}

      {/* Modify Existing Position Modal */}
      <ModifyPositionModal
        position={positionToEdit}
        onClose={() => setPositionToEdit(null)}
      />

      {/* Floating Active Positions Badges - Positioned at bottom-left to NEVER collide with TradingView top toolbar */}
      {currentSymbolPositions.length > 0 && (
        <div
          className={`absolute bottom-3 left-3 pointer-events-auto z-20 flex flex-wrap items-center gap-2 max-w-[85%] ${
            isFullscreen ? "bottom-4 left-4" : ""
          }`}
        >
          {currentSymbolPositions.map((pos) => {
            const isProfit = pos.unrealizedPnl >= 0
            return (
              <div
                key={pos.id}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px] font-medium shadow-lg backdrop-blur-md animate-fade-in ${
                  pos.type === "BUY"
                    ? "bg-emerald-950/85 border-emerald-500/60 text-emerald-300"
                    : "bg-rose-950/85 border-rose-500/60 text-rose-300"
                }`}
              >
                <span
                  className={`inline-flex items-center font-bold px-1 py-0.5 rounded text-[10px] ${
                    pos.type === "BUY"
                      ? "bg-emerald-500 text-white"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {pos.type === "BUY" ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  )}
                  {pos.type} {pos.quantity}
                </span>

                <span className="font-mono text-[11px]">
                  ${pos.entryPrice}
                </span>

                <span
                  className={`font-mono font-bold ${
                    isProfit ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {isProfit ? "+" : ""}${pos.unrealizedPnl.toFixed(2)} ({isProfit ? "+" : ""}
                  {pos.unrealizedPnlPercent.toFixed(2)}%)
                </span>

                {/* Edit SL/TP button */}
                <button
                  onClick={() => setPositionToEdit(pos)}
                  title="Modify Stop Loss & Take Profit"
                  className="p-1 rounded hover:bg-white/20 text-white transition-colors"
                >
                  <SlidersHorizontal className="h-3 w-3" />
                </button>

                {/* Close button */}
                <button
                  onClick={() => closePosition(pos.id)}
                  title="Close position at market price"
                  className="p-0.5 rounded hover:bg-white/20 text-white transition-colors"
                >
                  <XCircle className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Collapsible Trades Drawer Overlay (Opens when clicking Trades (N) in header) */}
      {isDrawerOpen && (
        <div className="absolute inset-x-3 top-3 z-30 pointer-events-auto bg-card/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-2xl animate-fade-in max-h-72 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("positions")}
                className={`text-xs font-bold transition-colors pb-0.5 ${
                  activeTab === "positions"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Open Positions ({positions.length})
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`text-xs font-bold transition-colors pb-0.5 flex items-center gap-1 ${
                  activeTab === "history"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <History className="h-3.5 w-3.5" />
                Trade History ({history.length})
              </button>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground font-medium"
            >
              ✕ Close Dock
            </button>
          </div>

          {activeTab === "positions" ? (
            positions.length === 0 ? (
              <div className="text-center py-4 text-xs text-muted-foreground">
                No active positions. Click Buy or Sell to configure and place an order.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="pb-1.5 font-medium">Symbol</th>
                      <th className="pb-1.5 font-medium">Type</th>
                      <th className="pb-1.5 font-medium">Qty</th>
                      <th className="pb-1.5 font-medium">Entry</th>
                      <th className="pb-1.5 font-medium">Current</th>
                      <th className="pb-1.5 font-medium">P&L</th>
                      <th className="pb-1.5 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {positions.map((pos) => {
                      const isProfit = pos.unrealizedPnl >= 0
                      return (
                        <tr key={pos.id} className="hover:bg-muted/30">
                          <td className="py-2 font-bold">{pos.symbol}</td>
                          <td className="py-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                pos.type === "BUY"
                                  ? "bg-emerald-500/15 text-emerald-500"
                                  : "bg-rose-500/15 text-rose-500"
                              }`}
                            >
                              {pos.type} {pos.leverage}x
                            </span>
                          </td>
                          <td className="py-2">{pos.quantity}</td>
                          <td className="py-2 font-mono">${pos.entryPrice}</td>
                          <td className="py-2 font-mono">${pos.currentPrice}</td>
                          <td className="py-2 font-mono font-bold">
                            <span className={isProfit ? "text-emerald-500" : "text-rose-500"}>
                              {isProfit ? "+" : ""}${pos.unrealizedPnl.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-2 text-right space-x-2">
                            <button
                              onClick={() => setPositionToEdit(pos)}
                              className="text-[11px] font-semibold text-primary hover:underline"
                            >
                              Modify
                            </button>
                            <button
                              onClick={() => closePosition(pos.id)}
                              className="text-[11px] font-semibold text-rose-500 hover:underline"
                            >
                              Close
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          ) : history.length === 0 ? (
            <div className="text-center py-4 text-xs text-muted-foreground">
              No closed trade history yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="pb-1.5 font-medium">Symbol</th>
                    <th className="pb-1.5 font-medium">Type</th>
                    <th className="pb-1.5 font-medium">Qty</th>
                    <th className="pb-1.5 font-medium">Entry</th>
                    <th className="pb-1.5 font-medium">Exit</th>
                    <th className="pb-1.5 font-medium">Realized P&L</th>
                    <th className="pb-1.5 font-medium text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {history.map((hist) => {
                    const isProfit = hist.realizedPnl >= 0
                    return (
                      <tr key={hist.id} className="hover:bg-muted/30">
                        <td className="py-2 font-bold">{hist.symbol}</td>
                        <td className="py-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              hist.type === "BUY"
                                ? "bg-emerald-500/15 text-emerald-500"
                                : "bg-rose-500/15 text-rose-500"
                            }`}
                          >
                            {hist.type}
                          </span>
                        </td>
                        <td className="py-2">{hist.quantity}</td>
                        <td className="py-2 font-mono">${hist.entryPrice}</td>
                        <td className="py-2 font-mono">${hist.closePrice}</td>
                        <td className="py-2 font-mono font-bold">
                          <span className={isProfit ? "text-emerald-500" : "text-rose-500"}>
                            {isProfit ? "+" : ""}${hist.realizedPnl.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-2 text-right text-muted-foreground text-[10px]">
                          {hist.closedAt}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  )
}
