import Image from "next/image"
import Swap from "./swap"

export default function Hero() {
  return (
    <div className="pt-4 pb-16 flex flex-col relative items-center justify-start h-[85vh]">
      <div className="flex flex-row justify-between w-full z-20">
        <div>
          <div className="flex items-center mb-4">
            <div className="relative">
              <Image src="/assets/logo.png" alt="Dag Logo" width={64} height={64} />
            </div>
            <h1 className="text-8xl font-bold">
              <span className="text-white">Dag</span>
              <span className="text-dag-orange">Swap</span>
            </h1>
          </div>
          <div>
          
            <p className="text-4xl font-light mb-8 tracking-wide">LightSpeed Swap!</p>
            <div className="flex gap-4 mb-12">
              <a
                href="#"
                className="px-6 py-3 bg-[#ff9d00] text-white rounded-full font-medium hover:bg-[#e68e00] transition-colors"
              >
                Start Trading
              </a>
              <a
                href="#"
                className="px-6 py-3 bg-transparent border border-[#ff9d00] text-[#ff9d00] rounded-full font-medium hover:bg-[#ff9d00]/10 transition-colors"
              >
                Learn More
              </a>
            </div> 
          </div>
        </div>
        <Swap />
      </div>

      <Image
          src="/assets/Layer 3.png"
          alt="Character"
          width={800}
          height={800}
          objectFit="cover"
          className="absolute bottom-0"  
        />
    </div>
  )
}
