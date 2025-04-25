'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, ArrowRight } from 'lucide-react'
import TokenSelector from '@/components/token-selector'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Liquidity () {
  const [token1, setToken1] = useState({
    symbol: 'BDAG',
    name: 'BlockDAG',
    logo: '/cube.webp',
    balance: '1.245'
  })

  const [token2, setToken2] = useState({
    symbol: 'DAGGR',
    name: 'DagSwap',
    logo: '/assets/logo.png',
    balance: '245.75'
  })

  const [amount1, setAmount1] = useState('')
  const [amount2, setAmount2] = useState('')

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount1(value)
    // Simulate price calculation
    if (value && !isNaN(Number.parseFloat(value))) {
      setAmount2((Number.parseFloat(value) * 125.34).toFixed(2))
    } else {
      setAmount2('')
    }
  }

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount2(value)
    // Simulate reverse price calculation
    if (value && !isNaN(Number.parseFloat(value))) {
      setAmount1((Number.parseFloat(value) / 125.34).toFixed(6))
    } else {
      setAmount1('')
    }
  }

  // Sample liquidity positions
  const positions = [
    {
      pair: 'BDAG-DAGR',
      token1: {
        symbol: 'BDAG',
        logo: '/bdag-token.png',
        amount: '0.5'
      },
      token2: {
        symbol: 'DAGR',
        logo: '/dagr-token.png',
        amount: '62.67'
      },
      value: '$1,250',
      apr: '45.2%'
    },
    {
      pair: 'BNB-USDT',
      token1: {
        symbol: 'BNB',
        logo: '/BNB-Abstract-Bull.png',
        amount: '2.3'
      },
      token2: {
        symbol: 'USDT',
        logo: '/tethered-currency.png',
        amount: '750'
      },
      value: '$1,500',
      apr: '32.8%'
    }
  ]

  return (
    <Card className='border-0 bg-[#1e1e45] rounded-[24px] shadow-lg overflow-hidden'>
      <CardContent className='p-6'>
        <Tabs defaultValue='add'>
          <TabsList className='grid w-full grid-cols-2 mb-6 bg-[#252550] p-1 rounded-full'>
            <TabsTrigger
              value='add'
              className='rounded-full data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
            >
              Add Liquidity
            </TabsTrigger>
            <TabsTrigger
              value='positions'
              className='rounded-full data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
            >
              Your Positions
            </TabsTrigger>
          </TabsList>

          <TabsContent value='add'>
            <div className='space-y-4'>
              <div className='rounded-[20px] bg-[#252550] p-4'>
                <div className='flex justify-between mb-2'>
                  <span className='text-sm text-white/70'>Token 1</span>
                  <span className='text-sm text-white/70'>
                    Balance: {token1.balance} {token1.symbol}
                  </span>
                </div>

                <div className='flex gap-2'>
                  <Input
                    type='number'
                    placeholder='0.0'
                    className='border-0 bg-transparent text-2xl text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0'
                    value={amount1}
                    onChange={handleAmount1Change}
                  />
                  <TokenSelector
                    selectedToken={token1}
                    onSelectToken={setToken1}
                  />
                </div>

                <div className='mt-2 text-sm text-white/70'>
                  $
                  {amount1
                    ? (Number.parseFloat(amount1) * 2500).toFixed(2)
                    : '0.00'}
                </div>
              </div>

              <div className='flex justify-center'>
                <div className='bg-[#252550] rounded-full p-2'>
                  <Plus className='h-4 w-4 text-white' />
                </div>
              </div>

              <div className='rounded-[20px] bg-[#252550] p-4'>
                <div className='flex justify-between mb-2'>
                  <span className='text-sm text-white/70'>Token 2</span>
                  <span className='text-sm text-white/70'>
                    Balance: {token2.balance} {token2.symbol}
                  </span>
                </div>

                <div className='flex gap-2'>
                  <Input
                    type='number'
                    placeholder='0.0'
                    className='border-0 bg-transparent text-2xl text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0'
                    value={amount2}
                    onChange={handleAmount2Change}
                  />
                  <TokenSelector
                    selectedToken={token2}
                    onSelectToken={setToken2}
                  />
                </div>

                <div className='mt-2 text-sm text-white/70'>
                  $
                  {amount2
                    ? (Number.parseFloat(amount2) * 20).toFixed(2)
                    : '0.00'}
                </div>
              </div>

              {amount1 && amount2 && (
                <div className='text-sm p-3 rounded-lg bg-[#252550]'>
                  <div className='flex justify-between'>
                    <span className='text-white/70'>Price</span>
                    <span className='text-white'>
                      1 {token1.symbol} = 125.34 {token2.symbol}
                    </span>
                  </div>
                  <div className='flex justify-between mt-1'>
                    <span className='text-white/70'>Share of Pool</span>
                    <span className='text-white'>0.02%</span>
                  </div>
                </div>
              )}

              <Button className='w-full bg-[#ff9d00] hover:bg-[#e68e00] text-white h-12 text-lg rounded-full'>
                Add Liquidity (Coming Soon)
              </Button>
            </div>
          </TabsContent>

          <TabsContent value='positions'>
            {positions.length > 0 ? (
              <div className='space-y-4'>
                {positions.map((position, index) => (
                  <div key={index} className='rounded-[20px] bg-[#252550] p-4'>
                    <div className='flex justify-between items-center mb-3'>
                      <div className='flex items-center gap-2'>
                        <div className='flex -space-x-2'>
                          <img
                            src={position.token1.logo || '/placeholder.svg'}
                            alt={position.token1.symbol}
                            className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                          />
                          <img
                            src={position.token2.logo || '/placeholder.svg'}
                            alt={position.token2.symbol}
                            className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                          />
                        </div>
                        <span className='font-medium'>{position.pair}</span>
                      </div>
                      <div className='text-right'>
                        <div className='font-medium'>{position.value}</div>
                        <div className='text-sm text-green-400'>
                          {position.apr} APR
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-between text-sm text-white/70'>
                      <span>
                        {position.token1.amount} {position.token1.symbol}
                      </span>
                      <ArrowRight className='h-4 w-4' />
                      <span>
                        {position.token2.amount} {position.token2.symbol}
                      </span>
                    </div>

                    <div className='flex gap-2 mt-3'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='flex-1 border-[#3a3a70] text-white hover:bg-[#3a3a70] hover:text-white'
                      >
                        Add
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        className='flex-1 border-[#3a3a70] text-white hover:bg-[#3a3a70] hover:text-white'
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-white/70'>
                  You don't have any liquidity positions yet.
                </p>
                <Button
                  variant='link'
                  className='mt-2 text-[#ff9d00] hover:text-[#e68e00]'
                  onClick={() => {
                    const addButton =
                      document.querySelector<HTMLElement>('[data-value="add"]')
                    if (addButton) {
                      addButton.click()
                    }
                  }}
                >
                  Add liquidity (Coming Soon)
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
