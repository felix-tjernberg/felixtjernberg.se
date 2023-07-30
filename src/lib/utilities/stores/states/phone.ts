import { writable } from "svelte/store"

export const answeredCall = writable<boolean>(false)
export const answeredCallKey = "answeredCall" as const

export const conversationDone = writable<boolean>(false)
export const conversationDoneKey = "conversationDone" as const

export const momCalling = writable<boolean>(false)
export const momCallingKey = "momCalling" as const

export const phoneRingtonePaused = writable<boolean>(true)
