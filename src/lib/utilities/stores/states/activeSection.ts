import { writable } from "svelte/store"
import { z } from "zod"

const SECTIONS = ["phone", "computer", "blog", "coach", "contact", "navigation"] as const
export const SectionsSchema = z.enum(SECTIONS)
export type Sections = z.infer<typeof SectionsSchema>

export const activeSection = writable<Sections>(SectionsSchema.enum.navigation)
export const activeSectionKey = "activeSection" as const
