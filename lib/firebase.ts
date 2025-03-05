import { initializeApp, getApps } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getDatabase, connectDatabaseEmulator } from "firebase/database"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}

let app
let auth
let db
let rtdb
let functions
let analytics

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  rtdb = getDatabase(app)
  functions = getFunctions(app)

  // Initialize analytics only if it's supported
  isSupported()
    .then((yes) => (yes ? getAnalytics(app) : null))
    .then((a) => {
      analytics = a
    })

  if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099")
    connectFirestoreEmulator(db, "localhost", 8080)
    connectDatabaseEmulator(rtdb, "localhost", 9000)
    connectFunctionsEmulator(functions, "localhost", 5001)
  }
}

export { app, auth, db, rtdb, functions, analytics }

