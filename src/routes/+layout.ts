import { init, register } from "svelte-intl-precompile"
import type { LayoutLoad } from "./$types"

export const load = (async () => {
    register("en", () => import("$lib/locales/en.js"))
    register("se", () => import("$lib/locales/se.js"))
    init({
        fallbackLocale: "en",
    })
}) satisfies LayoutLoad
