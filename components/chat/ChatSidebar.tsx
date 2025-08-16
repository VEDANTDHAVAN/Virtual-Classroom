'use client'

const mockUsers = ['Alice', 'Bob', 'Charlie']

export default function ChatSidebar() {
  return (
    <aside className="w-64 border-r bg-background p-4 overflow-y-auto text-black">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      <ul className="space-y-2">
        {mockUsers.map((user) => (
          <li key={user} className="cursor-pointer p-2 hover:bg-accent rounded-md">
            {user}
          </li>
        ))}
      </ul>
    </aside>
  )
}
