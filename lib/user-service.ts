import { db } from "./firebase"
import { collection, query, onSnapshot } from "firebase/firestore"

export interface User {
  id: string
  displayName: string
  photoURL: string
  online: boolean
  lastSeen: Date
}

export const subscribeToUsers = (callback: (users: User[]) => void) => {
  const usersRef = collection(db, "users")
  const q = query(usersRef)

  return onSnapshot(q, (snapshot) => {
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[]
    callback(users)
  })
}

