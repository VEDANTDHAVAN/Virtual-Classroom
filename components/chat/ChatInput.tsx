'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ChatInput() {
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (!message.trim()) return
    console.log('Sending:', message)
    setMessage('')
  }

  return (
    <div className="p-4 border-t flex gap-2">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 text-black"
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <Button onClick={sendMessage} className="gap-1">
        <Send size={16} />
        Send
      </Button>
    </div>
  )
}
