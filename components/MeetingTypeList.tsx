"use client";

import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from "sonner"
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetState, setMeetState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '', link: '',  
  });

  const [callDetails, setCallDetails] = useState<Call>();
  

  const createMeeting = async () => {
    if(!client || !user) return;

    try {
      if(!values.dateTime){
        toast("Please select a date and time!");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if(!call) throw new Error('Failed to Create a Call');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setCallDetails(call);

      if(!values.description){
        router.push(`/meeting/${call.id}`);
      }

      toast("Meeting Created Successfully!!")
    } catch (error) {
      console.log(error);
      toast("Failed to Create Meeting!!")
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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

      {!callDetails ? (
       <MeetingModal isOpen={meetState === 'isScheduleMeeting'}
       onClose={() => setMeetState(undefined)}
       title="Create Meeting" handleClick={createMeeting}>
        <div className='flex flex-col gap-3'>
         <label className='text-base text-normal leading-[22px] text-cyan-100'>Add a Description</label>
         <Textarea className='border-none bg-blue-900 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e) => {
            setValues({...values, description: e.target.value});
          }}
         />
        </div>
        <div className='flex flex-col w-full gap-3'>
         <label className='text-base text-normal leading-[22px] text-cyan-100'>Select Date and Time</label>
         <ReactDatePicker selected={values.dateTime} onChange={(date) => setValues({...values, dateTime: date!})} 
          showTimeSelect timeFormat='HH:mm' timeIntervals={15} timeCaption='Time' dateFormat="MMMM d, yyyy h:mm aa"
          className='w-full rounded bg-blue-900 p-2 focus:outline-none'
          />
        </div>
       </MeetingModal>
      ) : (
        <MeetingModal isOpen={meetState === 'isScheduleMeeting'}
       onClose={() => setMeetState(undefined)}
       title="Meeting Created" className="text-center"
       handleClick={
        () => {
          navigator.clipboard.writeText(meetingLink);
          toast('Link Copied');
        }}
        image='/icons/checked.svg'
        buttonIcon='/icons/copy.svg'
        buttonText='Copy Meeting Link'
        />
      ) }
      <MeetingModal isOpen={meetState === 'isInstantMeeting'}
       onClose={() => setMeetState(undefined)}
       title="Start an Instant Meeting" className="text-center"
       buttonText="Start Meeting" handleClick={createMeeting}
      />
    </section>
  )  
}

export default MeetingTypeList