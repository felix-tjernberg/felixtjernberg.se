import { writable } from "svelte/store"
import { z } from "zod"

export const booleanStateSchema = z.enum(["T", "F"])
export type BooleanState = z.infer<typeof booleanStateSchema> // Because we are saving scavengerHuntState as a string, we need to use "T" and "F" instead of true and false

export const deactivatedStateSchema = z.literal("D")
export type DeactivatedState = z.infer<typeof deactivatedStateSchema>

export type TernaryState = BooleanState | DeactivatedState

type S1 = "1" // Screen 1
type S1NoteStates = `${BooleanState}${BooleanState}${BooleanState}`
type S1HintState = TernaryState
type S1States = `${S1}${S1NoteStates}${S1HintState}`
const S1DefaultState = "1TTTD" as const

type S2 = "2" // Screen 2
type S2States = S2
export const S2DefaultState = "2" as const

export type ScavengerHuntStates = S1States | S2States

export const scavengerHuntDefaultState: ScavengerHuntStates = S1DefaultState
export const scavengerHuntState = writable<ScavengerHuntStates>(scavengerHuntDefaultState)
export const scavengerHuntStateKey = "scavengerHuntState" as const
export const stateIndexKey = "stateIndex" as const
export const stateValueKey = "stateValue" as const
