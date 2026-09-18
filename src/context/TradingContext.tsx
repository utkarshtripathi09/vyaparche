"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import confetti from "canvas-confetti"

export type AssetCategory = "forex" | "stocks" | "commodities" | "mutualfunds"

export interface TechnicalData {
  rsi14: number
  rsiState: "Overbought" | "Oversold" | "Neutral" | "Bullish" | "Bearish"
  macd: { macd: number; signal: number; histogram: number }
  sma20: number
  sma50: number
  sma200: number
  bollinger: { upper: number; middle: number; lower: number }
  signal: "Strong Buy" | "Buy" | "Neutral" | "Sell" | "Strong Sell"
}

export interface FundamentalData {
  marketCap?: string
  peRatio?: string
  forwardPe?: string
  dividendYield?: string
  beta?: string
  eps?: string
  range52w: string
  volume24h: string
  sector?: string
  expenseRatio?: string // for mutual funds / etfs
  aum?: string // for mutual funds
  description: string
}

export interface Instrument {
  symbol: string
  name: string
  category: AssetCategory
  price: number
  previousPrice: number
  changePercent: number
  bid: number
  ask: number
  spread: number
  tradingViewSymbol: string
  technical: TechnicalData
  fundamental: FundamentalData
}

export interface Position {
  id: string
  symbol: string
  name: string
  category: AssetCategory
  type: "BUY" | "SELL"
  quantity: number
  entryPrice: number
  currentPrice: number
  leverage: number
  marginRequired: number
  unrealizedPnl: number
  unrealizedPnlPercent: number
  stopLoss?: number
  takeProfit?: number
  openedAt: string
}

export interface TradeHistoryItem {
  id: string
  symbol: string
  name: string
  type: "BUY" | "SELL"
  quantity: number
  entryPrice: number
  closePrice: number
  realizedPnl: number
  realizedPnlPercent: number
  openedAt: string
  closedAt: string
}

interface TradingContextType {
  instruments: Instrument[]
  selectedInstrument: Instrument
  setSelectedSymbol: (symbol: string) => void
  positions: Position[]
  history: TradeHistoryItem[]
  placeOrder: (
    type: "BUY" | "SELL",
    quantity: number,
    leverage?: number,
    stopLoss?: number,
    takeProfit?: number
  ) => { success: boolean; message: string }
  closePosition: (positionId: string) => void
  updatePosition: (positionId: string, stopLoss?: number, takeProfit?: number) => void
  totalUnrealizedPnl: number
  totalEquity: number
  marginUsed: number
  freeMargin: number
}

const initialInstruments: Instrument[] = [
  // Forex
  {
    symbol: "EURUSD",
    name: "Euro / US Dollar",
    category: "forex",
    price: 1.0854,
    previousPrice: 1.0850,
    changePercent: 0.18,
    bid: 1.0853,
    ask: 1.0855,
    spread: 0.0002,
    tradingViewSymbol: "FX:EURUSD",
    technical: {
      rsi14: 56.2,
      rsiState: "Neutral",
      macd: { macd: 0.0012, signal: 0.0009, histogram: 0.0003 },
      sma20: 1.0835,
      sma50: 1.0812,
      sma200: 1.0760,
      bollinger: { upper: 1.089, middle: 1.084, lower: 1.079 },
      signal: "Buy",
    },
    fundamental: {
      range52w: "1.0448 - 1.1275",
      volume24h: "$1.2 Trillion",
      description: "The most traded currency pair globally, reflecting the economic equilibrium between the Eurozone and the United States.",
    },
  },
  {
    symbol: "GBPUSD",
    name: "British Pound / US Dollar",
    category: "forex",
    price: 1.2985,
    previousPrice: 1.2970,
    changePercent: 0.24,
    bid: 1.2983,
    ask: 1.2987,
    spread: 0.0004,
    tradingViewSymbol: "FX:GBPUSD",
    technical: {
      rsi14: 62.1,
      rsiState: "Neutral",
      macd: { macd: 0.0024, signal: 0.0018, histogram: 0.0006 },
      sma20: 1.292,
      sma50: 1.285,
      sma200: 1.271,
      bollinger: { upper: 1.305, middle: 1.295, lower: 1.285 },
      signal: "Strong Buy",
    },
    fundamental: {
      range52w: "1.2037 - 1.3142",
      volume24h: "$780 Billion",
      description: "Commonly known as 'Cable', representing the exchange rate between Great Britain and the US Dollar.",
    },
  },
  {
    symbol: "USDJPY",
    name: "US Dollar / Japanese Yen",
    category: "forex",
    price: 154.65,
    previousPrice: 155.10,
    changePercent: -0.29,
    bid: 154.63,
    ask: 154.67,
    spread: 0.04,
    tradingViewSymbol: "FX:USDJPY",
    technical: {
      rsi14: 43.8,
      rsiState: "Neutral",
      macd: { macd: -0.32, signal: -0.15, histogram: -0.17 },
      sma20: 155.8,
      sma50: 156.4,
      sma200: 151.2,
      bollinger: { upper: 157.5, middle: 155.0, lower: 152.5 },
      signal: "Sell",
    },
    fundamental: {
      range52w: "140.25 - 161.95",
      volume24h: "$950 Billion",
      description: "Major benchmark measuring the health of Asian and Western trade finance and interest rate differentials.",
    },
  },

  // Stocks
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    category: "stocks",
    price: 129.40,
    previousPrice: 126.80,
    changePercent: 2.05,
    bid: 129.35,
    ask: 129.45,
    spread: 0.10,
    tradingViewSymbol: "NASDAQ:NVDA",
    technical: {
      rsi14: 67.4,
      rsiState: "Bullish",
      macd: { macd: 3.42, signal: 2.95, histogram: 0.47 },
      sma20: 124.5,
      sma50: 118.2,
      sma200: 92.4,
      bollinger: { upper: 135.0, middle: 125.0, lower: 115.0 },
      signal: "Strong Buy",
    },
    fundamental: {
      marketCap: "$3.18 Trillion",
      peRatio: "68.4",
      forwardPe: "42.1",
      eps: "$1.89",
      dividendYield: "0.03%",
      beta: "1.68",
      range52w: "$39.23 - $140.76",
      volume24h: "48.2M Shares",
      sector: "Semiconductors & AI Hardware",
      description: "Global pioneer in accelerated computing, GPUs, and enterprise artificial intelligence hardware infrastructure.",
    },
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    category: "stocks",
    price: 224.80,
    previousPrice: 223.90,
    changePercent: 0.40,
    bid: 224.75,
    ask: 224.85,
    spread: 0.10,
    tradingViewSymbol: "NASDAQ:AAPL",
    technical: {
      rsi14: 58.1,
      rsiState: "Neutral",
      macd: { macd: 1.85, signal: 1.62, histogram: 0.23 },
      sma20: 221.4,
      sma50: 212.8,
      sma200: 191.5,
      bollinger: { upper: 232.0, middle: 222.0, lower: 212.0 },
      signal: "Buy",
    },
    fundamental: {
      marketCap: "$3.44 Trillion",
      peRatio: "34.2",
      forwardPe: "29.5",
      eps: "$6.57",
      dividendYield: "0.45%",
      beta: "1.08",
      range52w: "$164.08 - $237.23",
      volume24h: "39.8M Shares",
      sector: "Consumer Electronics",
      description: "Consumer technology ecosystem powerhouse spanning iPhone, Mac, Apple Intelligence, and high-margin services.",
    },
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    category: "stocks",
    price: 247.30,
    previousPrice: 251.10,
    changePercent: -1.51,
    bid: 247.20,
    ask: 247.40,
    spread: 0.20,
    tradingViewSymbol: "NASDAQ:TSLA",
    technical: {
      rsi14: 47.3,
      rsiState: "Neutral",
      macd: { macd: -0.85, signal: -0.40, histogram: -0.45 },
      sma20: 250.2,
      sma50: 235.0,
      sma200: 215.8,
      bollinger: { upper: 265.0, middle: 248.0, lower: 231.0 },
      signal: "Neutral",
    },
    fundamental: {
      marketCap: "$788 Billion",
      peRatio: "62.8",
      forwardPe: "78.2",
      eps: "$3.94",
      dividendYield: "0.00%",
      beta: "2.41",
      range52w: "$138.80 - $271.00",
      volume24h: "62.4M Shares",
      sector: "Automotive & Clean Energy",
      description: "Manufacturer of electric vehicles, energy storage systems, autonomous Full Self-Driving (FSD) robotics.",
    },
  },

  // Commodities & Crude
  {
    symbol: "USOIL",
    name: "WTI Crude Oil",
    category: "commodities",
    price: 76.85,
    previousPrice: 77.40,
    changePercent: -0.71,
    bid: 76.82,
    ask: 76.88,
    spread: 0.06,
    tradingViewSymbol: "TVC:USOIL",
    technical: {
      rsi14: 42.5,
      rsiState: "Neutral",
      macd: { macd: -0.65, signal: -0.42, histogram: -0.23 },
      sma20: 78.1,
      sma50: 80.4,
      sma200: 79.2,
      bollinger: { upper: 82.0, middle: 78.5, lower: 75.0 },
      signal: "Sell",
    },
    fundamental: {
      range52w: "$67.71 - $95.03 / bbl",
      volume24h: "1.4M Contracts",
      sector: "Energy / Petroleum",
      description: "West Texas Intermediate (WTI) is the premier benchmark for US and international light sweet crude petroleum contracts.",
    },
  },
  {
    symbol: "XAUUSD",
    name: "Spot Gold / USD",
    category: "commodities",
    price: 2388.40,
    previousPrice: 2372.10,
    changePercent: 0.69,
    bid: 2388.10,
    ask: 2388.70,
    spread: 0.60,
    tradingViewSymbol: "TVC:GOLD",
    technical: {
      rsi14: 69.8,
      rsiState: "Bullish",
      macd: { macd: 14.8, signal: 11.2, histogram: 3.6 },
      sma20: 2360.0,
      sma50: 2330.0,
      sma200: 2180.0,
      bollinger: { upper: 2420.0, middle: 2380.0, lower: 2340.0 },
      signal: "Strong Buy",
    },
    fundamental: {
      range52w: "$1,810.50 - $2,483.70 / oz",
      volume24h: "$180 Billion",
      sector: "Precious Metals",
      description: "The premier historic safe-haven store of value, hedge against currency devaluation, and central bank reserve asset.",
    },
  },
  {
    symbol: "UKOIL",
    name: "Brent Crude Oil",
    category: "commodities",
    price: 80.65,
    previousPrice: 81.10,
    changePercent: -0.55,
    bid: 80.62,
    ask: 80.68,
    spread: 0.06,
    tradingViewSymbol: "TVC:UKOIL",
    technical: {
      rsi14: 45.1,
      rsiState: "Neutral",
      macd: { macd: -0.52, signal: -0.38, histogram: -0.14 },
      sma20: 82.0,
      sma50: 83.5,
      sma200: 82.8,
      bollinger: { upper: 85.0, middle: 81.5, lower: 78.0 },
      signal: "Neutral",
    },
    fundamental: {
      range52w: "$71.28 - $97.69 / bbl",
      volume24h: "980K Contracts",
      sector: "Energy / Petroleum",
      description: "North Sea petroleum benchmark used to price two-thirds of the world's internationally traded crude oil supplies.",
    },
  },

  // Mutual Funds & ETFs
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    category: "mutualfunds",
    price: 558.40,
    previousPrice: 556.20,
    changePercent: 0.39,
    bid: 558.35,
    ask: 558.45,
    spread: 0.10,
    tradingViewSymbol: "AMEX:SPY",
    technical: {
      rsi14: 61.3,
      rsiState: "Neutral",
      macd: { macd: 4.1, signal: 3.4, histogram: 0.7 },
      sma20: 550.0,
      sma50: 538.0,
      sma200: 495.0,
      bollinger: { upper: 568.0, middle: 552.0, lower: 536.0 },
      signal: "Strong Buy",
    },
    fundamental: {
      aum: "$540 Billion",
      expenseRatio: "0.0945%",
      dividendYield: "1.24%",
      peRatio: "27.8",
      range52w: "$410.05 - $565.16",
      volume24h: "45.1M Shares",
      sector: "Broad Large-Cap Equities",
      description: "The world's oldest and largest ETF designed to correspond generally to the price and yield performance of the S&P 500 Index.",
    },
  },
  {
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    category: "mutualfunds",
    price: 512.60,
    previousPrice: 510.50,
    changePercent: 0.41,
    bid: 512.50,
    ask: 512.70,
    spread: 0.20,
    tradingViewSymbol: "AMEX:VOO",
    technical: {
      rsi14: 61.5,
      rsiState: "Neutral",
      macd: { macd: 3.8, signal: 3.1, histogram: 0.7 },
      sma20: 504.0,
      sma50: 492.0,
      sma200: 454.0,
      bollinger: { upper: 522.0, middle: 508.0, lower: 494.0 },
      signal: "Buy",
    },
    fundamental: {
      aum: "$480 Billion",
      expenseRatio: "0.03%",
      dividendYield: "1.32%",
      peRatio: "27.6",
      range52w: "$378.10 - $518.90",
      volume24h: "4.8M Shares",
      sector: "Large-Cap Blend",
      description: "Low-cost index fund representing 500 of the largest US publicly traded corporations with ultra-low 0.03% expense ratio.",
    },
  },
]

const TradingContext = createContext<TradingContextType | undefined>(undefined)

export const TradingProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, updatePaperBalance } = useAuth()
  const [instruments, setInstruments] = useState<Instrument[]>(initialInstruments)
  const [selectedSymbol, setSelectedSymbol] = useState<string>("EURUSD")
  const [positions, setPositions] = useState<Position[]>([])
  const [history, setHistory] = useState<TradeHistoryItem[]>([])

  // Load positions and history from local storage
  useEffect(() => {
    try {
      const savedPos = localStorage.getItem("vyaparche_positions") || localStorage.getItem("equityiq_positions")
      if (savedPos) setPositions(JSON.parse(savedPos))
      const savedHist = localStorage.getItem("vyaparche_history") || localStorage.getItem("equityiq_history")
      if (savedHist) setHistory(JSON.parse(savedHist))
    } catch (e) {
      console.error("Error loading trading data", e)
    }
  }, [])

  // Real-time ticking simulation engine
  useEffect(() => {
    const interval = setInterval(() => {
      setInstruments((prevInstruments) =>
        prevInstruments.map((inst) => {
          // Micro fluctuation between -0.15% and +0.15%
          const deltaFactor = (Math.random() - 0.495) * 0.003
          const newPriceRaw = inst.price * (1 + deltaFactor)
          const decimals = inst.category === "forex" ? 4 : 2
          const newPrice = Number(newPriceRaw.toFixed(decimals))
          const changePercent = Number((((newPrice - inst.previousPrice) / inst.previousPrice) * 100).toFixed(2))
          const halfSpread = inst.spread / 2
          const bid = Number((newPrice - halfSpread).toFixed(decimals))
          const ask = Number((newPrice + halfSpread).toFixed(decimals))

          return {
            ...inst,
            price: newPrice,
            changePercent,
            bid,
            ask,
          }
        })
      )
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  // Update open positions mark-to-market P&L whenever instruments price update
  useEffect(() => {
    setPositions((prevPositions) => {
      let changed = false
      const updated = prevPositions.map((pos) => {
        const inst = instruments.find((i) => i.symbol === pos.symbol)
        if (!inst) return pos

        const currentPrice = pos.type === "BUY" ? inst.bid : inst.ask
        const priceDiff = pos.type === "BUY" ? currentPrice - pos.entryPrice : pos.entryPrice - currentPrice
        const unrealizedPnl = Number((priceDiff * pos.quantity * pos.leverage).toFixed(2))
        const unrealizedPnlPercent = Number(((priceDiff / pos.entryPrice) * 100 * pos.leverage).toFixed(2))

        if (pos.currentPrice !== currentPrice || pos.unrealizedPnl !== unrealizedPnl) {
          changed = true
        }

        return {
          ...pos,
          currentPrice,
          unrealizedPnl,
          unrealizedPnlPercent,
        }
      })

      if (changed) {
        localStorage.setItem("vyaparche_positions", JSON.stringify(updated))
        localStorage.setItem("equityiq_positions", JSON.stringify(updated))
      }
      return updated
    })
  }, [instruments])

  const selectedInstrument = instruments.find((i) => i.symbol === selectedSymbol) || instruments[0]

  const placeOrder = (
    type: "BUY" | "SELL",
    quantity: number,
    leverage: number = 1,
    stopLoss?: number,
    takeProfit?: number
  ) => {
    if (!user) {
      return { success: false, message: "Please sign in with Google to place paper trades." }
    }

    const inst = selectedInstrument
    const executionPrice = type === "BUY" ? inst.ask : inst.bid
    const notionalValue = executionPrice * quantity
    const marginRequired = Number((notionalValue / leverage).toFixed(2))

    if (user.paperBalance < marginRequired) {
      return {
        success: false,
        message: `Insufficient margin! Required: $${marginRequired.toLocaleString()}, Available: $${user.paperBalance.toLocaleString()}`,
      }
    }

    // Deduct margin collateral from paper balance
    updatePaperBalance(-marginRequired)

    const newPosition: Position = {
      id: "pos_" + Math.random().toString(36).substring(2, 9),
      symbol: inst.symbol,
      name: inst.name,
      category: inst.category,
      type,
      quantity,
      entryPrice: executionPrice,
      currentPrice: executionPrice,
      leverage,
      marginRequired,
      unrealizedPnl: 0,
      unrealizedPnlPercent: 0,
      stopLoss,
      takeProfit,
      openedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    }

    const updated = [newPosition, ...positions]
    setPositions(updated)
    localStorage.setItem("vyaparche_positions", JSON.stringify(updated))
    localStorage.setItem("equityiq_positions", JSON.stringify(updated))

    return {
      success: true,
      message: `Successfully placed ${type} order for ${quantity} ${inst.symbol} @ $${executionPrice}!`,
    }
  }

  const closePosition = (positionId: string) => {
    const pos = positions.find((p) => p.id === positionId)
    if (!pos || !user) return

    // Return collateral + realized PnL to balance
    const totalReturn = pos.marginRequired + pos.unrealizedPnl
    updatePaperBalance(totalReturn)

    // Confetti on profitable trades!
    if (pos.unrealizedPnl > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    const closedItem: TradeHistoryItem = {
      id: "hist_" + Math.random().toString(36).substring(2, 9),
      symbol: pos.symbol,
      name: pos.name,
      type: pos.type,
      quantity: pos.quantity,
      entryPrice: pos.entryPrice,
      closePrice: pos.currentPrice,
      realizedPnl: pos.unrealizedPnl,
      realizedPnlPercent: pos.unrealizedPnlPercent,
      openedAt: pos.openedAt,
      closedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    }

    const updatedHistory = [closedItem, ...history]
    setHistory(updatedHistory)
    localStorage.setItem("vyaparche_history", JSON.stringify(updatedHistory))
    localStorage.setItem("equityiq_history", JSON.stringify(updatedHistory))

    const updatedPositions = positions.filter((p) => p.id !== positionId)
    setPositions(updatedPositions)
    localStorage.setItem("vyaparche_positions", JSON.stringify(updatedPositions))
    localStorage.setItem("equityiq_positions", JSON.stringify(updatedPositions))
  }

  const updatePosition = (positionId: string, stopLoss?: number, takeProfit?: number) => {
    setPositions((prev) => {
      const updated = prev.map((pos) => {
        if (pos.id === positionId) {
          return { ...pos, stopLoss, takeProfit }
        }
        return pos
      })
      localStorage.setItem("vyaparche_positions", JSON.stringify(updated))
      localStorage.setItem("equityiq_positions", JSON.stringify(updated))
      return updated
    })
  }

  const totalUnrealizedPnl = positions.reduce((acc, p) => acc + p.unrealizedPnl, 0)
  const marginUsed = positions.reduce((acc, p) => acc + p.marginRequired, 0)
  const freeMargin = user ? user.paperBalance : 0
  const totalEquity = (user ? user.paperBalance : 0) + marginUsed + totalUnrealizedPnl

  return (
    <TradingContext.Provider
      value={{
        instruments,
        selectedInstrument,
        setSelectedSymbol,
        positions,
        history,
        placeOrder,
        closePosition,
        updatePosition,
        totalUnrealizedPnl,
        totalEquity,
        marginUsed,
        freeMargin,
      }}
    >
      {children}
    </TradingContext.Provider>
  )
}

export const useTrading = () => {
  const context = useContext(TradingContext)
  if (!context) {
    throw new Error("useTrading must be used within a TradingProvider")
  }
  return context
}
