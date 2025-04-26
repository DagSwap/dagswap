'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Search, ChevronDown, Info, Calendar, Repeat } from 'lucide-react'
import TokenSelector from '@/components/token-selector'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface Token {
  symbol: string
  name?: string // Make name optional if not always present
  logo: string
  balance?: string // Make balance optional
}

interface DcaOrder {
  id: number
  fromToken: Token
  toToken: Token
  amount: string
  frequency: string
  nextExecution: string
  totalInvested: string
  tokensAcquired: string
  avgPrice: string
  status: string
  created: string
}

export default function DCA () {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created')
  const [selectedDCA, setSelectedDCA] = useState<DcaOrder | null>(null)
  const [showNewDCA, setShowNewDCA] = useState(false)

  // DCA form state
  const [fromToken, setFromToken] = useState<Token>({
    symbol: 'BDAG',
    name: 'BlockDAG',
    logo: '/cube.webp',
    balance: '1.245'
  })
  const [toToken, setToToken] = useState<Token>({
    symbol: 'DAGGR',
    name: 'DagSwap',
    logo: '/assets/logo.png',
    balance: '0'
  })
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState('weekly')
  const [duration, setDuration] = useState('3months')

  // Sample DCA orders
  const dcaOrders: DcaOrder[] = [
    {
      id: 1,
      fromToken: {
        symbol: 'BDAG',
        logo: '/cube.webp'
      },
      toToken: {
        symbol: 'DAGGR',
        logo: '/assets/logo.png'
      },
      amount: '150',
      frequency: 'Weekly',
      nextExecution: 'Apr 14, 2025',
      totalInvested: '$350',
      tokensAcquired: '17,895.45',
      avgPrice: '$0.0196',
      status: 'active',
      created: 'May 12, 2025'
    },
    {
      id: 2,
      fromToken: {
        symbol: 'USDT',
        logo: '/tethered-currency.png'
      },
      toToken: {
        symbol: 'ETH',
        logo: '/ethereal-threads.png'
      },
      amount: '100',
      frequency: 'Monthly',
      nextExecution: 'May 15, 2025',
      totalInvested: '$300',
      tokensAcquired: '0.092',
      avgPrice: '$3,260.87',
      status: 'active',
      created: 'mar 15, 2025'
    },
    {
      id: 3,
      fromToken: {
        symbol: 'BNB',
        logo: '/BNB-Abstract-Bull.png'
      },
      toToken: {
        symbol: 'CAKE',
        logo: '/colorful-layered-cake.png'
      },
      amount: '25',
      frequency: 'Daily',
      nextExecution: 'Apr 24, 2025',
      totalInvested: '$625',
      tokensAcquired: '255.10',
      avgPrice: '$2.45',
      status: 'active',
      created: 'Apr 10, 2025'
    }
  ]

  const filteredDCAOrders = dcaOrders
    .filter(
      order =>
        order.fromToken.symbol
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.toToken.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'created') {
        return new Date(b.created).getTime() - new Date(a.created).getTime()
      }
      if (sortBy === 'amount') {
        return Number.parseFloat(b.amount) - Number.parseFloat(a.amount)
      }
      return 0
    })

  const handleCreateDCA = () => {
    // In a real implementation, this would create a DCA order
    console.log(
      `Creating DCA order: ${amount} ${fromToken.symbol} to ${toToken.symbol} ${frequency}`
    )
    setShowNewDCA(false)
    // Reset form
    setAmount('')
  }

  const handleCancelDCA = (id: number | undefined) => {
    if (!id) return // Guard against undefined id
    // In a real implementation, this would cancel the DCA order
    console.log(`Cancelling DCA order ${id}`)
    setSelectedDCA(null)
  }

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ]

  const durationOptions = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: 'indefinite', label: 'Indefinite' }
  ]

  return (
    <Card className='border-0 bg-[#1e1e45] rounded-[24px] shadow-lg overflow-hidden'>
      <CardContent className='p-4 sm:p-6 md:p-8'>
        <Tabs defaultValue='active'>
          <TabsList className='grid w-full grid-cols-2 mb-6 bg-[#252550] p-1 rounded-full font-oxanium'>
            <TabsTrigger
              value='active'
              className='rounded-full data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
            >
              Active DCA
            </TabsTrigger>
            <TabsTrigger
              value='history'
              className='rounded-full data-[state=active]:bg-[#ff9d00] data-[state=active]:text-white'
            >
              History
            </TabsTrigger>
          </TabsList>

          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
            <div className='relative md:max-w-xs w-full'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-white/50' />
              <Input
                placeholder='Search DCA orders'
                className='pl-8 bg-[#252550] border-[#3a3a70] text-white rounded-full font-oxanium'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-white/70 font-oxanium'>
                  Sort by:
                </span>
                <Button
                  variant='outline'
                  className='flex items-center gap-1 bg-[#252550] border-[#3a3a70] text-white hover:bg-[#3a3a70] rounded-full font-oxanium'
                  onClick={() =>
                    setSortBy(sortBy === 'created' ? 'amount' : 'created')
                  }
                >
                  {sortBy === 'created' ? 'Date Created' : 'Amount'}
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </div>

              <Button
                variant="dagOrange"
                className="font-oxanium"
                onClick={() => setShowNewDCA(true)}
              >
                Create New DCA
              </Button>
            </div>
          </div>

          <TabsContent value='active'>
            <div className='rounded-[20px] overflow-hidden border border-[#3a3a70] bg-[#252550]/40'>
              <div className='overflow-x-auto'>
                {filteredDCAOrders.length > 0 ? (
                  <Table>
                    <TableHeader className='bg-[#252550]'>
                      <TableRow className='hover:bg-transparent border-b-[#3a3a70]'>
                        <TableHead className='text-white font-oxanium whitespace-nowrap'>
                          Pair
                        </TableHead>
                        <TableHead className='text-white font-oxanium whitespace-nowrap'>
                          Amount
                        </TableHead>
                        <TableHead className='text-white font-oxanium whitespace-nowrap'>
                          Frequency
                        </TableHead>
                        <TableHead className='text-white font-oxanium hidden md:table-cell whitespace-nowrap'>
                          Next Execution
                        </TableHead>
                        <TableHead className='text-white font-oxanium hidden md:table-cell whitespace-nowrap'>
                          Total Invested
                        </TableHead>
                        <TableHead className='text-white font-oxanium hidden lg:table-cell whitespace-nowrap'>
                          Tokens Acquired
                        </TableHead>
                        <TableHead className='text-white font-oxanium hidden md:table-cell whitespace-nowrap'>
                          Avg Price
                        </TableHead>
                        <TableHead className='text-right whitespace-nowrap'>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDCAOrders.map(order => (
                        <TableRow
                          key={order.id}
                          className='hover:bg-[#252550] border-b-[#3a3a70]'
                        >
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <div className='flex -space-x-2'>
                                <img
                                  src={order.fromToken.logo || '/placeholder.svg'}
                                  alt={order.fromToken.symbol}
                                  className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                                />
                                <img
                                  src={order.toToken.logo || '/placeholder.svg'}
                                  alt={order.toToken.symbol}
                                  className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                                />
                              </div>
                              <span className='font-oxanium'>
                                {order.fromToken.symbol} → {order.toToken.symbol}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className='font-medium font-oxanium'>
                            ${order.amount}
                          </TableCell>
                          <TableCell className='font-oxanium'>
                            {order.frequency}
                          </TableCell>
                          <TableCell className='hidden md:table-cell font-oxanium'>
                            {order.nextExecution}
                          </TableCell>
                          <TableCell className='hidden md:table-cell font-oxanium'>
                            {order.totalInvested}
                          </TableCell>
                          <TableCell className='hidden lg:table-cell font-oxanium'>
                            {order.tokensAcquired} {order.toToken.symbol}
                          </TableCell>
                          <TableCell className='hidden md:table-cell font-oxanium'>
                            {order.avgPrice}
                          </TableCell>
                          <TableCell className='text-right'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() => setSelectedDCA(order)}
                                  className='bg-[#252550] border-[#3a3a70] text-white hover:bg-[#3a3a70] rounded-full font-oxanium'
                                >
                                  Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className='bg-[#252550] border-[#3a3a70] text-white rounded-[20px]'>
                                <DialogHeader>
                                  <DialogTitle className='font-oxanium'>
                                    DCA Order Details
                                  </DialogTitle>
                                </DialogHeader>
                                <div className='py-4'>
                                  <div className='flex items-center gap-2 mb-4'>
                                    <div className='flex -space-x-2'>
                                      <img
                                        src={
                                          selectedDCA?.fromToken.logo ||
                                          '/placeholder.svg'
                                        }
                                        alt={selectedDCA?.fromToken.symbol}
                                        className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                                      />
                                      <img
                                        src={
                                          selectedDCA?.toToken.logo ||
                                          '/placeholder.svg'
                                        }
                                        alt={selectedDCA?.toToken.symbol}
                                        className='w-8 h-8 rounded-full border-2 border-[#1e1e45]'
                                      />
                                    </div>
                                    <span className='font-medium font-oxanium'>
                                      {selectedDCA?.fromToken.symbol} →{' '}
                                      {selectedDCA?.toToken.symbol}
                                    </span>
                                  </div>

                                  <div className='space-y-3 font-oxanium'>
                                    <div className='flex justify-between'>
                                      <span className='text-white/70'>
                                        Amount per period:
                                      </span>
                                      <span className='font-medium'>
                                        ${selectedDCA?.amount}
                                      </span>
                                    </div>
                                    <div className='flex justify-between'>
                                      <span className='text-white/70'>
                                        Frequency:
                                      </span>
                                      <span className='font-medium'>
                                        {selectedDCA?.frequency}
                                      </span>
                                    </div>
                                    <div className='flex justify-between'>
                                      <span className='text-white/70'>
                                        Next execution:
                                      </span>
                                      <span className='font-medium'>
                                        {selectedDCA?.nextExecution}
                                      </span>
                                    </div>
                                    <div className='flex justify-between'>
                                      <span className='text-white/70'>
                                        Total invested:
                                      </span>
                                      <span className='font-medium'>
                                        {selectedDCA?.totalInvested}
                                      </span>
                                    </div>
                                    <div className='flex justify-between'>
                                      <span className='text-white/70'>
                                        Tokens acquired:
                                      </span>
                                      <span className='font-medium'>
                                        {selectedDCA?.tokensAcquired}{' '}
                                        {selectedDCA?.toToken.symbol}
                                      </span>
                                    </div>
                                    <div className='flex justify-between'>
                                      <span className='text-white/70'>
                                        Average price:
                                      </span>
                                      <span className='font-medium'>
                                        {selectedDCA?.avgPrice}
                                      </span>
                                    </div>
                                    <div className='flex justify-between'>
                                      <span className='text-white/70'>
                                        Created on:
                                      </span>
                                      <span className='font-medium'>
                                        {selectedDCA?.created}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant='outline'
                                    onClick={() => setSelectedDCA(null)}
                                    className='border-[#3a3a70] text-white hover:bg-[#3a3a70] rounded-full font-oxanium'
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleCancelDCA(selectedDCA?.id)
                                    }
                                    className='bg-red-500 hover:bg-red-600 text-white rounded-full font-oxanium'
                                  >
                                    Cancel DCA
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className='text-center py-12 font-oxanium'>
                    <p className='text-white/70'>
                      You don't have any active DCA orders.
                    </p>
                    <Button
                      variant='link'
                      className='mt-2 text-dag-orange hover:text-[#e68e00] font-oxanium'
                      onClick={() => setShowNewDCA(true)}
                    >
                      Create your first DCA
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='history'>
            <div className='text-center py-12 font-oxanium'>
              <p className='text-white/70'>No completed DCA orders found.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Create New DCA Dialog */}
      <Dialog open={showNewDCA} onOpenChange={setShowNewDCA}>
        <DialogContent className='bg-[#252550] border-[#3a3a70] text-white rounded-[20px]'>
          <DialogHeader>
            <DialogTitle className='font-oxanium'>Create DCA Order</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            <div className='space-y-6'>
              <div className='space-y-2'>
                <Label
                  htmlFor='amount'
                  className='text-white font-oxanium text-base'
                >
                  Amount per period
                </Label>
                <div className='flex items-center gap-2'>
                  <span className='text-white/70 text-lg'>$</span>
                  <Input
                    id='amount'
                    type='number'
                    placeholder='50'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className='bg-[#1e1e45] border-[#3a3a70] text-white rounded-full font-oxanium text-lg py-6'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label className='text-white font-oxanium text-base'>
                    From
                  </Label>
                  <TokenSelector
                    selectedToken={fromToken}
                    onSelectToken={setFromToken}
                  />
                </div>
                <div className='space-y-2'>
                  <Label className='text-white font-oxanium text-base'>
                    To
                  </Label>
                  <TokenSelector
                    selectedToken={toToken}
                    onSelectToken={setToToken}
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label className='text-white font-oxanium text-base flex items-center gap-1'>
                    <Repeat className='h-4 w-4' /> Frequency
                  </Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className='bg-[#1e1e45] border-[#3a3a70] text-white rounded-full font-oxanium h-12'>
                      <SelectValue placeholder='Select frequency' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#252550] border-[#3a3a70] text-white font-oxanium'>
                      {frequencyOptions.map(option => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className='font-oxanium'
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label className='text-white font-oxanium text-base flex items-center gap-1'>
                    <Calendar className='h-4 w-4' /> Duration
                  </Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className='bg-[#1e1e45] border-[#3a3a70] text-white rounded-full font-oxanium h-12'>
                      <SelectValue placeholder='Select duration' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#252550] border-[#3a3a70] text-white font-oxanium'>
                      {durationOptions.map(option => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className='font-oxanium'
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='rounded-lg bg-[#1e1e45] p-3 font-oxanium'>
                <div className='flex items-center gap-1 mb-2'>
                  <Info className='h-4 w-4 text-[#ff9d00]' />
                  <span className='text-sm font-medium'>DCA Summary</span>
                </div>
                <p className='text-sm text-white/70'>
                  {amount ? `$${amount}` : '$0'} will be invested {frequency} to
                  purchase {toToken.symbol} for{' '}
                  {duration === 'indefinite'
                    ? 'an indefinite period'
                    : duration
                        .replace('months', ' months')
                        .replace('year', ' year')}
                  .
                </p>
                <p className='text-sm text-white/70 mt-1'>
                  This strategy helps reduce the impact of volatility and
                  potentially lower your average cost over time.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowNewDCA(false)}
              className='border-[#3a3a70] text-white hover:bg-[#3a3a70] rounded-full font-oxanium'
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateDCA}
              disabled={
                !amount ||
                isNaN(Number.parseFloat(amount)) ||
                Number.parseFloat(amount) <= 0
              }
              variant="dagOrange"
              className="font-oxanium"
            >
              Create DCA Order (Coming Soon)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
