import Image from 'next/image'

const Benefits = () => {
  return (
    <div className='relative mt-16 flex justify-center items-center h-[80vh]'>
      {/* Left Card */}
      <div className='absolute left-[10%] bottom-[30%] transform -translate-y-1/2 z-10'>
        <div className='bg-[#2a2a57] text-yellow-400 text-sm px-6 py-2 rounded-full shadow-lg'>
          0.2% Commissions
        </div>
      </div>

      <Image
        src='/assets/Layer 14.png'
        alt='Character'
        width={800}
        height={800}
        loading='lazy'
        className='max-w-8xl lg:max-w-10xl absolute top-0 left-0'
      />

      {/* Right Card */}
      <div className='absolute right-[25%] top-[40%] transform -translate-y-1/2 z-10'>
        <div className='bg-[#2a2a57] p-6 rounded-2xl shadow-lg text-white max-w-xs'>
          <h3 className='text-xl font-bold mb-2'>
            DeFi <span className='text-yellow-400'>fast, easy</span> and{' '}
            <span className='text-yellow-400'>affordable</span>.
          </h3>
          <p className='text-sm mb-4'>
            We process transactions in parallel for confirmations in 1-2
            seconds, offer a super simple interface and keep
            fees low and predictable.
          </p>
          <a
            href='/pitch-deck?lang=en'
            className='bg-gradient-to-r from-yellow-400 to-orange-500 text-[#161630] font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-200'
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

export default Benefits
