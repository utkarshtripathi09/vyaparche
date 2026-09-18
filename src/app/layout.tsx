import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "@/components/providers"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Vyaparché | Real-Time Paper Trading & Market Analysis",
  description: "Trade Forex, Stocks, Crude Oil, Commodities and Mutual Funds risk-free with $100,000 virtual balance on Vyaparché. Advanced charts and technical indicators.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
