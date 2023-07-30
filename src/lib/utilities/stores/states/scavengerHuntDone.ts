import { writable } from "svelte/store"
export const scavengerHuntDone = writable<boolean>(false)
export const scavengerHuntDoneKey = "scavengerHuntDone" as const
