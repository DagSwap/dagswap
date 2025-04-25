'use client'

import { Label } from '@/components/ui/label'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import { Search, ChevronDown, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

// Define the type for a single farm
interface FarmType {
  id: number
  pair: string
  token1: {
    symbol: string
    logo: string
  }
  token2: {
    symbol: string
    logo: string
  }
  apr: number
  tvl: string
  multiplier: string
  earned: number
}

export default function Farm () {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('apr')
  const [selectedFarm, setSelectedFarm] = useState<FarmType | null>(null)
  const [stakeAmount, setStakeAmount] = useState('')
  const [activeTab, setActiveTab] = useState('active')

  // Sample farm data
  const farms: FarmType[] = [
    {
      id: 1,
      pair: 'BDAG-DAGR',
      token1: {
        symbol: 'BDAG',
        logo: '/bdag-token.png'
      },
      token2: {
        symbol: 'DAGR',
        logo: '/dagr-token.png'
      },
      apr: 45.2,
      tvl: '$2.5M',
      multiplier: '40x',
      earned: 0
    },
    {
      id: 2,
      pair: 'BNB-USDT',
      token1: {
        symbol: 'BNB',
        logo: '/BNB-Abstract-Bull.png'
      },
      token2: {
        symbol: 'USDT',
        logo: '/tethered-currency.png'
      },
      apr: 32.8,
      tvl: '$4.1M',
      multiplier: '30x',
      earned: 0
    },
    {
      id: 3,
      pair: 'CAKE-USDC',
      token1: {
        symbol: 'CAKE',
        logo: '/colorful-layered-cake.png'
      },
      token2: {
        symbol: 'USDC',
        logo: '/digital-usdc-flow.png'
      },
      apr: 28.5,
      tvl: '$3.2M',
      multiplier: '25x',
      earned: 0
    }
  ]

  const filteredFarms = farms
    .filter(farm => farm.pair.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'apr') return b.apr - a.apr
      if (sortBy === 'multiplier')
        return Number.parseInt(b.multiplier) - Number.parseInt(a.multiplier)
      return 0
    })

  const handleStake = () => {
    // In a real implementation, this would interact with smart contracts
    if (selectedFarm) {
      console.log(`Staking ${stakeAmount} LP tokens for ${selectedFarm.pair}`)
    }
    // Close dialog
    setSelectedFarm(null)
    setStakeAmount('')
  }

  return (
    <Card className='border-0 bg-[#1e1e45] rounded-[24px] shadow-lg overflow-hidden'>
      <CardContent className='p-6'>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          defaultValue='active'
        >
          <TabsList className='grid w-full grid-cols-2 mb-6 bg-[#252550] p-1 rounded-full'>
            <TabsTrigger
              value='active'
              className='rounded-full data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value='staked'
              className='rounded-full data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
            >
              Staked
            </TabsTrigger>
          </TabsList>

          <div className='flex flex-col md:flex-row md:items-center gap-4 mb-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-white/50' />
              <Input
                placeholder='Search farms'
                className='pl-8 bg-[#252550] border-[#3a3a70] text-white rounded-full'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-sm text-white/70'>Sort by:</span>
              <Button
                variant='outline'
                className='flex items-center gap-1 bg-[#252550] border-[#3a3a70] text-white hover:bg-[#3a3a70] rounded-full'
                onClick={() =>
                  setSortBy(sortBy === 'apr' ? 'multiplier' : 'apr')
                }
              >
                {sortBy === 'apr' ? 'APR' : 'Multiplier'}
                <ChevronDown className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <TabsContent value='active'>
            <div className='rounded-xl overflow-hidden'>
              <Table>
                <TableHeader className='bg-[#252550]'>
                  <TableRow className='hover:bg-transparent border-b-[#3a3a70]'>
                    <TableHead className='text-white'>Farm</TableHead>
                    <TableHead className='text-white'>
                      <div className='flex items-center gap-1'>
                        APR
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className='h-3.5 w-3.5 text-white/50' />
                            </TooltipTrigger>
                            <TooltipContent className='bg-[#252550] border-[#3a3a70] text-white'>
                              <p>Annual Percentage Rate</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead className='text-white'>TVL</TableHead>
                    <TableHead className='text-white'>Multiplier</TableHead>
                    <TableHead className='text-white'>Earned</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFarms.map(farm => (
                    <TableRow
                      key={farm.id}
                      className='hover:bg-[#252550] border-b-[#3a3a70]'
                    >
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <div className='flex -space-x-2'>
                            <img
                              src={farm.token1.logo || '/placeholder.svg'}
                              alt={farm.token1.symbol}
                              className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                            />
                            <img
                              src={farm.token2.logo || '/placeholder.svg'}
                              alt={farm.token2.symbol}
                              className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                            />
                          </div>
                          <span>{farm.pair}</span>
                        </div>
                      </TableCell>
                      <TableCell className='font-medium text-green-400'>
                        {farm.apr}%
                      </TableCell>
                      <TableCell>{farm.tvl}</TableCell>
                      <TableCell>{farm.multiplier}</TableCell>
                      <TableCell>{farm.earned} DAGR</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => setSelectedFarm(farm)}
                              className='bg-[#252550] border-[#3a3a70] text-white hover:bg-[#3a3a70] rounded-full'
                            >
                              Stake
                            </Button>
                          </DialogTrigger>
                          <DialogContent className='bg-[#252550] border-[#3a3a70] text-white rounded-[20px]'>
                            <DialogHeader>
                              <DialogTitle>Stake LP Tokens</DialogTitle>
                            </DialogHeader>
                            <div className='py-4'>
                              <div className='flex items-center gap-2 mb-4'>
                                <div className='flex -space-x-2'>
                                  <img
                                    src={
                                      selectedFarm?.token1.logo ||
                                      '/placeholder.svg'
                                    }
                                    alt={selectedFarm?.token1.symbol}
                                    className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                                  />
                                  <img
                                    src={
                                      selectedFarm?.token2.logo ||
                                      '/placeholder.svg'
                                    }
                                    alt={selectedFarm?.token2.symbol}
                                    className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                                  />
                                </div>
                                <span className='font-medium'>
                                  {selectedFarm?.pair}
                                </span>
                              </div>

                              <div className='space-y-2'>
                                <div className='flex justify-between'>
                                  <Label
                                    htmlFor='stake-amount'
                                    className='text-white'
                                  >
                                    Stake Amount
                                  </Label>
                                  <span className='text-sm text-white/70'>
                                    Balance: 0.0 LP
                                  </span>
                                </div>
                                <Input
                                  id='stake-amount'
                                  type='number'
                                  placeholder='0.0'
                                  value={stakeAmount}
                                  onChange={e => setStakeAmount(e.target.value)}
                                  className='bg-[#1e1e45] border-[#3a3a70] text-white rounded-full'
                                />
                              </div>

                              <div className='mt-4 text-sm'>
                                <div className='flex justify-between'>
                                  <span className='text-white/70'>
                                    Annual ROI at current rates:
                                  </span>
                                  <span className='font-medium'>
                                    {stakeAmount &&
                                    !isNaN(Number.parseFloat(stakeAmount)) &&
                                    selectedFarm
                                      ? `${(
                                          ((Number.parseFloat(stakeAmount) *
                                            selectedFarm.apr) /
                                            100) *
                                          10
                                        ).toFixed(2)}`
                                      : '$0.00'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant='outline'
                                onClick={() => setSelectedFarm(null)}
                                className='border-[#3a3a70] text-white hover:bg-[#3a3a70] rounded-full'
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleStake}
                                disabled={
                                  !stakeAmount ||
                                  isNaN(Number.parseFloat(stakeAmount)) ||
                                  Number.parseFloat(stakeAmount) <= 0
                                }
                                className='bg-[#ff9d00] hover:bg-[#e68e00] text-white rounded-full'
                              >
                                Confirm
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value='staked'>
            <div className='text-center py-12'>
              <p className='text-white/70'>
                You don't have any staked farms yet.
              </p>
              <Button
                variant='link'
                className='mt-2 text-[#ff9d00] hover:text-[#e68e00]'
                onClick={() => setActiveTab('active')}
              >
                Stake in a farm
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
