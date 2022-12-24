import { imagetools } from "vite-imagetools"
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin"
import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [imagetools(), sveltekit(), precompileIntl("src/lib/locales")]
}

export default config
