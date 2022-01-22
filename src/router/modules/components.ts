import Layout from "@/layout/index.vue";

const componentsRouter = {
  path: "/components",
  component: Layout,
  redirect: "/components/back-to-top",
  name: "ComponentDemo",
  meta: {
    title: "Components",
    icon: "component"
  },
  children: [
    {
      path: "back-to-top",
      component: () => import("@/views/components-demo/back-to-top.vue"),
      name: "BackToTopDemo",
      meta: { title: "Back To Top" }
    },
    {
      path: "drag-dialog",
      component: () => import("@/views/components-demo/drag-dialog.vue"),
      name: "DragDialogDemo",
      meta: { title: "Drag Dialog" }
    },
  ]
};

export default componentsRouter;
