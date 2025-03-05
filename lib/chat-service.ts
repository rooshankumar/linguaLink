import { rtdb, db } from "./firebase"
import { ref, push, onChildAdded, off, serverTimestamp, set, onValue } from "firebase/database"
import { doc, updateDoc } from "firebase/firestore"

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: number
  read: boolean
}

export const sendMessage = async (conversationId: string, senderId: string, content: string) => {
  const messageRef = ref(rtdb, `messages/${conversationId}`)
  const newMessageRef = push(messageRef)
  await set(newMessageRef, {
    senderId,
    content,
    timestamp: serverTimestamp(),
    read: false,
  })

  // Update last message in Firestore
  const conversationRef = doc(db, "conversations", conversationId)
  await updateDoc(conversationRef, {
    lastMessage: content,
    lastMessageTime: serverTimestamp(),
  })
}

export const subscribeToMessages = (conversationId: string, callback: (message: Message) => void) => {
  const messageRef = ref(rtdb, `messages/${conversationId}`)
  const handleNewMessage = onChildAdded(messageRef, (snapshot) => {
    const message = snapshot.val()
    callback({
      id: snapshot.key!,
      ...message,
    })
  })

  return () => {
    off(messageRef, "child_added", handleNewMessage)
  }
}

export const markMessageAsRead = async (conversationId: string, messageId: string) => {
  const messageRef = ref(rtdb, `messages/${conversationId}/${messageId}`)
  await set(messageRef, { read: true }, { merge: true })
}

export const setTypingStatus = async (conversationId: string, userId: string, isTyping: boolean) => {
  const typingRef = ref(rtdb, `typing/${conversationId}/${userId}`)
  await set(typingRef, isTyping)
}

export const subscribeToTypingStatus = (conversationId: string, callback: (typingUsers: string[]) => void) => {
  const typingRef = ref(rtdb, `typing/${conversationId}`)
  const handleTypingChange = onValue(typingRef, (snapshot) => {
    const typingStatus = snapshot.val()
    const typingUsers = typingStatus
      ? Object.entries(typingStatus)
          .filter(([_, isTyping]) => isTyping)
          .map(([userId]) => userId)
      : []
    callback(typingUsers)
  })

  return () => {
    off(typingRef, "value", handleTypingChange)
  }
}

