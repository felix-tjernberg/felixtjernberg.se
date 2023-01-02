import { imagetools } from "vite-imagetools"
import path from "path"
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin"
import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [imagetools(), sveltekit(), precompileIntl("src/lib/locales")],
    resolve: {
        alias: {
            $assets: path.resolve("./src/lib/assets"),
            $components: path.resolve("./src/lib/components"),
            $lib: path.resolve("./src/lib"),
            $utilities: path.resolve("./src/lib/utilities")
        }
    }
}

export default config
