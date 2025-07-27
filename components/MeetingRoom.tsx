import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const isPersonalRoom = !!searchParams.get('personal'); //to return boolean value
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if(callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout /> 
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left' />
      default:
        return <SpeakerLayout participantsBarPosition='right' />
    }
  }

  return (
    <div className='text-white relative h-screen w-full overflow-hidden pt-4'>
      <div className='relative flex size-full items-center justify-center'>
       <div className='flex size-full max-w-[1000px] items-center'>
        <CallLayout /> 
       </div>
       <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block': showParticipants})}>
        <CallParticipantsList onClose={() => setShowParticipants(false)} />
       </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-6 flex-wrap'>
       <CallControls />

       <DropdownMenu>
       <div className='flex items-center'>
        <DropdownMenuTrigger className='cursor-pointer rounded-2xl px-4 py-2 bg-[#21252b] hover:bg-gray-600'>
          <LayoutList size={20} className='text-white' />
        </DropdownMenuTrigger>
       </div>
       <DropdownMenuContent className="border-gray-900 bg-gray-800 text-white">
        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, idx) => (
          <div key={idx}>
           <DropdownMenuItem className='cursor-pointer'
            onClick={() => {
              setLayout(item.toLowerCase() as CallLayoutType)
            }}
           >
            {item}
           </DropdownMenuItem>
           <DropdownMenuSeparator />
          </div>
        ) )}
       </DropdownMenuContent>
       </DropdownMenu>
       <CallStatsButton />
       <button onClick={() => setShowParticipants((prev) => !prev)}>
        <div className='cursor-pointer rounded-2xl px-4 py-2 bg-[#21252b] hover:bg-gray-600'>
          <Users size={20} className='text-white' />
        </div>
       </button>
       {!isPersonalRoom && <EndCallButton />}
      </div>
    </div>
  )
}

export default MeetingRoom