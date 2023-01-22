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
            $compositions: path.resolve("./src/lib/compositions"),
            $lib: path.resolve("./src/lib"),
            $stores: path.resolve("./src/lib/utilities/stores"),
            $utilities: path.resolve("./src/lib/utilities")
        }
    }
}

export default config
