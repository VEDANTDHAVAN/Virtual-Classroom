"use client";

import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

interface MeetingProps {
  params: {id: string};
}

const Meeting = ({params}: MeetingProps) => {
  const { isLoaded } = useUser();

  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(params.id);

  if(!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className='h-screen w-full'>
     <StreamCall call={call}>
      <StreamTheme>
       {!isSetUpComplete ? (
        <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
       ):(
        <MeetingRoom />
       )}
      </StreamTheme>
     </StreamCall>
    </main>
  );
};

export default Meeting;
