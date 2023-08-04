import { writable } from "svelte/store"
import { z } from "zod"

const STATES = ["phone", "computer", "blog", "coach", "contact", "navigation"] as const
export const NavigationSchema = z.enum(STATES)
export type NavigationStates = z.infer<typeof NavigationSchema>

export const navigationState = writable<NavigationStates>(NavigationSchema.enum.navigation)
export const navigationStateKey = "navigationState" as const

export const navigationExplainer = writable<boolean>(false)
export const navigationExplainerKey = "navigationExplainer" as const

export const navigationExplainer2 = writable<boolean>(false)
export const navigationExplainer2Key = "navigationExplainer2" as const
