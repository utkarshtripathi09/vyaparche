"use client"

import React, { useState } from "react"
import { useTrading, AssetCategory } from "@/context/TradingContext"
import { Input } from "@/components/ui/input"
import { Search, Globe, BarChart3, LineChart, PieChart } from "lucide-react"

export const InstrumentSelector = () => {
  const { instruments, selectedInstrument, setSelectedSymbol } = useTrading()
  const [filterCategory, setFilterCategory] = useState<AssetCategory | "all">("all")
  const [search, setSearch] = useState("")

  const filtered = instruments.filter((inst) => {
    const matchesCat = filterCategory === "all" || inst.category === filterCategory
    const matchesSearch =
      inst.symbol.toLowerCase().includes(search.toLowerCase()) ||
      inst.name.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="flex flex-col space-y-3">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
            filterCategory === "all"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          }`}
        >
          All Markets
        </button>
        <button
          onClick={() => setFilterCategory("forex")}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1 shrink-0 ${
            filterCategory === "forex"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          }`}
        >
          <Globe className="h-3 w-3" /> Forex
        </button>
        <button
          onClick={() => setFilterCategory("stocks")}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1 shrink-0 ${
            filterCategory === "stocks"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          }`}
        >
          <BarChart3 className="h-3 w-3" /> Stocks
        </button>
        <button
          onClick={() => setFilterCategory("commodities")}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1 shrink-0 ${
            filterCategory === "commodities"
              ? "bg-amber-600 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          }`}
        >
          <LineChart className="h-3 w-3" /> Commodities & Crude
        </button>
        <button
          onClick={() => setFilterCategory("mutualfunds")}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1 shrink-0 ${
            filterCategory === "mutualfunds"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          }`}
        >
          <PieChart className="h-3 w-3" /> Mutual Funds & ETFs
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search symbol (EURUSD, Crude Oil, NVDA, SPY)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-xs"
        />
      </div>

      {/* Instruments Grid/List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filtered.map((inst) => {
          const isSelected = selectedInstrument.symbol === inst.symbol
          const isPos = inst.changePercent >= 0
          return (
            <button
              key={inst.symbol}
              onClick={() => setSelectedSymbol(inst.symbol)}
              className={`p-3 rounded-lg text-left transition-all border ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                  : "border-border bg-card hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">{inst.symbol}</span>
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${
                    isPos
                      ? "text-emerald-500 bg-emerald-500/10"
                      : "text-rose-500 bg-rose-500/10"
                  }`}
                >
                  {isPos ? "+" : ""}
                  {inst.changePercent}%
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground truncate">{inst.name}</div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-mono text-sm font-semibold text-foreground">
                  ${inst.price}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">
                  {inst.category === "forex" ? "Spread: " + inst.spread : "24h"}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
