"use client";

import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetState, setMeetState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>();
  const createMeeting = () => {
    
  }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
     <HomeCard img="/icons/new-meet.png"
      title="New Meeting"
      description="Start an Instant Meeting"
      className="bg-indigo-500"
      handleClick={() => setMeetState('isInstantMeeting')}
     />  
     <HomeCard img="/icons/schedule-meet.png"
      title="Schedule Meeting"
      description="Plan Your Meeting"
      className="bg-orange-400"
      handleClick={() => setMeetState('isScheduleMeeting')}
      />
     <HomeCard img="/icons/recordings.png"
      title="View Recordings"
      description="Check your Meet Recordings"
      className="bg-[#c2ed02]"
      handleClick={() => router.push('/meetings/recordings')}
      />
     <HomeCard img="/icons/join-meet.png"
      title="Join Meeting"
      description="Via Invitation Link"
      className="bg-pink-500"
      handleClick={() => setMeetState('isJoinMeeting')}
      />

      <MeetingModal isOpen={meetState === 'isInstantMeeting'}
       onClose={() => setMeetState(undefined)}
       title="Start an Instant Meeting" className="text-center"
       buttonText="Start Meeting" handleClick={createMeeting}

      />
    </section>
  )  
}

export default MeetingTypeList