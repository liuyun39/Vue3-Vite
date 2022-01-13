import { createRouter, RouteLocationRaw, createWebHistory } from "vue-router";

// TODO
const routes = [
  { path: "/", redirect: { name: "Home" } },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
