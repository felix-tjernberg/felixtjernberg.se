import { init, register } from "svelte-intl-precompile"
import type { Load } from "@sveltejs/kit"

export const load: Load = () => {
    register("en", () => import("$lib/locales/en.js"))
    register("se", () => import("$lib/locales/se.js"))
    init({
        fallbackLocale: "en"
    })
}
