"use client"

import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { useSidebar } from "@/components/sidebar-provider"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar()

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4 md:p-6">{children}</div>
        {isMobile && <MobileNav />}
      </main>
    </div>
  )
}

