'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowDownIcon, Wallet } from 'lucide-react'
import TokenSelector from '@/components/token-selector'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'

export default function Swap () {
  const [fromToken, setFromToken] = useState({
    symbol: 'BDAG',
    name: 'BlockDAG',
    logo: '/cube.webp',
    balance: '1.245'
  })

  const [toToken, setToToken] = useState({
    symbol: 'DAGGR',
    name: 'DagSwap',
    logo: '/assets/logo.png',
    balance: '0'
  })

  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)

  const router = useRouter()

  const handleMaxClick = () => {
    setFromAmount(fromToken.balance)
    // Recalculate 'toAmount' based on the max 'fromAmount'
    if (fromToken.balance && !isNaN(Number.parseFloat(fromToken.balance))) {
      setToAmount((Number.parseFloat(fromToken.balance) * 125.34).toFixed(2))
    } else {
      setToAmount('')
    }
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFromAmount(value)
    // Simulate price calculation
    if (value && !isNaN(Number.parseFloat(value))) {
      setToAmount((Number.parseFloat(value) * 125.34).toFixed(2))
    } else {
      setToAmount('')
    }
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setToAmount(value)
    // Simulate reverse price calculation
    if (value && !isNaN(Number.parseFloat(value))) {
      setFromAmount((Number.parseFloat(value) / 125.34).toFixed(6))
    } else {
      setFromAmount('')
    }
  }

  const switchTokens = () => {
    const tempToken = fromToken
    setFromToken(toToken)
    setToToken(tempToken)

    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  return (
    <Card className='bg-[#342858]/40 backdrop-blur-lg rounded-[55px] shadow-lg border border-[#2a2a5a]/50 overflow-hidden min-w-[450px]'>
      <CardContent className='p-6'>
        <div className='mb-3'>
          <Tabs
            defaultValue='swap'
            className='w-full'
            onValueChange={val => {
              if (val === 'limit') router.push('/liquidity')
              else if (val === 'dca') router.push('/dca')
              // else do nothing (swap)
            }}
          >
            <TabsList className='inline-flex h-9 items-center py-6 bg-[#1A1630] justify-center rounded-full font-oxanium space-x-1'>
              <TabsTrigger
                value='swap'
                className='rounded-full px-3 py-2 text-sm font-medium text-white/70 data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
              >
                Swap
              </TabsTrigger>
              <TabsTrigger
                value='limit'
                className='rounded-full px-3 py-2 text-sm font-medium text-white/70 data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
              >
                Limit
              </TabsTrigger>
              <TabsTrigger
                value='dca'
                className='rounded-full px-3 py-2 text-sm font-medium text-white/70 data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
              >
                DCA
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className='space-y-1'>
          {/* Sell Card */}
          <div className='rounded-[20px] bg-[#4E377B]/40 p-4'>
            <div className='flex justify-between mb-2'>
              <span className='text-2xl text-white/70 font-oxanium'>Sell</span>
            </div>

            <div className='flex gap-2'>
              <Input
                type='number'
                placeholder='0.0'
                className='border-0 bg-transparent text-[#FFC94D] focus-visible:ring-0 focus-visible:ring-offset-0 p-0 font-oxanium placeholder:text-[#FFC94D]'
                style={{ fontSize: '1.5rem', lineHeight: '2rem' }}
                value={fromAmount}
                onChange={handleFromAmountChange}
              />
              <TokenSelector
                selectedToken={fromToken}
                onSelectToken={setFromToken}
              />
            </div>

            <div className='flex items-center justify-between mt-2'>
              <div className='text-sm text-white/70 font-oxanium'>
                ${' '}
                {fromAmount
                  ? (Number.parseFloat(fromAmount) * 2500).toFixed(2)
                  : '0.00'}
              </div>
              <span className='flex flex-row gap-1 items-center  text-sm text-white/70 font-oxanium'>
                <Wallet className='text-dag-orange' /> Balance:{' '}
                {fromToken.balance}
              </span>
            </div>
          </div>

          <div className='flex justify-center -my-4 z-10 relative'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full bg-[#342858]/40 border-2 border-[#4E377B] hover:bg-[#4E377B]/60 hover:border-[#4E377B] hover:text-white'
              onClick={switchTokens}
            >
              <ArrowDownIcon className='h-4 w-4' />
            </Button>
          </div>

          {/* Buy Card */}
          <div className='rounded-[20px]  bg-[#4E377B]/40 p-4'>
            <div className='flex justify-between mb-2'>
              <span className='text-sm text-white/70 font-oxanium'>Buy</span>
              <span className='text-sm text-white/70 font-oxanium'>
                Balance: {toToken.balance} {toToken.symbol}
              </span>
            </div>

            <div className='flex gap-2'>
              <Input
                type='number'
                placeholder='0.0'
                className='border-0 bg-transparent placeholder:text-[#FFC94D] text-[#FFC94D] focus-visible:ring-0 focus-visible:ring-offset-0 p-0 font-oxanium'
                style={{ fontSize: '1.5rem', lineHeight: '2rem' }}
                value={toAmount}
                onChange={handleToAmountChange}
              />
              <TokenSelector
                selectedToken={toToken}
                onSelectToken={setToToken}
              />
            </div>

            <div className='flex items-center justify-between mt-2'>
              <div className='text-sm text-white/70 font-oxanium'>
                ${' '}
                {toAmount
                  ? (Number.parseFloat(toAmount) * 20).toFixed(2)
                  : '0.00'}
              </div>
              <span className='flex flex-row gap-1 items-center  text-sm text-white/70 font-oxanium'>
                <Wallet className='text-dag-orange' /> Balance:{' '}
                {toToken.balance}
              </span>
            </div>
          </div>

          {fromAmount && toAmount && (
            <div className='text-sm p-3 rounded-lg bg-[#252550] font-oxanium'>
              <div className='flex justify-between'>
                <span className='text-white/70'>Price</span>
                <span className='text-white'>
                  1 {fromToken.symbol} = 125.34 {toToken.symbol}
                </span>
              </div>
              <div className='flex justify-between mt-1'>
                <span className='text-white/70'>Minimum received</span>
                <span className='text-white'>
                  {(Number.parseFloat(toAmount) * (1 - slippage / 100)).toFixed(
                    2
                  )}{' '}
                  {toToken.symbol}
                </span>
              </div>
              <div className='flex justify-between mt-1'>
                <span className='text-white/70'>Slippage Tolerance</span>
                <span className='text-white'>{slippage}%</span>
              </div>
            </div>
          )}
        </div>
        <Button className='w-full bg-[#ff9d00] hover:bg-[#e68e00] text-white h-12 text-lg rounded-full mt-3'>
          Swap
        </Button>
      </CardContent>
    </Card>
  )
}
