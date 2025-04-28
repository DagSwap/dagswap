'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { submitContactForm } from '@/app/actions/contact'

export default function ContactForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    wallet: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await submitContactForm(formData)

    if (result.success) {
      setFormData({
        name: '',
        email: '',
        telegram: '',
        wallet: '',
        message: ''
      })
      setShowSuccessDialog(true)
    } else {
      toast({
        title: "Submission Failed",
        description: result.error || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  return (
    <>
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
              disabled={isSubmitting}
              className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00] disabled:opacity-50"
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
              disabled={isSubmitting}
              className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00] disabled:opacity-50"
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
              disabled={isSubmitting}
              className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00] disabled:opacity-50"
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
              disabled={isSubmitting}
              className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00] disabled:opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-white/90 font-oxanium">Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Any additional comments?"
              disabled={isSubmitting}
              className="mt-1 bg-[#1e1e45] border-[#2a2a5a] text-white placeholder:text-white/50 focus:ring-[#ff9d00] focus:border-[#ff9d00] disabled:opacity-50"
            />
          </div>
          <Button type="submit" variant="dagOrange" className="w-full font-oxanium" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register for Updates'}
          </Button>
        </form>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-[#1e1e45] border-[#2a2a5a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white font-oxanium">Submission Successful!</AlertDialogTitle>
            <AlertDialogDescription className="text-white/80">
              Thanks for contacting us! We have received your details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-[#ff9d00] hover:bg-[#e68a00] text-black font-oxanium" onClick={() => setShowSuccessDialog(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 