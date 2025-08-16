'use client'

const mockMessages = [
  { text: 'Hello, how are you?', sender: 'Alice', me: false },
  { text: 'I’m good, thanks! You?', sender: 'Me', me: true },
]

export default function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {mockMessages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-xs px-4 py-2 rounded-lg ${
            msg.me
              ? 'bg-primary text-white self-end ml-auto'
              : 'bg-secondary text-foreground self-start'
          }`}
        >
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  )
}
