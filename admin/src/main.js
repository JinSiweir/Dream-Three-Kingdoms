import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "./plugins/element";
import router from "./router";
import http from "./http";

import "./style.css";

const app = createApp(App);
installElementPlus(app);

app.use(router);
// ↓ 用来代替 Vue.prototype.$http
app.config.globalProperties.$http = http;
app.mount("#app");
