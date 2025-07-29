import MeetingClient from "@/components/MeetingClient";

interface MeetingProps {
  params: {
    id: string;
  }
}

export default function MeetingPage({params}: MeetingProps) {
  return <MeetingClient id={params.id} />
}