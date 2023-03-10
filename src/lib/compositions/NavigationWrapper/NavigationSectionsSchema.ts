import { z } from "zod"

const SECTIONS = ["phone", "computer", "welcome", "coach", "contact", "none"] as const

export const SectionsSchema = z.enum(SECTIONS)

export type Sections = z.infer<typeof SectionsSchema>
