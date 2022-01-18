import { createApp } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss"; // global css

import { createPinia } from "pinia";
import App from "./App.vue";
import SvgIcon from "@/components/SvgIcon.index.vue"; // svg component
import router from "@/router/index";

createApp(App)
  .component("SvgIcon", SvgIcon)
  .use(ElementPlus)
  .use(router)
  .use(createPinia())
  .mount("#app");
