'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header () {
  const { setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Swap' },
    { href: '/liquidity', label: 'Liquidity' },
    { href: '/dca', label: 'DCA' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/pdf', label: 'DEX' },
    { href: '/team', label: 'Team' }
  ]

  return (
    <header className='border-b border-[#2a2a5a] bg-[#161630]/80 backdrop-blur-md sticky top-0 z-30'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <Image
              src='/assets/logo.png'
              alt='Dag Logo'
              width={25}
              height={28}
            />
          </div>
          <Link
            href='/'
            className='font-bold text-xl hidden sm:inline font-oxanium'
          >
            <span className='text-white'>Dag</span>
            <span className='text-[#ff9d00]'>Swap</span>
          </Link>
        </div>

        <div className='hidden md:flex items-center gap-6'>
          <nav>
            <ul className='flex items-center gap-6 font-oxanium'>
              {navItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      pathname === item.href
                        ? 'px-5 py-2 bg-transparent border border-[#ff9d00] text-[#ff9d00] rounded-full font-medium hover:bg-[#ff9d00]/10 transition-colors'
                        : 'text-white/80 hover:text-white transition-colors px-5 py-2'
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='flex items-center gap-2'>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted
            }) => {
              const ready = mounted && authenticationStatus !== 'loading'
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated')

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }
                  })}
                >
                  {!connected ? (
                    <button
                      onClick={openConnectModal}
                      type='button'
                      className='bg-[#ff9d00] hover:bg-[#e68e00] text-white rounded-full px-6 py-2 font-oxanium font-bold transition'
                    >
                      Connect Wallet
                    </button>
                  ) : chain.unsupported ? (
                    <button
                      onClick={openChainModal}
                      type='button'
                      className='bg-red-600 text-white rounded-full px-6 py-2 font-oxanium font-bold transition'
                    >
                      Wrong network
                    </button>
                  ) : (
                    <button
                      onClick={openAccountModal}
                      type='button'
                      className='bg-[#ff9d00] hover:bg-[#e68e00] text-white rounded-full px-6 py-2 font-oxanium font-bold transition'
                    >
                      {account.displayName}
                    </button>
                  )}
                </div>
              )
            }}
          </ConnectButton.Custom>

          <button
            className='md:hidden text-white'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-[#1e1e45] py-4'>
          <nav className='container mx-auto px-4'>
            <ul className='flex flex-col gap-4 font-oxanium'>
              {navItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-2 transition-colors ${
                      pathname === item.href
                        ? 'text-[#ff9d00] font-medium'
                        : 'text-white/80 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
