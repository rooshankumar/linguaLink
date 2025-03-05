import { analytics } from "./firebase"
import { logEvent, type Analytics } from "firebase/analytics"

export const logAnalyticsEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  analytics.then((analyticsInstance) => {
    if (analyticsInstance) {
      logEvent(analyticsInstance as Analytics, eventName, eventParams)
    }
  })
}

