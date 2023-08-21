import { cookiesAllowedKey } from "$stores/settings/cookiesAllowed"
import { darkModeKey } from "$stores/settings/darkMode"
import type { Handle } from "@sveltejs/kit"
import { likesEightBitFontKey } from "$stores/settings/likesEightBitFont"

export const handle = (async ({ event, resolve }) => {
    let darkMode: boolean
    let likesEightBitFont: boolean

    if (event.cookies.get(cookiesAllowedKey) === "true") {
        darkMode = !(event.cookies.get(darkModeKey) === "false")
        likesEightBitFont = !(event.cookies.get(likesEightBitFontKey) === "false")
    } else if (event.url.searchParams.get(cookiesAllowedKey) === "false") {
        darkMode = !(event.url.searchParams.get(darkModeKey) === "false")
        likesEightBitFont = !(event.url.searchParams.get(likesEightBitFontKey) === "false")
    } else {
        darkMode = true
        likesEightBitFont = true
    }

    return await resolve(event, {
        transformPageChunk: ({ html }) =>
            html.replace("<body", `<body data-dark-mode=${darkMode} data-eight-bit-font=${likesEightBitFont}`),
    })
}) satisfies Handle
