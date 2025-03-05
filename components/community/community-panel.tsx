"use client"

import { useState, useEffect } from "react"
import { type User, subscribeToUsers } from "@/lib/user-service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CommunityPanel() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const unsubscribe = subscribeToUsers((newUsers) => {
      setUsers(newUsers)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Community</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${user.online ? "bg-green-500" : "bg-gray-300"}`}></span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL} alt={user.displayName} />
              <AvatarFallback>{user.displayName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <span>{user.displayName}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

