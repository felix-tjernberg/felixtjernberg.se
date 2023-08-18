import { writable } from "svelte/store"

export const T = "T" as const // True
export const F = "F" as const // False
export type BooleanState = typeof T | typeof F // Because we are saving scavengerHuntState as a string, we need to use "T" and "F" instead of true and false
export function isBooleanState(string: string): string is BooleanState {
    return string === F || string === T
}

export const D = "D"
export type DeactivatedState = typeof D
export type TernaryState = BooleanState | DeactivatedState
function isTernaryState(string: string): string is TernaryState {
    return string === D || isBooleanState(string)
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

// Screen 3
type S3 = "3"
type S3States = `${S3}`
export const S3DefaultState = "3" as const
function isValidS3State(string: string): string is S3States {
    return string === "3"
}

// Screen 4
type S4 = "4"
type S4HintState = TernaryState
type S4States = `${S4}${S4HintState}${S4HintState}${S4HintState}${S4HintState}${S4HintState}${S4HintState}`
export const S4DefaultState = "4TDDDDD" as const
function isValidS4State(string: string): string is S4States {
    if (string.length !== 7) return false
    if (!isTernaryState(string[1])) return false
    if (!isTernaryState(string[2])) return false
    if (!isTernaryState(string[3])) return false
    if (!isTernaryState(string[4])) return false
    if (!isTernaryState(string[5])) return false
    if (!isTernaryState(string[6])) return false
    return true
}

// Screen 5
type S5 = "5"
type S5States = `${S5}`
export const S5DefaultState = "5" as const
function isValidS5State(string: string): string is S5States {
    return string === "5"
}

// Screen 6
type S6 = "6"
type S6States = `${S6}`
export const S6DefaultState = "6" as const
function isValidS6State(string: string): string is S6States {
    return string === "6"
}

export type ScavengerHuntStates = S1States | S2States | S3States | S4States | S5States | S6States
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
            if (isValidS2State(string)) return string as ScavengerHuntStates
            return S2DefaultState
        case "3":
            if (isValidS3State(string)) return string as ScavengerHuntStates
            return S3DefaultState
        case "4":
            if (isValidS4State(string)) return string as ScavengerHuntStates
            return S4DefaultState
        case "5":
            if (isValidS5State(string)) return string as ScavengerHuntStates
            return S5DefaultState
        case "6":
            if (isValidS6State(string)) return string as ScavengerHuntStates
            return S6DefaultState
        default:
            return scavengerHuntDefaultState
    }
}
