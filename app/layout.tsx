import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Oxanium } from "next/font/google"
import localFont from 'next/font/local'
import '@rainbow-me/rainbowkit/styles.css'
import Web3Provider from "@/components/Web3Provider"
import { GlobalChat } from "@/app/components/GlobalChat"
import { ScrollArea } from "@/components/ui/scroll-area"

const oxanium = Oxanium({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oxanium",
})

const ggSans = localFont({
  src: [
    {
      path: './fonts/gg_sans_Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gg_sans_Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/gg_sans_Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/gg_sans_Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gg-sans',
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
    <html lang="en" suppressHydrationWarning className={` ${ggSans.variable} ${oxanium.variable}`}>
      <body className="font-sans overflow-hidden h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Web3Provider>
            <ScrollArea className="h-screen" type="always">
              {children}
            </ScrollArea>
            <GlobalChat />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
