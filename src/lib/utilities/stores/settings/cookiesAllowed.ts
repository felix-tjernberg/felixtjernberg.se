import { writable } from "svelte/store"
export const cookiesAllowed = writable<boolean>(false)
export const cookiesAllowedKey = "cookiesAllowed" as const
