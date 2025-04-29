import Image from 'next/image'

const Benefits2 = () => {
  return (
    <div className='relative mt-16 flex justify-center items-center h-[80vh] overflow-hidden'>
      {/* Left Card */}
      <div className='absolute left-[5%] top-[40%] transform -translate-y-1/2 z-10'>
        <div className='bg-[#2a2a57] p-6 rounded-2xl shadow-lg text-white max-w-xs'>
          <h3 className='text-xl font-bold mb-2'>
            Trading <span className='text-yellow-400'>Decentralized</span> at{' '}
            <span className='text-yellow-400'>Lightning Speed</span>
          </h3>
          <p className='text-sm mb-4'>
            Revolutionizing the DeFi market with BlockDAG technology
          </p>
          <a
            href='/pitch-deck?lang=en'
            className='bg-gradient-to-r from-yellow-400 to-orange-500 text-[#161630] font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-200'
          >
            Learn More
          </a>
        </div>
      </div>

      <Image
        src='/assets/Layer 15.png'
        alt='Character 2'
        width={800}
        height={800}
        loading='lazy'
        className='max-w-8xl lg:max-w-10xl absolute top-0 right-0'
      />

      {/* Right Card */}
      <div className='absolute right-[5%] top-[55%] transform -translate-y-1/2 z-10'>
        <div className='bg-[#2a2a57] text-yellow-400 text-sm px-6 py-2 rounded-full shadow-lg'>
          1-2s Time
        </div>
      </div>
    </div>
  )
}

export default Benefits2
