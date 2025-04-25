import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full border-t border-neutral-800 bg-neutral-950 py-2 px-4 text-center text-xs text-neutral-500'>
      © {new Date().getFullYear()} DagSwap. All rights reserved.
    </footer>
  )
}

export default Footer
