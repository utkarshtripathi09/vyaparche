"use client"

import React from "react"
import { OrderCard } from "./OrderCard"

interface ChartOrderModalProps {
  isOpen: boolean
  onClose: () => void
  initialType?: "BUY" | "SELL"
}

export const ChartOrderModal = ({
  isOpen,
  onClose,
  initialType = "BUY",
}: ChartOrderModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-md">
        <OrderCard
          initialType={initialType}
          onClose={onClose}
          isSidePanel={true}
        />
      </div>
    </div>
  )
}
