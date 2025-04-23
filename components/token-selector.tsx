"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"

// Sample token list - in a real DEX this would come from an API or blockchain
const tokens = [
  {
    symbol: "BDAG",
    name: "Bitdag",
    logo: "/bdag-token.png",
    balance: "1.245",
  },
  {
    symbol: "DAGR",
    name: "Dagorath",
    logo: "/dagr-token.png",
    balance: "245.75",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    logo: "/ethereal-threads.png",
    balance: "1.245",
  },
  {
    symbol: "CAKE",
    name: "PancakeSwap Token",
    logo: "/colorful-layered-cake.png",
    balance: "245.75",
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    logo: "/BNB-Abstract-Bull.png",
    balance: "3.5",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    logo: "/tethered-currency.png",
    balance: "1250.00",
  },
]

export default function TokenSelector({ selectedToken, onSelectToken }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectToken = (token) => {
    onSelectToken(token)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-[#2a2a5a] border-[#3a3a70] hover:bg-[#3a3a70] text-white rounded-full"
        >
          <img
            src={selectedToken.logo || "/placeholder.svg"}
            alt={selectedToken.symbol}
            className="w-6 h-6 rounded-full"
          />
          <span>{selectedToken.symbol}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#252550] border-[#3a3a70] text-white rounded-[20px]">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search name or paste address"
            className="pl-8 bg-[#2a2a5a] border-[#3a3a70] text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-2 max-h-80 overflow-y-auto">
          {filteredTokens.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between p-3 hover:bg-[#3a3a70] rounded-lg cursor-pointer"
              onClick={() => handleSelectToken(token)}
            >
              <div className="flex items-center gap-3">
                <img src={token.logo || "/placeholder.svg"} alt={token.symbol} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-white/70">{token.name}</div>
                </div>
              </div>
              <div className="text-right">{token.balance}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
