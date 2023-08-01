import { writable } from "svelte/store"

export const firstVisit = writable<boolean>(false)
export const firstVisitKey = "firstVisit" as const

export const firstVisitNotification = writable<boolean>(false)
export const firstVisitNotificationKey = "firstVisitNotificationClosed" as const
