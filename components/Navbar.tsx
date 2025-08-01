import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full px-6 py-4 bg-[#131143] lg:px-10'>
     <Link href="/" className='flex items-center gap-1'>
      <Image src="/icons/logo.png" width={40} height={40} alt='SmartSpace' className='rounded-lg max-sm:size-10' />
      <p className='text-[26px] font-extrabold text-white pl-1 max-sm:hidden'>SmartSpace</p>
     </Link>
     <div className='flex-between gap-5'>
       <SignedIn>
          <UserButton />
       </SignedIn>
      <MobileNav />
     </div>
    </nav>
  )
}

export default Navbar