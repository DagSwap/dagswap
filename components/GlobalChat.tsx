'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat, type Message } from '@ai-sdk/react'
import { cn } from '@/lib/utils' // Assuming shadcn utility
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, X, Send, AlertCircle, Sparkles } from 'lucide-react' // Using lucide icons

export function GlobalChat () {
  const [isOpen, setIsOpen] = useState(false)
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
    reload
  } = useChat({
    onError: err => {
      console.error('Client-side useChat error:', err)
    }
  })
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleClose = () => {
    setIsOpen(false)
  }

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      // Use setTimeout to allow the DOM to update before scrolling
      setTimeout(() => {
        const scrollElement = scrollAreaRef.current?.querySelector(
          '[data-radix-scroll-area-viewport]'
        )
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight
        }
      }, 100) // Increased delay slightly
    }
  }, [messages, isOpen])

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className='fixed bottom-4 right-4 rounded-full w-14 h-14 p-4 shadow-lg z-50'
          aria-label='Open Chat'
          size='icon'
        >
          <Sparkles className='h-8 w-8' />
        </Button>
      )}

      {isOpen && (
        <Card className='fixed bottom-4 right-4 w-96 flex flex-col h-[500px] z-40 shadow-xl'>
          <CardHeader className='flex flex-row items-center justify-between p-4 border-b'>
            <CardTitle className='text-lg font-semibold'>
              DagSwap Assistant
            </CardTitle>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleClose}
              className='text-muted-foreground hover:text-foreground'
              aria-label='Close Chat'
            >
              <X className='h-5 w-5' />
            </Button>
          </CardHeader>
          <CardContent className='flex-1 p-0 overflow-hidden'>
            <ScrollArea
              className='h-full px-4'
              ref={scrollAreaRef}
              type='always'
            >
              <div className='space-y-4 py-4'>
                {messages.length === 0 && !isLoading && (
                  <div className='text-center text-muted-foreground pt-4'>
                    Ask me anything about DagSwap!
                  </div>
                )}
                {messages.map((message: Message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex w-fit max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm break-words',
                      message.role === 'user'
                        ? 'ml-auto bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <span className='font-semibold capitalize'>
                      {message.role === 'user' ? 'You' : 'AI'}
                    </span>
                    {/* Render message content, handling potential newlines */}
                    {message.content.split('\n').map((line, index) => (
                      <span
                        key={index}
                        className='break-words whitespace-pre-wrap'
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                ))}
                {isLoading && (
                  <div className='flex justify-start'>
                    <div className='bg-muted rounded-lg px-3 py-2 text-sm flex items-center space-x-2'>
                      <span className='font-semibold capitalize'>AI</span>
                      <span className='animate-pulse'>...</span>{' '}
                      {/* Simple loading indicator */}
                    </div>
                  </div>
                )}
                {/* Display Error Message */}
                {error && (
                  <div className='flex justify-start'>
                    <div className='bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-3 py-2 text-sm flex items-center space-x-2'>
                      <AlertCircle className='h-4 w-4' />
                      <div>
                        <span className='font-semibold capitalize'>Error</span>
                        {/* Attempt to show details, check if error.message is useful */}
                        <span>
                          : {error.message || 'An unknown error occurred.'}
                        </span>
                        {/* Optionally add a reload button */}
                        {/* <Button variant="ghost" size="sm" onClick={() => reload()} className="ml-2">Retry</Button> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className='p-4 border-t'>
            <form
              onSubmit={handleSubmit}
              className='flex w-full items-center space-x-2'
            >
              <Input
                className='flex-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                value={input}
                onChange={handleInputChange}
                placeholder='Type a message...'
                disabled={isLoading}
              />
              <Button type='submit' size='icon' disabled={isLoading}>
                <Send className='h-4 w-4' />
                <span className='sr-only'>Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
