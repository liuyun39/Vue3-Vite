// https://vitejs.dev/config/

import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Inspect from "vite-plugin-inspect";
import viteSvgIcons from "vite-plugin-svg-icons";

export default defineConfig(({ command, mode }) => {
    return {
      base: "http://192.168.1.20:4000/",
      plugins: [
        vue(),
        Inspect(), // only applies in dev mode TODO
        viteSvgIcons({
          // 指定需要缓存的图标文件夹
          iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
          // 指定symbolId格式
          symbolId: "icon-[dir]-[name]"
        }),
      ],
      resolve: {
        alias: {
          "@": path.resolve("./src")
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
