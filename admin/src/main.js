import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "./plugins/element";
import router from "./router";

const app = createApp(App).use(router);
installElementPlus(app);

import http from "./http";
// ↓ 用来代替 Vue.prototype.$http
app.config.globalProperties.$http = http;

app.mount("#app");
