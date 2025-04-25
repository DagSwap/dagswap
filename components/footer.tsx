import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full border-t border-[#2a2a5a] bg-[#161630]/80 backdrop-blur-md py-2 px-4 text-center text-sm text-white'>
      © {new Date().getFullYear()} ParkourDevs x Infty Global — Proprietary
    </footer>
  )
}

export default Footer
