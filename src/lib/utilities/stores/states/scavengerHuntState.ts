import { writable } from "svelte/store"

export const scavengerHuntState = writable<boolean>(false)
export const scavengerHuntStateKey = "scavengerHuntState" as const
