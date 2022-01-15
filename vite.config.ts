// https://vitejs.dev/config/

import path, { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Inspect from "vite-plugin-inspect";

export default defineConfig(({ command, mode }) => {

    return {
      base: "http://192.168.1.20:4000/",
      plugins: [
        vue(),
        Inspect() // only applies in dev mode TODO
      ],
      resolve: {
        alias: {
          "@": resolve("./src")
        }
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: "@import '@/styles/variables.scss';"
          }
        }
      },
      server: {
        port: 4000,
        strictPort: true,
        cors: true,
        // proxy: {
        //   "/api": {
        //     target: "",
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, "")
        //   }
        // },
        build: {
          target: "modules",
          outDir: "dist",
          assetsDir: "static",
        }
      }
    };
});
