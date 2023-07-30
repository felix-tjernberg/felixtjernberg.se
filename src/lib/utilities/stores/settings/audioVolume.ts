import { writable } from "svelte/store"
export const audioVolume = writable<number>(0.1)
