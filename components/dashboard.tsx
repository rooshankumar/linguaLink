"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Plus, Users } from "lucide-react"
import Link from "next/link"

export function Dashboard() {
  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div className="gradient-bg rounded-xl p-6 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
          <p className="text-white/80 mb-4">
            Continue your language learning journey with these recommended activities.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              Start a conversation
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
              <Users className="mr-2 h-4 w-4" />
              Find new partners
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
            <CardDescription>Continue your language practice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentChats.map((chat) => (
              <div key={chat.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{chat.name}</p>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/chat">View all conversations</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Partners</CardTitle>
            <CardDescription>Based on your learning goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedPartners.map((partner) => (
              <div key={partner.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={partner.avatar} alt={partner.name} />
                  <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{partner.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {partner.nativeLanguage}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {partner.learningLanguage}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/community">Explore community</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Spanish - Intermediate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Vocabulary</span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Grammar</span>
                  <span className="text-sm text-muted-foreground">48%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "48%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Conversation</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "72%" }}></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span>Current level</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-muted"></div>
                    <span>Target</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile">View full progress</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

const recentChats = [
  {
    id: 1,
    name: "Maria Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "¡Hola! ¿Cómo estás hoy?",
    time: "2m ago",
  },
  {
    id: 2,
    name: "Carlos Vega",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Gracias por la ayuda con mi tarea.",
    time: "1h ago",
  },
  {
    id: 3,
    name: "Sofia Mendez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "¿Quieres practicar mañana?",
    time: "3h ago",
  },
]

const suggestedPartners = [
  {
    id: 1,
    name: "Javier Torres",
    avatar: "/placeholder.svg?height=40&width=40",
    nativeLanguage: "Spanish",
    learningLanguage: "English",
  },
  {
    id: 2,
    name: "Elena Fuentes",
    avatar: "/placeholder.svg?height=40&width=40",
    nativeLanguage: "Spanish",
    learningLanguage: "English",
  },
  {
    id: 3,
    name: "Miguel Sanchez",
    avatar: "/placeholder.svg?height=40&width=40",
    nativeLanguage: "Spanish",
    learningLanguage: "English",
  },
]

