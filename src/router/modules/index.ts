/* Router Modules */
import dataRouter from "./data";
import fileRouter from "./file";
import errorRouter from "./error";
import g6Router from "./g6";
import componentsRouter from "./components";
import aesRouter from "./aes";
import fileShowRouter from "./showTxt";
import editRouter from "./edit";
import wangRouter from "./wang";


import type { RouteRecordRaw } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

const routes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      hidden: true,
    },
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/auth-redirect",
    meta: {
      hidden: true,
    },
    component: () => import("@/views/login/auth-redirect.vue")
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Dashboard", icon: "dashboard" },
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "Guide",
        component: () => import("@/views/guide/index.vue"),
        meta: { title: "Guide", icon: "guide"},
      }
    ]
  },
  fileRouter,
  dataRouter,
  errorRouter,
  g6Router,
  componentsRouter,
  aesRouter,
  fileShowRouter,
  editRouter,
  wangRouter,
  // 404 page must be placed at the end !!!
  {
    path: "/*",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  }
];

export default routes;
