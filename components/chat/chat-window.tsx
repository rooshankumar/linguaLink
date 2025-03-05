"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import {
  type Message,
  sendMessage,
  subscribeToMessages,
  markMessageAsRead,
  setTypingStatus,
  subscribeToTypingStatus,
} from "@/lib/chat-service"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"

interface ChatWindowProps {
  conversationId: string
}

export function ChatWindow({ conversationId }: ChatWindowProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [typingUsers, setTypingUsers] = useState<string[]>([])

  useEffect(() => {
    if (!user) return

    const messageUnsubscribe = subscribeToMessages(conversationId, (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
      if (newMessage.senderId !== user.uid) {
        markMessageAsRead(conversationId, newMessage.id)
      }
    })

    const typingUnsubscribe = subscribeToTypingStatus(conversationId, (users) => {
      setTypingUsers(users.filter((id) => id !== user.uid))
    })

    return () => {
      messageUnsubscribe()
      typingUnsubscribe()
    }
  }, [conversationId, user])

  const handleSendMessage = async (content: string) => {
    if (!user) return
    await sendMessage(conversationId, user.uid, content)
    setTypingStatus(conversationId, user.uid, false)
  }

  const handleTyping = (isTyping: boolean) => {
    if (!user) return
    setTypingStatus(conversationId, user.uid, isTyping)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} isCurrentUser={message.senderId === user?.uid} />
        ))}
        {typingUsers.length > 0 && (
          <div className="text-sm text-gray-500 italic">
            {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  )
}

