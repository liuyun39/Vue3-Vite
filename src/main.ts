import { createApp } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss"; // global css

import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router/index";

createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(createPinia())
  .mount("#app");
