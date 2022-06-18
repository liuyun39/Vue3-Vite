import Layout from "@/layout/index.vue";

const errorRouter = {
  path: "/aes",
  component: Layout,
  redirect: "/aes/index",
  name: "AES",
  children: [
    {
      name: "AES",
      path: "index",
      component: () => import("@/views/AES/index.vue"),
      meta: {
        title: "AES",
        icon: "file"
      },
    }
  ]
};

export default errorRouter;
