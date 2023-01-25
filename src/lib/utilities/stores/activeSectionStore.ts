import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"
import { writable } from "svelte/store"

export const activeSection = writable(SectionsSchema.enum.none)
