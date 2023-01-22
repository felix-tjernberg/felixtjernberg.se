import adapter from "@sveltejs/adapter-auto"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import { vitePreprocess } from "@sveltejs/kit/vite"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        alias: {
            $assets: "src/lib/assets",
            $components: "src/lib/components",
            $compositions: "src/lib/compositions",
            $stores: "src/lib/utilities/stores",
            $utilities: "src/lib/utilities"
        }
    },
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess({
        postcss: {
            plugins: [
                autoprefixer("> 0.01%"),
                cssnano({
                    preset: "default"
                })
            ]
        }
    })
}

export default config
