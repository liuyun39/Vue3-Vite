import Layout from "@/layout/index.vue";

const componentsRouter = {
  path: "/data",
  component: Layout,
  redirect: "/data/handle",
  name: "Data",
  meta: {
    title: "Data",
    icon: "data"
  },
  children: [
    {
      path: "handle",
      component: () => import("@/views/data/Handle.vue"),
      name: "Handle",
      meta: { title: "handle" }
    },
    {
      path: "show",
      component: () => import("@/views/data/Show.vue"),
      name: "Show",
      meta: { title: "show" }
    },
    {
      path: "tableTile",
      component: () => import("@/views/data/TableTitle.vue"),
      name: "tableTile",
      meta: { title: "tableTile" }
    },
  ]
};

export default componentsRouter;
