import adapter from "@sveltejs/adapter-node"
import { vitePreprocess } from "@sveltejs/kit/vite"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({ precompress: true }),
        alias: {
            $assets: "src/lib/assets",
            $components: "src/lib/components",
            $compositions: "src/lib/compositions",
            $stores: "src/lib/utilities/stores",
            $utilities: "src/lib/utilities",
        },
    },
    preprocess: vitePreprocess(),
}

export default config
