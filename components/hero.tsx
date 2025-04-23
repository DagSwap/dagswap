export default function Hero() {
  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-[#6c3ce9] rounded-lg rotate-45 relative overflow-hidden">
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#ff9d00] rounded-full"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
            D
          </div>
        </div>
        <h1 className="text-5xl font-bold font-oxanium">
          <span className="text-white">Dag</span>
          <span className="text-[#ff9d00]">Swap</span>
        </h1>
      </div>
      <p className="text-2xl font-light mb-8 font-oxanium tracking-wide">LightSpeed Swap!</p>
      <div className="flex gap-4">
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
  )
}
