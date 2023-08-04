import { writable } from "svelte/store"
export const navigationExplainer = writable<boolean>(false)
export const navigationExplainerKey = "navigationExplainer" as const
