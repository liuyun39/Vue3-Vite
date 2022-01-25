// https://vitejs.dev/config/

import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Inspect from "vite-plugin-inspect";
import viteSvgIcons from "vite-plugin-svg-icons";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
        // 自动导入
        AutoImport({
          resolvers: [ElementPlusResolver({
            importStyle: "sass"
          })],
        }),
        Components({
          resolvers: [ElementPlusResolver({
            importStyle: "sass"
          })],
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
            additionalData: "@use '@/styles/variables.scss' as *; @use '@/styles/element-variables.scss' as *;"
          }
        }
      },
      // 打包配置
      build: {
        target: "modules",
        outDir: "dist", //指定输出路径
        assetsDir: "assets", // 指定生成静态资源的存放路径 or static
        minify: "terser" // 混淆器，terser构建后文件体积更小
      },
      server: {
        port: 4000,
        entry: "index.html",
        strictPort: true,
        cors: true,
        // open: true,
        // proxy: {
        //   "/api": {
        //     target: "",
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, "")
        //   }
        // },
      }
    };
});
