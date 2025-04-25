'use client'

import { useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'

interface VideoModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}
export function VideoModal ({ 
  isOpen, 
  onOpenChange, 
  videoId = 'xHBJS1b3v9E' 
}: VideoModalProps & { videoId?: string }) {

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='w-8xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>
            🎉 DagSwap Party Time! 🎉
          </DialogTitle>
          <DialogClose className='absolute right-4 top-4' />
        </DialogHeader>
        <div className='aspect-video w-full'>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
} 