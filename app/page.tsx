import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Dashboard } from "@/components/dashboard"
import { LandingPage } from "@/components/landing-page"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    return <Dashboard />
  }

  return <LandingPage />
}

