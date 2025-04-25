'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card' // Assuming shadcn/ui Card path
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table' // Assuming shadcn/ui Table path
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import Farm from './farm'

// Mock data for demonstration
const stats = [
  { title: 'Total Value Locked (TVL)', value: '$1,234,567', change: '+2.5%' },
  { title: '24h Trading Volume', value: '$456,789', change: '+10.1%' },
  { title: 'Total Swaps (24h)', value: '1,234', change: '-1.2%' }
]

const topPairs = [
  { pair: 'ETH/USDC', volume: '$150,000', price: '$3,000' },
  { pair: 'WBTC/ETH', volume: '$120,000', price: '20.5 ETH' },
  { pair: 'SOL/USDT', volume: '$95,000', price: '$150' }
]

// Mock data for the chart
const chartData = [
  { name: 'Jan', volume: 4000 },
  { name: 'Feb', volume: 3000 },
  { name: 'Mar', volume: 2000 },
  { name: 'Apr', volume: 2780 },
  { name: 'May', volume: 1890 },
  { name: 'Jun', volume: 2390 },
  { name: 'Jul', volume: 3490 }
]

const AnalyticsComponent: React.FC = () => {
  return (
    <div className='space-y-8 p-4 md:p-8'>
      {/* Stats Cards Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              {/* Optional: Add an icon here */}
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-xs text-muted-foreground'>
                {stat.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Farm />

      {/* Replaced Line Chart with Area Chart */}
      <div>
        <h3 className='text-2xl font-semibold tracking-tight mb-4'>
          Trading Volume (Monthly)
        </h3>
        <Card>
          <CardContent className='pt-6'>
            <ResponsiveContainer width='100%' height={300}>
              {/* Changed LineChart to AreaChart */}
              <AreaChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                {/* Define gradient for Area fill */}
                <defs>
                  <linearGradient id='colorVolume' x1='0' y1='0' x2='0' y2='1'>
                    <stop
                      offset='5%'
                      stopColor='hsl(var(--primary))'
                      stopOpacity={0.8}
                    />
                    <stop
                      offset='95%'
                      stopColor='hsl(var(--primary))'
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))'
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                {/* Changed Line to Area, added gradient fill */}
                <Area
                  type='monotone'
                  dataKey='volume'
                  stroke='hsl(var(--primary))'
                  fillOpacity={1}
                  fill='url(#colorVolume)'
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AnalyticsComponent
