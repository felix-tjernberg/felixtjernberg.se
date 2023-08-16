import { writable } from "svelte/store"

export const T = "T" as const // True
export const F = "F" as const // False
export type BooleanState = typeof T | typeof F // Because we are saving scavengerHuntState as a string, we need to use "T" and "F" instead of true and false
export function isBooleanState(string: string): string is BooleanState {
    return string === T || string === F
}

export const D = "D"
export type DeactivatedState = typeof D
export type TernaryState = BooleanState | DeactivatedState
function isTernaryState(string: string): string is TernaryState {
    return isBooleanState(string) || string === D
}

// Screen 1
type S1 = "1"
type S1NoteStates = `${BooleanState}${BooleanState}${BooleanState}`
type S1HintState = TernaryState
type S1States = `${S1}${S1NoteStates}${S1HintState}`
const S1DefaultState = "1TTTD" as const
function isValidS1State(string: string): string is S1States {
    if (string.length !== 5) return false
    if (!isBooleanState(string[1])) return false
    if (!isBooleanState(string[2])) return false
    if (!isBooleanState(string[3])) return false
    if (!isTernaryState(string[4])) return false
    return true
}

// Screen 2
type S2 = "2"
type S2NotificationState = BooleanState
type S2States = `${S2}${S2NotificationState}`
export const S2DefaultState = "2F" as const
function isValidS2State(string: string): string is S2States {
    if (string.length !== 2) return false
    if (!isBooleanState(string[1])) return false
    return true
}

export type ScavengerHuntStates = S1States | S2States
export const scavengerHuntDefaultState: ScavengerHuntStates = S1DefaultState
export const scavengerHuntState = writable<ScavengerHuntStates>(scavengerHuntDefaultState)
export const scavengerHuntStateKey = "scavengerHuntState" as const
export const stateIndexKey = "stateIndex" as const
export const stateValueKey = "stateValue" as const
export function getScavengerHuntState(string: string | undefined | null): ScavengerHuntStates {
    if (string === undefined || string === null) return scavengerHuntDefaultState

    switch (string[0]) {
        case "1":
            if (isValidS1State(string)) return string as ScavengerHuntStates
            else return S1DefaultState
        case "2":
            console.log("string", string)

            if (isValidS2State(string)) return string as ScavengerHuntStates
            return S2DefaultState
        default:
            return scavengerHuntDefaultState
    }
}
