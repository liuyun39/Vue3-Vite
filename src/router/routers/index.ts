import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: Layout
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    redirect: "/guide",
    children: [
      {
        path: "guide",
        component: () => import("@/views/guide/index.vue"),
        name: "guide",
        meta: {
          title: "Guide"
        }
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      title: "Login",
      hidden: true,
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      title: "404",
      hidden: true,
    }
  },
  {
    path: "/file",
    redirect: "/file/index",
    children: [
      {
        path: "index",
        name: "File",
        component: () => import("@/views/file/index.vue"),
        meta: {
          title: "File"
        }
      }
    ],
  }
];

export default routes;
