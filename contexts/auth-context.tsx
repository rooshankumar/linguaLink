"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>
}

interface UserProfile {
  displayName: string
  photoURL: string
  nativeLanguage: string
  learningLanguage: string
  interests: string[]
  bio: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // Update user's online status and last seen
        const userRef = doc(db, "users", user.uid)
        await setDoc(userRef, { online: true, lastSeen: serverTimestamp() }, { merge: true })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, username: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName: username })
    await setDoc(doc(db, "users", userCredential.user.uid), {
      displayName: username,
      email,
      createdAt: serverTimestamp(),
      online: true,
      lastSeen: serverTimestamp(),
    })
  }

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    if (user) {
      // Update user's online status and last seen before logging out
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, { online: false, lastSeen: serverTimestamp() }, { merge: true })
    }
    await signOut(auth)
  }

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    await setDoc(userRef, { ...data, updatedAt: serverTimestamp() }, { merge: true })

    if (data.displayName) {
      await updateProfile(user, { displayName: data.displayName })
    }

    if (data.photoURL) {
      await updateProfile(user, { photoURL: data.photoURL })
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

