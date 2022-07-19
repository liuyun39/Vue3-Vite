import Layout from "@/layout/index.vue";

const errorRouter = {
  path: "/wang",
  component: Layout,
  redirect: "/wang/index",
  name: "Wang",
  children: [
    {
      name: "Wang",
      path: "index",
      component: () => import("@/views/Wang/index.vue"),
      meta: {
        title: "Wang",
        icon: "file"
      },
    }
  ]
};

export default errorRouter;
