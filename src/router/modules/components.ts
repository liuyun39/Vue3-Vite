import Layout from "@/layout/index.vue";

const errorRouter = {
  path: "/components",
  component: Layout,
  redirect: "/components/index",
  name: "ComponentsIndex",
  children: [
    {
      name: "ComponentsIndex",
      path: "index",
      component: () => import("@/views/components/index.vue"),
      meta: {
        title: "ComponentsIndex",
        icon: "error"
      },
    }
  ]
};

export default errorRouter;
