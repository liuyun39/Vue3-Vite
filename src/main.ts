import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import App from "./App.vue";

import router from "@/router/index";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(createPinia());
app.mount("#app");
