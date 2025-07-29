"use client";

import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useGetCallById } from '@/hooks/useGetCallById';
import MeetingSetup from './MeetingSetup';
import MeetingRoom from './MeetingRoom';
import Loader from './Loader';

interface Props {
  id: string;
}

export default function MeetingClient({ id }: Props) {
  const { isLoaded } =useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
  <main className="h-screen w-full">
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetUpComplete ? (
          <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  </main>
 );
}
