import { imagetools } from "vite-imagetools"
import path from "path"
import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [imagetools(), sveltekit()],
    resolve: {
        alias: {
            $assets: path.resolve("./src/lib/assets"),
            $components: path.resolve("./src/lib/components"),
            $compositions: path.resolve("./src/lib/compositions"),
            $lib: path.resolve("./src/lib"),
            $stores: path.resolve("./src/lib/utilities/stores"),
            $utilities: path.resolve("./src/lib/utilities"),
        },
    },
}

export default config
