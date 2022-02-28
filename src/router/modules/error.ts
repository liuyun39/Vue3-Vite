import Layout from "@/layout/index.vue";

const errorRouter = {
  path: "/error",
  component: Layout,
  redirect: "/error/handle",
  name: "ErrorHandle",
  children: [
    {
      name: "ErrorHandle",
      path: "handle",
      component: () => import("@/views/error-page/ErrorHandle.vue"),
      meta: {
        title: "ErrorHandle",
        icon: "error"
      },
    }
  ]
};

export default errorRouter;
