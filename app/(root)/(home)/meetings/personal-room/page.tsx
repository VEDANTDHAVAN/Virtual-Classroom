"use client";

import { Button } from '@/components/ui/button';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const Table = ({title, description}:{
  title: string, description: string
}) => (
  <div className='flex flex-col items-start justify-start gap-3 xl:flex-row'>
    <h1 className='text-xl font-semibold text-cyan-100'>{title}</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[360px] lg:text-xl'>{description}</h1>
  </div>
)

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const client = useStreamVideoClient();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

  const { call } = useGetCallById(meetingId!);
  const router = useRouter();

  const startRoom = async () => {
    if(!client || !user) return;

    if(!call) {
      const newCall = client.call('default', meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  }

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
     <h1 className='text-3xl font-bold'>
      Personal Room
     </h1>

     <div className='flex w-full flex-col gap-8 xl:max-w-[920px]'>
      <Table title='Topic:' description={`${user?.username}'s meeting room`} />
      <Table title='Meeting ID:' description={meetingId!} />
      <Table title='Invite Link:' description={meetingLink} />
     </div>
     <div className='flex gap-6'>
      <Button className='bg-blue-500 cursor-pointer' onClick={startRoom}>
       Start Meeting
      </Button>
      <Button className='bg-cyan-900 cursor-pointer' onClick={() => {
        navigator.clipboard.writeText(meetingLink);
        toast("Link Copied");
      }}>
       Copy Invitation Link
      </Button>
     </div>
    </section>
  )
}

export default PersonalRoom