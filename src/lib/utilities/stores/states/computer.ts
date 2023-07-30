import { writable } from "svelte/store"
export const computerScreenIndex = writable<number>(0)
export const dialUpAudioPaused = writable<boolean>(false)
export const dialUpAudioCurrentTime = writable<number>(0)
