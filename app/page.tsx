"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Swap from "@/components/swap"
import Liquidity from "@/components/liquidity"
import DCA from "@/components/dca"
import Header from "@/components/header"
import TokenList from "@/components/token-list"
import Hero from "@/components/hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161630] text-white font-oxanium">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="swap" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-[#1e1e45] p-1 rounded-full font-oxanium">
            <TabsTrigger
              value="swap"
              className="data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white rounded-full"
            >
              Swap
            </TabsTrigger>
            <TabsTrigger
              value="liquidity"
              className="data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white rounded-full"
            >
              Liquidity
            </TabsTrigger>
            <TabsTrigger
              value="dca"
              className="data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white rounded-full"
            >
              DCA
            </TabsTrigger>
          </TabsList>

          <div className="mx-auto" style={{ maxWidth: "var(--tab-width, 448px)" }}>
            <TabsContent
              value="swap"
              className="data-[state=active]:block"
              onSelect={() => document.documentElement.style.setProperty("--tab-width", "448px")}
            >
              <Swap />
            </TabsContent>
            <TabsContent
              value="liquidity"
              className="data-[state=active]:block"
              onSelect={() => document.documentElement.style.setProperty("--tab-width", "448px")}
            >
              <Liquidity />
            </TabsContent>
          </div>

          <TabsContent
            value="dca"
            className="data-[state=active]:block max-w-4xl mx-auto"
            onSelect={() => document.documentElement.style.setProperty("--tab-width", "896px")}
          >
            <DCA />
          </TabsContent>
        </Tabs>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 font-oxanium">Top Tokens</h2>
          <TokenList />
        </div>
      </main>
    </div>
  )
}
