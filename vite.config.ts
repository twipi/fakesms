import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // https://github.com/vitejs/vite/issues/7385#issuecomment-1286606298
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src/"),
    },
  },
})
