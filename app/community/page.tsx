"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { AppShell } from "@/components/app-shell"
import { UserCard } from "@/components/community/user-card"
import { UserFilters } from "@/components/community/user-filters"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

type UserData = {
  uid: string
  displayName: string
  photoURL: string
  nativeLanguage: string
  learningLanguage: string
  interests: string[]
  bio: string
}

export default function CommunityPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<UserData[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    language: "",
    interests: [] as string[],
  })

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return

      try {
        // Query users who are learning the current user's native language
        // or whose native language is the current user's learning language
        const q = query(collection(db, "users"), where("uid", "!=", user.uid))

        const querySnapshot = await getDocs(q)
        const usersData: UserData[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data() as UserData
          usersData.push(data)
        })

        setUsers(usersData)
        setFilteredUsers(usersData)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to load community members.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [user, toast])

  useEffect(() => {
    if (users.length === 0) return

    let result = [...users]

    if (filters.language) {
      result = result.filter(
        (user) => user.nativeLanguage === filters.language || user.learningLanguage === filters.language,
      )
    }

    if (filters.interests.length > 0) {
      result = result.filter((user) => user.interests?.some((interest) => filters.interests.includes(interest)))
    }

    setFilteredUsers(result)
  }, [filters, users])

  const startConversation = async (partnerId: string) => {
    if (!user) return

    try {
      // Check if conversation already exists
      const conversationsRef = collection(db, "conversations")
      const q = query(conversationsRef, where("participants", "array-contains", user.uid))

      const querySnapshot = await getDocs(q)
      let existingConversation = null

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        if (data.participants.includes(partnerId)) {
          existingConversation = { id: doc.id, ...data }
        }
      })

      if (existingConversation) {
        // Redirect to existing conversation
        window.location.href = `/chat?conversation=${existingConversation.id}`
        return
      }

      // Create new conversation
      const newConversationRef = await addDoc(conversationsRef, {
        participants: [user.uid, partnerId],
        createdAt: serverTimestamp(),
        lastMessageTime: serverTimestamp(),
      })

      // Redirect to new conversation
      window.location.href = `/chat?conversation=${newConversationRef.id}`

      toast({
        title: "Conversation started",
        description: "You can now start chatting with this language partner.",
      })
    } catch (error) {
      console.error("Error starting conversation:", error)
      toast({
        title: "Error",
        description: "Failed to start conversation.",
        variant: "destructive",
      })
    }
  }

  return (
    <AppShell>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <UserFilters filters={filters} setFilters={setFilters} />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Find Language Partners</h1>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center p-12 border rounded-lg">
                <h3 className="text-lg font-medium">No users found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
                <Button variant="outline" className="mt-4" onClick={() => setFilters({ language: "", interests: [] })}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((userData) => (
                  <UserCard
                    key={userData.uid}
                    user={userData}
                    onStartConversation={() => startConversation(userData.uid)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

