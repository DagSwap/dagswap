import Image from 'next/image'

const Benefits = () => {
  return (
    <div className='relative mt-16 flex justify-center items-center h-[80vh]'>
      {/* Left Card */}
      <div className='absolute left-[10%] bottom-[30%] transform -translate-y-1/2 z-10'>
        <div className='bg-[#2a2a57] text-yellow-400 text-sm px-6 py-2 rounded-full shadow-lg'>
          0.2% Comisiones
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
            DeFi <span className='text-yellow-400'>rápido, fácil</span> y{' '}
            <span className='text-yellow-400'>económico</span>.
          </h3>
          <p className='text-sm mb-4'>
            Procesamos transacciones en paralelo para confirmaciones en 1-2
            segundos, ofrecemos una interfaz súper simple y mantenemos las
            comisiones bajas y predecibles.
          </p>
          <button className='bg-gradient-to-r from-yellow-400 to-orange-500 text-[#161630] font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-200'>
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Benefits
