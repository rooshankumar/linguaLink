"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile/profile-form"
import { LanguageProgress } from "@/components/profile/language-progress"
import { Separator } from "@/components/ui/separator"
import { Edit, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/sign-in")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <AppShell>
        <div className="container mx-auto py-6">
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <p>Loading profile...</p>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="container mx-auto py-6">
        <div className="grid gap-6">
          <Card>
            <div className="h-32 bg-gradient-to-r from-primary to-purple-400"></div>
            <CardContent className="p-6 pt-0 -mt-16">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                  <AvatarFallback className="text-4xl">{user.displayName?.substring(0, 2) || "??"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{user.displayName}</h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.nativeLanguage && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                        Native: {user.nativeLanguage}
                      </Badge>
                    )}
                    {user.learningLanguage && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Learning: {user.learningLanguage}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="progress">Language Progress</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              {isEditing ? (
                <ProfileForm user={user} onComplete={() => setIsEditing(false)} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{user.bio || "No bio provided yet."}</p>

                    {user.interests && user.interests.length > 0 && (
                      <>
                        <Separator className="my-4" />
                        <h3 className="font-medium mb-2">Interests</h3>
                        <div className="flex flex-wrap gap-1">
                          {user.interests.map((interest) => (
                            <Badge key={interest} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="progress">
              <LanguageProgress language={user.learningLanguage || ""} />
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Account Created</h3>
                    <p className="text-muted-foreground">January 1, 2023</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}

