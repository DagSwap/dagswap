'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

// Sample token data
const tokens = [
  {
    id: 1,
    name: 'BlockDAG',
    symbol: 'BDAG',
    logo: '/cube.webp',
    price: '$2.45',
    change: '+5.2%',
    volume: '$1.2B',
    marketCap: '$390M',
    positive: true
  },
  {
    id: 2,
    name: 'DagSwap',
    symbol: 'DAGGR',
    logo: '/assets/logo.png',
    price: '$0.0195',
    change: '+12.8%',
    volume: '$245M',
    marketCap: '$75M',
    positive: true
  },
  {
    id: 3,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: '/ethereal-threads.png',
    price: '$3,245.67',
    change: '+5.2%',
    volume: '$1.2B',
    marketCap: '$390B',
    positive: true
  },
  {
    id: 4,
    name: 'PancakeSwap Token',
    symbol: 'CAKE',
    logo: '/colorful-layered-cake.png',
    price: '$2.45',
    change: '+12.8%',
    volume: '$245M',
    marketCap: '$750M',
    positive: true
  },
  {
    id: 5,
    name: 'Binance Coin',
    symbol: 'BNB',
    logo: '/BNB-Abstract-Bull.png',
    price: '$320.15',
    change: '-1.5%',
    volume: '$850M',
    marketCap: '$52B',
    positive: false
  },
  {
    id: 6,
    name: 'Tether USD',
    symbol: 'USDT',
    logo: '/tethered-currency.png',
    price: '$1.00',
    change: '+0.1%',
    volume: '$45B',
    marketCap: '$83B',
    positive: true
  }
]

export default function TokenList () {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTokens = tokens.filter(
    token =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='z-20'>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <h2 className='text-4xl md:text-6xl font-bold mb-4 md:mb-8 z-20'>Top Tokens</h2>
        <div className='relative mb-4 md:mb-6 z-20 w-full sm:w-auto'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-dag-orange' />
          <Input
            placeholder='Search tokens'
            className='pl-8 bg-[#252550] border-[#3a3a70] text-sm md:text-sm text-white rounded-full'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='rounded-[20px] z-20 overflow-hidden border border-[#3a3a70] bg-[#252550]/40 backdrop-blur-lg'>
        <div className="overflow-x-auto">
          <Table className='z-20'>
            <TableHeader className='bg-[#252550]'>
              <TableRow className='hover:bg-transparent border-b-[#3a3a70]'>
                <TableHead className='text-white whitespace-nowrap'>Token</TableHead>
                <TableHead className='text-white whitespace-nowrap'>Price</TableHead>
                <TableHead className='text-white whitespace-nowrap'>24h Change</TableHead>
                <TableHead className='text-white hidden md:table-cell whitespace-nowrap'>
                  24h Volume
                </TableHead>
                <TableHead className='text-white hidden md:table-cell whitespace-nowrap'>
                  Market Cap
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTokens.map(token => (
                <TableRow
                  key={token.id}
                  className='hover:bg-[#252550] border-b-[#3a3a70]'
                >
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <img
                        src={token.logo || '/placeholder.svg'}
                        alt={token.symbol}
                        className='w-8 h-8 rounded-full'
                      />
                      <div>
                        <div className='font-medium'>{token.name}</div>
                        <div className='text-sm text-white/70'>
                          {token.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='font-medium whitespace-nowrap'>{token.price}</TableCell>
                  <TableCell
                    className={`${token.positive ? 'text-green-400' : 'text-red-400'} whitespace-nowrap`}
                  >
                    {token.change}
                  </TableCell>
                  <TableCell className='hidden md:table-cell whitespace-nowrap'>
                    {token.volume}
                  </TableCell>
                  <TableCell className='hidden md:table-cell whitespace-nowrap'>
                    {token.marketCap}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
