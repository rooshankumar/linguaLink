import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

admin.initializeApp()

export const onUserStatusChanged = functions.database.ref("/status/{userId}").onUpdate(async (change, context) => {
  const eventStatus = change.after.val()
  const userStatusFirestoreRef = admin.firestore().doc(`users/${context.params.userId}`)

  const statusSnapshot = await change.after.ref.once("value")
  const status = statusSnapshot.val()

  if (status.lastChanged > eventStatus.lastChanged) {
    return null
  }

  eventStatus.lastChanged = new Date(eventStatus.lastChanged)

  return userStatusFirestoreRef.update({
    online: eventStatus.state === "online",
    lastSeen: eventStatus.lastChanged,
  })
})

