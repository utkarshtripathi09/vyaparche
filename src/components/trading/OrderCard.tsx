"use client"

import React, { useState, useEffect } from "react"
import { useTrading } from "@/context/TradingContext"
import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpRight, ArrowDownRight, RefreshCw, AlertCircle, CheckCircle2, X } from "lucide-react"

interface OrderCardProps {
  initialType?: "BUY" | "SELL"
  onClose?: () => void
  isSidePanel?: boolean
  className?: string
  externalOrderType?: "BUY" | "SELL"
  onOrderTypeChange?: (type: "BUY" | "SELL") => void
}

export const OrderCard = ({
  initialType = "BUY",
  onClose,
  isSidePanel = false,
  className = "",
  externalOrderType,
  onOrderTypeChange,
}: OrderCardProps = {}) => {
  const { selectedInstrument, placeOrder } = useTrading()
  const { user, setIsAuthModalOpen, resetPaperBalance } = useAuth()

  const [orderType, setOrderType] = useState<"BUY" | "SELL">(initialType)
  const [quantity, setQuantity] = useState<string>(
    selectedInstrument.category === "forex" ? "10" : "1"
  )
  const [leverage, setLeverage] = useState<number>(
    selectedInstrument.category === "forex" ? 20 : 5
  )
  const [stopLoss, setStopLoss] = useState<string>("")
  const [takeProfit, setTakeProfit] = useState<string>("")
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Sync orderType if external prop changes
  useEffect(() => {
    if (externalOrderType) {
      setOrderType(externalOrderType)
    } else if (initialType) {
      setOrderType(initialType)
    }
  }, [initialType, externalOrderType])

  // Sync leverage default on instrument change
  useEffect(() => {
    setLeverage(selectedInstrument.category === "forex" ? 20 : 5)
  }, [selectedInstrument.category])

  const handleSelectType = (type: "BUY" | "SELL") => {
    setOrderType(type)
    if (onOrderTypeChange) {
      onOrderTypeChange(type)
    }
  }

  const qty = parseFloat(quantity) || 0
  const execPrice = orderType === "BUY" ? selectedInstrument.ask : selectedInstrument.bid
  const notionalValue = qty * execPrice
  const marginRequired = Number((notionalValue / leverage).toFixed(2))

  const handleExecute = () => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }

    if (qty <= 0) {
      setFeedback({ type: "error", text: "Please enter a valid order quantity." })
      return
    }

    const sl = stopLoss ? parseFloat(stopLoss) : undefined
    const tp = takeProfit ? parseFloat(takeProfit) : undefined

    const result = placeOrder(orderType, qty, leverage, sl, tp)
    if (result.success) {
      setFeedback({ type: "success", text: result.message })
      setTimeout(() => setFeedback(null), 4000)
    } else {
      setFeedback({ type: "error", text: result.message })
    }
  }

  return (
    <Card className={`shadow-md border border-border ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Order Execution</CardTitle>
            {isSidePanel && (
              <span className="text-xs px-2 py-0.5 rounded font-semibold uppercase bg-muted text-muted-foreground border border-border">
                {selectedInstrument.symbol}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={resetPaperBalance}
                title="Reset paper balance to $100,000"
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="h-3 w-3" /> Reset $100k
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                title="Close Order Panel"
                className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <CardDescription>
          Simulated market execution with real-time mark pricing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Buy / Sell direction buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={orderType === "BUY" ? "default" : "outline"}
            onClick={() => handleSelectType("BUY")}
            className={`h-11 font-semibold flex items-center justify-center gap-2 transition-all ${
              orderType === "BUY"
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20 shadow-md"
                : "hover:border-emerald-500 hover:text-emerald-500"
            }`}
          >
            <ArrowUpRight className="h-4 w-4" />
            Buy / Long (${selectedInstrument.ask})
          </Button>
          <Button
            type="button"
            variant={orderType === "SELL" ? "default" : "outline"}
            onClick={() => handleSelectType("SELL")}
            className={`h-11 font-semibold flex items-center justify-center gap-2 transition-all ${
              orderType === "SELL"
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20 shadow-md"
                : "hover:border-rose-500 hover:text-rose-500"
            }`}
          >
            <ArrowDownRight className="h-4 w-4" />
            Sell / Short (${selectedInstrument.bid})
          </Button>
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <Label htmlFor="qty" className="font-medium">
              Order Quantity ({selectedInstrument.category === "forex" ? "Lots" : "Units/Shares"})
            </Label>
            <span className="text-muted-foreground">
              Notional: ${notionalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <Input
            id="qty"
            type="number"
            min="0.01"
            step={selectedInstrument.category === "forex" ? "0.01" : "1"}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="h-10"
          />
        </div>

        {/* Leverage selection */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <Label className="font-medium">Simulated Leverage</Label>
            <span className="font-semibold text-primary">{leverage}x</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 5, 10, 20, 50].map((lev) => (
              <button
                key={lev}
                type="button"
                onClick={() => setLeverage(lev)}
                className={`py-1 rounded text-xs font-semibold transition-colors border ${
                  leverage === lev
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {lev}x
              </button>
            ))}
          </div>
        </div>

        {/* Optional SL / TP */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="space-y-1">
            <Label htmlFor="sl" className="text-xs text-muted-foreground">
              Stop Loss ($)
            </Label>
            <Input
              id="sl"
              type="number"
              placeholder="Optional"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="tp" className="text-xs text-muted-foreground">
              Take Profit ($)
            </Label>
            <Input
              id="tp"
              type="number"
              placeholder="Optional"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
        </div>

        {/* Margin Summary */}
        <div className="p-3 rounded-lg bg-muted/40 border border-border/60 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Margin Required:</span>
            <span className="font-semibold text-foreground">
              ${marginRequired.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Available Cash:</span>
            <span className="font-semibold text-emerald-500">
              ${(user ? user.paperBalance : 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div
            className={`p-2.5 rounded-md text-xs flex items-center gap-2 ${
              feedback.type === "success"
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleExecute}
          className={`w-full h-11 text-base font-semibold shadow-md transition-all ${
            orderType === "BUY"
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20"
              : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20"
          }`}
        >
          {user ? `Execute ${orderType} Order` : "Sign In with Google to Trade"}
        </Button>
      </CardContent>
    </Card>
  )
}
