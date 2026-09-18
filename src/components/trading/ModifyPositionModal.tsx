"use client"

import React, { useState } from "react"
import { Position, useTrading } from "@/context/TradingContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, CheckCircle2 } from "lucide-react"

interface ModifyPositionModalProps {
  position: Position | null
  onClose: () => void
}

export const ModifyPositionModal = ({ position, onClose }: ModifyPositionModalProps) => {
  const { updatePosition, closePosition } = useTrading()
  const [stopLoss, setStopLoss] = useState<string>(position?.stopLoss ? String(position.stopLoss) : "")
  const [takeProfit, setTakeProfit] = useState<string>(position?.takeProfit ? String(position.takeProfit) : "")
  const [success, setSuccess] = useState(false)

  if (!position) return null

  const handleSave = () => {
    const sl = stopLoss ? parseFloat(stopLoss) : undefined
    const tp = takeProfit ? parseFloat(takeProfit) : undefined
    updatePosition(position.id, sl, tp)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      onClose()
    }, 800)
  }

  const handleCloseTrade = () => {
    closePosition(position.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-5 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h3 className="text-base font-bold">Modify Position</h3>
            <p className="text-xs text-muted-foreground">
              {position.symbol} • {position.type} {position.quantity} @ ${position.entryPrice}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Current floating P&L */}
        <div className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Current P&L:</span>
          <span
            className={`font-mono font-bold ${
              position.unrealizedPnl >= 0 ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {position.unrealizedPnl >= 0 ? "+" : ""}${position.unrealizedPnl.toFixed(2)} (
            {position.unrealizedPnlPercent >= 0 ? "+" : ""}
            {position.unrealizedPnlPercent.toFixed(2)}%)
          </span>
        </div>

        {/* SL / TP inputs */}
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="modify-sl" className="text-xs">
              Stop Loss Price ($)
            </Label>
            <Input
              id="modify-sl"
              type="number"
              placeholder="e.g. 1.0820"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="h-9 text-xs font-mono"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="modify-tp" className="text-xs">
              Take Profit Price ($)
            </Label>
            <Input
              id="modify-tp"
              type="number"
              placeholder="e.g. 1.0940"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="h-9 text-xs font-mono"
            />
          </div>
        </div>

        {success && (
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs flex items-center gap-1.5 border border-emerald-500/30">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Position risk limits updated!</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={handleCloseTrade}
            className="w-1/2 h-10 text-xs border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white"
          >
            Close Market
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="w-1/2 h-10 text-xs font-semibold"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
