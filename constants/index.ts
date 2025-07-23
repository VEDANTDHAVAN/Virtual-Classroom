import {
  HomeIcon,
  Video,
  MessageSquare,
  PenTool,
  ClipboardCheck
} from 'lucide-react';

export const sidebarLinks = [
  { label: "Home", icon: HomeIcon, href: "/" },
  {
    label: "Meetings",
    icon: Video,
    children: [
      { label: "Upcoming", href: "/meetings/upcoming" },
      { label: "Previous", href: "/meetings/previous" },
      { label: "Recordings", href: "/meetings/recordings" },
      { label: "Personal Room", href: "/meetings/personal-room" }
    ],
  },
  {
    label: "Chat",
    icon: MessageSquare,
    children: [
      { label: "Chat Rooms", href: "/chat/rooms" },
      { label: "Private Messages", href: "/chat/private" },
    ],
  },
  {
    label: "Whiteboard",
    icon: PenTool,
    children: [
      { label: "New Whiteboard", href: "/whiteboard/new" },
      { label: "My Whiteboards", href: "/whiteboard/history" },
    ],
  },
  {
    label: "Quizzes",
    icon: ClipboardCheck,
    children: [
      { label: "Take Quiz", href: "/quiz/take" },
      { label: "My Submissions", href: "/quiz/submissions" },
      { label: "Create Quiz", href: "/quiz/create", role: "teacher" },
      { label: "AI Quiz Generator", href: "/quiz/ai-generator", role: "teacher" },
    ],
  },
]