import Image from 'next/image'

const Benefits2 = () => {
  return (
    <div className='relative mt-16 flex justify-center items-center h-[80vh] overflow-hidden'>
      {/* Bottom Left Crystal */}
      <div className='absolute bottom-0 left-0 z-10 transform translate-x-[-20%] translate-y-[15%]'>
        <Image
          src='/assets/crystal.png'
          alt='Crystal'
          width={300}
          height={300}
          loading='lazy'
        />
      </div>

      {/* Left Card */}
      <div className='absolute left-[10%] top-[40%] transform -translate-y-1/2 z-10'>
        <div className='bg-[#2a2a57] p-6 rounded-2xl shadow-lg text-white max-w-xs'>
          <h3 className='text-xl font-bold mb-2'>Beneficio</h3>
          <p className='text-sm mb-4'>
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
            dolor sit amet
          </p>
          <button className='bg-gradient-to-r from-yellow-400 to-orange-500 text-[#161630] font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-200'>
            Swap
          </button>
        </div>
      </div>

      {/* Center Image */}
      <div className='relative z-0'>
        <Image
          src='/assets/Layer 15.png'
          alt='Character 2'
          width={800}
          height={800}
          loading='lazy'
          className='max-w-6xl lg:max-w-8xl'
        />
      </div>

      {/* Right Card */}
      <div className='absolute right-[10%] top-[60%] transform -translate-y-1/2 z-10'>
        <div className='bg-[#2a2a57] text-yellow-400 text-sm px-6 py-2 rounded-full shadow-lg'>
          Velocidad
        </div>
      </div>
    </div>
  )
}

export default Benefits2
