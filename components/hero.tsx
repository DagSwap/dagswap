import Image from 'next/image'
import Swap from './swap'
import { useState } from 'react'
import { VideoModal } from './VideoModal'
import { Button } from "@/components/ui/button"

export default function Hero () {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <div className='container mx-auto px-4 pt-4 pb-16 flex flex-col md:flex-row items-center md:items-start md:justify-between relative h-auto md:h-[75vh]'>
      <div className='hidden md:flex md:flex-col justify-start z-20'>
        <div>
          <div className='flex items-center mb-4'>
            <div className='relative'>
              <Image
                src='/assets/logo.svg'
                alt='Dag Logo'
                width={450}
                height={450}
              />
            </div>
            {/* <h1 className='text-8xl font-bold'>
              <span className='text-white'>Dag</span>
              <span className='text-dag-orange'>Swap</span>
            </h1> */}
          </div>
          <div>
            <p className='text-4xl font-light mb-8 tracking-wide'>
              LightSpeed Swap!
            </p>
            <div className='flex gap-4 mb-12'>
              <Button
                onClick={() => setIsVideoModalOpen(true)}
                variant="dagOrange"
                size="default"
                className="px-5 font-medium"
              >
                Start Trading
              </Button>
              <a
                href='/pdf'
                className='px-5 py-2 bg-transparent border border-[#ff9d00] text-[#ff9d00] rounded-full font-medium hover:bg-[#ff9d00]/10 transition-colors'
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='hidden md:block z-20'>
        <Swap />
      </div>

      <div className="md:hidden w-full flex justify-center z-20">
        <Swap />
      </div>

      <Image
        src='/assets/Layer 13.png'
        alt='Character'
        width={500}
        height={500}
        objectFit='contain'
        className='relative md:absolute mt-8 md:mt-0 bottom-0 md:bottom-[-100px] w-[70vw] max-w-[500px] md:w-auto md:max-w-none md:h-[800px] md:object-cover md:left-1/2 md:-translate-x-1/2'
      />
      
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onOpenChange={setIsVideoModalOpen}
        videoId="aRxCCP4zUts"
      />
    </div>
  )
}
