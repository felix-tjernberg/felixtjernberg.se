import { EMAIL, PHONE_NUMBER } from "$env/static/private"
import type { PageServerLoad } from "./$types"

export const load = (() => {
    return {
        email: EMAIL,
        phoneNumber: PHONE_NUMBER,
    }
}) satisfies PageServerLoad
