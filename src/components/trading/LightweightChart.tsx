"use client"

import React, { useEffect, useRef } from "react"
import {
  createChart,
  CandlestickSeries,
  ColorType,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  LineStyle,
  IPriceLine,
} from "lightweight-charts"
import { Instrument, useTrading } from "@/context/TradingContext"
import { useTheme } from "@/context/ThemeContext"

interface LightweightChartProps {
  instrument: Instrument
  className?: string
}

export const LightweightChart = ({ instrument, className }: LightweightChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const priceLinesRef = useRef<IPriceLine[]>([])
  const { theme } = useTheme()
  const { positions } = useTrading()

  useEffect(() => {
    if (!chartContainerRef.current) return

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight || 520,
        })
      }
    }

    const isDark = theme === "dark"
    const containerHeight = chartContainerRef.current.clientHeight || 520

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDark ? "#94a3b8" : "#64748b",
      },
      grid: {
        vertLines: { color: isDark ? "rgba(51, 65, 85, 0.2)" : "rgba(203, 213, 225, 0.4)" },
        horzLines: { color: isDark ? "rgba(51, 65, 85, 0.2)" : "rgba(203, 213, 225, 0.4)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: containerHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    })

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    })

    // Generate 50 realistic historical candle bars based on current price
    const basePrice = instrument.price
    const data = []
    let currentBarClose = basePrice * 0.985
    const now = Math.floor(Date.now() / 1000) - 50 * 900 // 15m intervals

    for (let i = 0; i < 50; i++) {
      const time = (now + i * 900) as UTCTimestamp
      const open = currentBarClose
      const variation = (Math.random() - 0.48) * (basePrice * 0.008)
      const close = open + variation
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.004)
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.004)
      currentBarClose = close

      data.push({
        time,
        open: Number(open.toFixed(4)),
        high: Number(high.toFixed(4)),
        low: Number(low.toFixed(4)),
        close: Number(close.toFixed(4)),
      })
    }

    candlestickSeries.setData(data)
    chart.timeScale().fitContent()

    chartRef.current = chart
    seriesRef.current = candlestickSeries

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [instrument.symbol, instrument.price, theme])

  // Draw or update visual entry lines on the chart for active positions
  useEffect(() => {
    if (!seriesRef.current) return

    // Remove previously drawn lines
    priceLinesRef.current.forEach((line) => {
      try {
        seriesRef.current?.removePriceLine(line)
      } catch {
        // ignore
      }
    })
    priceLinesRef.current = []

    // Filter positions on current symbol
    const activePositions = positions.filter((p) => p.symbol === instrument.symbol)
    activePositions.forEach((pos) => {
      const isBuy = pos.type === "BUY"
      const pLine = seriesRef.current?.createPriceLine({
        price: pos.entryPrice,
        color: isBuy ? "#10b981" : "#ef4444",
        lineWidth: 2,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: `${pos.type} ${pos.quantity}x @ $${pos.entryPrice}`,
      })
      if (pLine) {
        priceLinesRef.current.push(pLine)
      }
    })
  }, [positions, instrument.symbol])

  // Update last bar with live ticking price
  useEffect(() => {
    if (!seriesRef.current) return
    const nowTime = Math.floor(Date.now() / 1000) as UTCTimestamp
    seriesRef.current.update({
      time: nowTime,
      open: instrument.previousPrice,
      high: Math.max(instrument.previousPrice, instrument.price * 1.0005),
      low: Math.min(instrument.previousPrice, instrument.price * 0.9995),
      close: instrument.price,
    })
  }, [instrument.price, instrument.previousPrice])

  return (
    <div className={`w-full relative ${className || "h-[520px]"}`}>
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  )
}
