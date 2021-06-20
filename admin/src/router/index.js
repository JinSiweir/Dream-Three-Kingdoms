import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [{ path: "/categories/create", component: CategoryEdit }],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
