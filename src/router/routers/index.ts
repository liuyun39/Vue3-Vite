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
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/error-page/404.vue"),
    meta: {
      title: "404",
    }
  },
];

export default routes;
