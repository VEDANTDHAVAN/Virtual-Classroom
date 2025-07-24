import MeetingTypeList from '@/components/MeetingTypeList';
import Image from 'next/image'
import React from 'react'

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  const date = (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format(now);

  return (
    <section className='flex w-full flex-col gap-10 text-white'>
     <div className='relative sm:h-[300px] md:h-[400px] lg:h-[480px] w-full rounded-[25px] overflow-hidden shadow-lg'>
      <Image src="/images/home.png" alt="Home" fill
          className="object-cover object-center" priority/>
     </div>
     <div className='bg-cyan-400 max-w-fit rounded-2xl flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
      <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center font-bold text-gray-600 p-2'>Upcoming Meeting at: 10:30 AM</h2>
      <br />
      <div className='flex flex-col gap-2'>
       <h1 className='text-4xl font-extrabold lg:text-7xl text-gray-800'>
        {time}
       </h1>
       <p className='text-lg font-medium lg:text-2xl text-gray-500'>{date}</p>
      </div>
     </div>
     <MeetingTypeList />
    </section>
  )
}

export default Home