import { activeSectionKey, SectionsSchema } from "$stores/states/activeSection"
import { cookiesAllowedKey } from "$stores/settings/cookiesAllowed"
import type { PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load = (async ({ cookies }) => {
    if (cookies.get(cookiesAllowedKey) === "true") {
        const route = SectionsSchema.safeParse(cookies.get(activeSectionKey))
        if (route.success) throw redirect(302, `/${route.data}`)
    }
    throw redirect(302, `/computer`)
}) satisfies PageServerLoad
