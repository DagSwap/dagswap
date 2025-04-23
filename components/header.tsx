"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function Header() {
  const { setTheme } = useTheme()
  const [walletConnected, setWalletConnected] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const connectWallet = () => {
    // In a real implementation, this would connect to MetaMask or another wallet
    setWalletConnected(true)
  }

  return (
    <header className="border-b border-[#2a2a5a] bg-[#161630]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 bg-[#6c3ce9] rounded-lg rotate-45 relative overflow-hidden">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff9d00] rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-white">
              D
            </div>
          </div>
          <span className="font-bold text-xl hidden sm:inline font-oxanium">
            <span className="text-white">Dag</span>
            <span className="text-[#ff9d00]">Swap</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav>
            <ul className="flex gap-6 font-oxanium">
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Swap
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Liquidity
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  DCA
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={connectWallet}
            className="bg-[#ff9d00] hover:bg-[#e68e00] text-white rounded-full px-6 font-oxanium"
          >
            {walletConnected ? "0x1a2...3b4c" : "Connect Wallet"}
          </Button>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1e1e45] py-4">
          <nav className="container mx-auto px-4">
            <ul className="flex flex-col gap-4 font-oxanium">
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors block py-2">
                  Swap
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors block py-2">
                  Liquidity
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors block py-2">
                  DCA
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors block py-2">
                  Analytics
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
