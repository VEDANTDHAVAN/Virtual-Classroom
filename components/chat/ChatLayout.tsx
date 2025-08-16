'use client'

import ChatSidebar from './ChatSidebar'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

export default function ChatLayout() {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-muted rounded-xl overflow-hidden shadow-md border">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Chat area */}
      <div className="flex flex-col flex-1">
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
}
