"use client"

import { Home, MessageCircle, PanelLeft, User, Users } from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/components/sidebar-provider"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const { toggleSidebar } = useSidebar()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t md:hidden">
      <div className="flex items-center justify-around p-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <Home className="h-6 w-6" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/chat">
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Chat</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/community">
            <Users className="h-6 w-6" />
            <span className="sr-only">Community</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <User className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <PanelLeft className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </div>
  )
}

