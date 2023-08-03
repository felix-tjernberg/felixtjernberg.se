import { writable } from "svelte/store"
import { z } from "zod"

const STATES = ["phone", "computer", "blog", "coach", "contact", "navigation"] as const
export const NavigationSchema = z.enum(STATES)
export type NavigationStates = z.infer<typeof NavigationSchema>

export const navigationState = writable<NavigationStates>(NavigationSchema.enum.navigation)
export const navigationStateKey = "navigationState" as const
