import { navigationStateKey, NavigationSchema } from "$stores/states/navigationState"
import { cookiesAllowedKey } from "$stores/settings/cookiesAllowed"
import type { PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load = (async ({ cookies }) => {
    if (cookies.get(cookiesAllowedKey) === "true") {
        const route = NavigationSchema.safeParse(cookies.get(navigationStateKey))
        if (route.success) throw redirect(302, `/${route.data}`)
    }
    throw redirect(302, `/computer`)
}) satisfies PageServerLoad
