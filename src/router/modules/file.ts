import Layout from "@/layout/index.vue";

const fileRouter = {
  path: "/file",
  component: Layout,
  redirect: "/file/upload",
  name: "FileUpload",
  meta: {
    title: "FileUpload",
    icon: "file"
  },
  children: [
    {
      path: "upload",
      component: () => import("@/views/file/excel-upload/index.vue"),
      name: "UploadFile",
      meta: { title: "UploadFile" }
    },
    {
      path: "md5",
      component: () => import("@/views/file/md5/index.vue"),
      name: "MD5",
      meta: { title: "MD5" }
    },
  ]
};

export default fileRouter;
