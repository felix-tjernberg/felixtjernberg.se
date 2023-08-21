import { writable } from "svelte/store"

export const settingsOpen = writable<boolean>(false)
export const settingsOpenKey = "settingsOpen" as const
