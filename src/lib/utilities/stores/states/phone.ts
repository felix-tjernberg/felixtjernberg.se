import { writable } from "svelte/store"
export const answeredCall = writable<boolean>(false)
export const conversationDone = writable<boolean>(false)
export const momCalling = writable<boolean>(false)
export const phoneRingtonePaused = writable<boolean>(true)
