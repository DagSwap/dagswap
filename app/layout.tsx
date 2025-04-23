
import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Oxanium } from "next/font/google"
import '@rainbow-me/rainbowkit/styles.css'
import Web3Provider from "@/components/Web3Provider"
import { GlobalChat } from "@/app/components/GlobalChat"

const oxanium = Oxanium({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oxanium",
})

export const metadata = {
  title: "DagSwap - LightSpeed Swap!",
  description: "A decentralized exchange for swapping tokens, providing liquidity, and farming tokens.",
  generator: ''
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={oxanium.variable}>
      <body className="font-oxanium">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Web3Provider>
            {children}
          <GlobalChat />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
