import { writable } from "svelte/store"
import { z } from "zod"

export const booleanStateSchema = z.enum(["T", "F"])
export type BooleanState = z.infer<typeof booleanStateSchema> // Because we are saving scavengerHuntState as a string, we need to use "T" and "F" instead of true and false

export const deactivatedStateSchema = z.literal("D")
export type DeactivatedState = z.infer<typeof deactivatedStateSchema>

export type TernaryState = BooleanState | DeactivatedState

type S1 = "S1" // Screen 1
type S1NoteStates = `${BooleanState}${BooleanState}${BooleanState}`
type S1HintState = TernaryState
type S1States = `${S1}${S1NoteStates}${S1HintState}`

export type ScavengerHuntStates = S1States

export const scavengerHuntDefaultState: ScavengerHuntStates = "S1TTTF" as const
export const scavengerHuntState = writable<ScavengerHuntStates>(scavengerHuntDefaultState)
export const scavengerHuntStateKey = "scavengerHuntState" as const
export const stateIndexKey = "stateIndex" as const
export const stateValueKey = "stateValue" as const
