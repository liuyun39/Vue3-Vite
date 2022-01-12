import { createRouter, RouteLocationRaw, createWebHistory } from 'vue-router'

// TODO
const routes = [
  { path: '/', redirect: { name: 'Home' } },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */'@/views/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "Home" */'@/views/about.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router