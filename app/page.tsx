"use client"

import Header from "@/components/header"
import TokenList from "@/components/token-list"
import Hero from "@/components/hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161630] text-white font-oxanium">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-start">
        <div className="w-full">
          <Hero />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-48">
        <div className="">
          <TokenList />
        </div>
      </main>
    </div>
  )
}
