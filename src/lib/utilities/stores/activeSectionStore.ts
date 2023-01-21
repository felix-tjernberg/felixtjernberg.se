import persistedWritable from "$utilities/persistedWritable"
import { SectionsSchema } from "$compositions/NavigationWrapper/NavigationSectionsSchema"

export const activeSection = persistedWritable("activeSection", SectionsSchema.enum.welcome)
