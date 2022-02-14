import "@babel/polyfill";

import { createApp } from "vue";
import "element-plus/dist/index.css";
import "@/styles/index.scss"; // global css
import "virtual:svg-icons-register";

import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router/index";

createApp(App)
  .use(router)
  .use(createPinia())
  .mount("#app");
