import React from 'react'
import Image from 'next/image';

const HomeCard = ({img, title, description, handleClick, className}:{
  img: string, title: string, description: string, handleClick: () => void, className: string
}) => {
  return (
    <div className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[220px] rounded-2xl cursor-pointer`} onClick={handleClick}>
      <div className='flex-center glassmorphism size-12 rounded-[10px]'>
       <Image src={img} alt='Add-Meeting' width={38} height={36} className='rounded-md' />
      </div>
      <div className='flex flex-col gap-2'>
       <h1 className='text-2xl font-bold'>{title}</h1>
       <p className='text-lg font-normal'>{description}</p>
      </div>
     </div>
  )
}

export default HomeCard