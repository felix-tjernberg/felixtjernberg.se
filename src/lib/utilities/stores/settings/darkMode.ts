import { writable } from "svelte/store"
export const darkMode = writable<boolean>(true)
export const darkModeKey = "darkMode" as const
