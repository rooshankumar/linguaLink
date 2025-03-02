"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type Conversation = {
  id: string
  participants: string[]
  lastMessage: string
  lastMessageTime: any
  participantInfo: {
    [key: string]: {
      displayName: string
      photoURL: string
    }
  }
}

interface ChatListProps {
  conversations: Conversation[]
  selectedConversation: string | null
  onSelectConversation: (id: string) => void
  loading: boolean
}

export function ChatList({ conversations, selectedConversation, onSelectConversation, loading }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipantId = conversation.participants.find((id) => id !== "current-user-id")
    if (!otherParticipantId) return false

    const participantName = conversation.participantInfo[otherParticipantId]?.displayName || ""
    return participantName.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="w-80 border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
            <span className="sr-only">New conversation</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="p-4 space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">No conversations found</div>
        ) : (
          <div className="divide-y">
            {filteredConversations.map((conversation) => {
              const otherParticipantId = conversation.participants.find((id) => id !== "current-user-id")
              if (!otherParticipantId) return null

              const participant = conversation.participantInfo[otherParticipantId]

              return (
                <button
                  key={conversation.id}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 text-left ${
                    selectedConversation === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <Avatar>
                    <AvatarImage src={participant?.photoURL || ""} alt={participant?.displayName || ""} />
                    <AvatarFallback>{participant?.displayName?.substring(0, 2) || "??"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="font-medium truncate">{participant?.displayName}</p>
                      {conversation.lastMessageTime && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(new Date(conversation.lastMessageTime.toDate()), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

