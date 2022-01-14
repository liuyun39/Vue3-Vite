import { createRouter, createWebHistory } from "vue-router";
import routes from "./routers/index";
import type { Router } from "vue-router";

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
