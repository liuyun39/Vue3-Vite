import Layout from "@/layout/index.vue";

const fileShowRouter = {
  path: "/show-txt",
  component: Layout,
  redirect: "/show-txt/index",
  name: "showTxt",
  children: [
    {
      name: "showTxt",
      path: "/show-txt/index",
      component: () => import("@/views/showTxt/index.vue"),
      meta: {
        title: "文本编辑展示",
        icon: "file"
      },
    }
  ]
};

export default fileShowRouter;
