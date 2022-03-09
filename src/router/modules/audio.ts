import Layout from "@/layout/index.vue";

const audioRouter = {
  path: "/audio",
  component: Layout,
  redirect: "/audio/index",
  name: "Audio",
  children: [
    {
      name: "Audio",
      path: "index",
      component: () => import("@/views/audio/index.vue"),
      meta: {
        title: "Audio",
        icon: "error"
      },
    }
  ]
};

export default audioRouter;
