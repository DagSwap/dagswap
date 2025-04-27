import type React from 'react'
import '@/app/globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Oxanium } from 'next/font/google'
import localFont from 'next/font/local'
import '@rainbow-me/rainbowkit/styles.css'
import Web3Provider from '@/providers/Web3Provider'
import { GlobalChat } from '@/components/GlobalChat'
import { ScrollArea } from '@/components/ui/scroll-area'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { PostHogProvider } from '@/providers/posthog-provider'
import { GoogleAnalytics } from '@next/third-parties/google'


const oxanium = Oxanium({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oxanium'
})

const ggSans = localFont({
  src: [
    {
      path: './fonts/gg_sans_Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/gg_sans_Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/gg_sans_Semibold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/gg_sans_Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-gg-sans'
})

export const metadata = {
  title: 'DagSwap - LightSpeed Swap!',
  description:
    'A decentralized exchange for swapping tokens, providing liquidity, and farming tokens.',
  generator: ''
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning className={` ${ggSans.variable} `}>
      <GoogleAnalytics gaId='G-MQF3RBJP1M' />
      <body className='font-sans flex flex-col min-h-screen'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <Web3Provider>
              <ScrollArea className='h-screen' type='always'>
                <Header />
                {children}
                <Footer />
              </ScrollArea>
              <GlobalChat />
            </Web3Provider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
