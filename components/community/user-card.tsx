"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, UserPlus } from "lucide-react"

type UserData = {
  uid: string
  displayName: string
  photoURL: string
  nativeLanguage: string
  learningLanguage: string
  interests: string[]
  bio: string
}

interface UserCardProps {
  user: UserData
  onStartConversation: () => void
}

export function UserCard({ user, onStartConversation }: UserCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="h-24 bg-gradient-to-r from-primary to-purple-400"></div>
      <CardContent className="p-6 pt-0 -mt-12">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={user.photoURL || ""} alt={user.displayName} />
          <AvatarFallback className="text-2xl">{user.displayName?.substring(0, 2) || "??"}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold mt-4">{user.displayName}</h3>

        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            {user.nativeLanguage}
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            {user.learningLanguage}
          </Badge>
        </div>

        <p className="text-muted-foreground mt-3 line-clamp-3">{user.bio || "No bio provided"}</p>

        {user.interests && user.interests.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Interests</p>
            <div className="flex flex-wrap gap-1">
              {user.interests.slice(0, 5).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {user.interests.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{user.interests.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 p-6 pt-0">
        <Button className="flex-1" onClick={onStartConversation}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Message
        </Button>
        <Button variant="outline" className="flex-1">
          <UserPlus className="mr-2 h-4 w-4" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  )
}

