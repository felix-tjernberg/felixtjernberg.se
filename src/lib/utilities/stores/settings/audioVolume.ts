import { writable } from "svelte/store"
import { z } from "zod"

export const audioVolumeSchema = z.coerce.number().min(0).max(0.5)
export type AudioVolume = z.infer<typeof audioVolumeSchema>

export const audioVolume = writable<AudioVolume>(0.1)
export const audioVolumeKey = "audioVolume" as const
