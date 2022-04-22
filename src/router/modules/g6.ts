import Layout from "@/layout/index.vue";

const errorRouter = {
  path: "/g6",
  component: Layout,
  redirect: "/g6/index",
  name: "G6",
  children: [
    {
      name: "G6",
      path: "index",
      component: () => import("@/views/G6/index.vue"),
      meta: {
        title: "G6",
        icon: "file"
      },
    }
  ]
};

export default errorRouter;
