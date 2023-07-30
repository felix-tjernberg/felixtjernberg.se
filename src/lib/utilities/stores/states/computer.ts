import { writable } from "svelte/store"
import { z } from "zod"

export const computerScreenIndexSchema = z.coerce.number().int().min(0).max(6)
export const computerScreenIndex = writable<number>(0)
export const computerScreenIndexKey = "computerScreenIndex" as const

export const dialUpAudioPaused = writable<boolean>(false)
export const dialUpAudioCurrentTime = writable<number>(0)
