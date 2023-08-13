import { writable } from "svelte/store"
export const dialUpAudioPaused = writable<boolean>(true)
export const dialUpAudioCurrentTime = writable<number>(0)
