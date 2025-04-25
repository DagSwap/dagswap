'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function TeamPage() {
  // Always open, cannot be closed
  const [isOpen] = useState(true)
  
  return (
    <div className="relative w-full h-[100vh] bg-[#1F1B37] flex flex-col items-center justify-center overflow-hidden">
      {/* Team image as background */}
      <div className="w-full h-full absolute top-[-150px] left-0 z-0">
        <Image 
          src="/assets/team.png" 
          alt="DagSwap Team" 
          fill 
          style={{ objectFit: 'cover' }} 
          priority
        />
      </div>
      
      {/* Video Dialog that cannot be closed */}
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className='w-8xl max-w-4xl' overlayClassName='backdrop-blur-none'>
          <DialogHeader>
            <DialogTitle className='text-xl font-bold'>
              🎉 DagSwap Party Time! 🎉
            </DialogTitle>
            {/* No DialogClose component */}
          </DialogHeader>
          <div className='aspect-video w-full'>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xHBJS1b3v9E?autoplay=1"
              title="Team Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 