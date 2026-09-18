# Vyaparché 📈

> **Real-Time Paper Trading & Multi-Asset Financial Analytics Platform**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TradingView](https://img.shields.io/badge/Charts-TradingView-blue)](https://www.tradingview.com/)

**Vyaparché** is an institutional-grade paper trading platform designed for real-time simulated market execution across Forex, Global Equities, Commodities, and Index Funds. Start with a **$100,000 USD virtual portfolio** and practice trading strategies with zero risk.

---

## ✨ Features

- **Multi-Asset Coverage**:
  - **Forex**: EUR/USD, GBP/USD, USD/JPY with real-time pip spreads.
  - **Equities**: NVIDIA (NVDA), Apple (AAPL), Tesla (TSLA).
  - **Commodities & Energy**: WTI Crude Oil, Brent Crude, Spot Gold (XAU/USD).
  - **Mutual Funds & ETFs**: SPDR S&P 500 (SPY), Vanguard S&P 500 (VOO).
- **Dual Chart Engines**:
  - Embedded **TradingView** charts with indicators (RSI, MACD) and multiple timeframes.
  - High-performance canvas-based **Lightweight Chart** with live order entry price lines.
- **Full-Screen Chart Terminal**:
  - Dedicated full-screen mode with non-overlapping action toolbar.
  - Docked **Order Execution Side Panel** accessible directly from full screen upon clicking Buy or Sell.
  - Dynamic ring status indicators showing active trade direction.
- **Realistic Order Execution Engine**:
  - Instant simulated market execution with live bid/ask quotes.
  - Leverage selector from **1x to 50x**.
  - Risk controls: **Stop Loss (SL)** and **Take Profit (TP)**.
  - Real-time margin collateral and cash purchasing power verification.
- **On-Chart Trade Overlay**:
  - Live floating position badges on the chart showing real-time unrealized PnL ($ and %).
  - In-place Stop Loss / Take Profit modifier modal.
  - One-click position closing with celebratory feedback on profitable trades.
- **Technical & Fundamental Analysis**:
  - Automated bias scoring: RSI(14), MACD, Moving Averages (20/50/200 SMA), Bollinger Bands.
  - Financial fundamentals: Market cap, P/E ratio, 52-week ranges, beta, dividend yield.
- **Theme & Persistence**:
  - One-click **Dark / Light mode** toggle synced across all chart widgets.
  - LocalStorage persistence preserving account balances, open positions, and trade history.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/utkarshtripathi09/vyaparche.git
cd vyaparche
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) (or the assigned port) in your browser.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Charts**: [TradingView Widget](https://www.tradingview.com/widget/) & [Lightweight Charts](https://tradingview.github.io/lightweight-charts/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: Canvas Confetti

---

## ⚠️ Disclaimer

*Vyaparché is a paper trading simulation platform designed exclusively for educational and analytical purposes. No real currency is deposited, traded, or at risk.*
