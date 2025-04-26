'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea' // Although not strictly required by the prompt, a message field might be useful
import { useToast } from "@/components/ui/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    wallet: '',
    message: '' // Optional message field
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement form submission logic (e.g., send data to an API endpoint)
    console.log('Form data submitted:', formData)

    // Example: Show a success toast
    toast({
      title: "Registration Submitted!",
      description: "We've received your details. Stay tuned for updates!",
    })

    // Optionally clear the form
    setFormData({
      name: '',
      email: '',
      telegram: '',
      wallet: '',
      message: ''
    })
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 font-oxanium text-white">Contact & Registration</h2>
      <p className="text-center text-white/80 mb-8">
        Register to get notifications of our releases (Token Pre-sale or Airdrop for early adopters).
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-white/90 font-oxanium">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-white/90 font-oxanium">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
          />
        </div>
        <div>
          <Label htmlFor="telegram" className="text-white/90 font-oxanium">Telegram Handle (Optional)</Label>
          <Input
            type="text"
            id="telegram"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="@yourhandle"
            className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
          />
        </div>
        <div>
          <Label htmlFor="wallet" className="text-white/90 font-oxanium">Wallet Address (Optional)</Label>
          <Input
            type="text"
            id="wallet"
            name="wallet"
            value={formData.wallet}
            onChange={handleChange}
            placeholder="0x..."
            className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
          />
        </div>
        {/* Optional Message Field */}
        {/* <div>
          <Label htmlFor="message" className="text-white/90 font-oxanium">Message (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Any additional comments?"
            className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
          />
        </div> */}
        <Button type="submit" variant="dagOrange" className="w-full font-oxanium">
          Register for Updates
        </Button>
      </form>
    </div>
  )
} 