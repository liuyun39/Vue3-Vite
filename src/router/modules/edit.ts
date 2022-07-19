import Layout from "@/layout/index.vue";

const editRouter = {
  path: "/edit",
  component: Layout,
  redirect: "/edit/handle",
  name: "EditHandle",
  children: [
    {
      name: "EditHandle",
      path: "handle",
      component: () => import("@/views/edit/index.vue"),
      meta: {
        title: "富文本编辑",
        icon: "error"
      },
    }
  ]
};

export default editRouter;
