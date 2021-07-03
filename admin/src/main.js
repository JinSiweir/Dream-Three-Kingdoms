import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "./plugins/element";
import router from "./router";
import http from "./http";

import "./style.css";

//通用上传文件函数
const myMixin = {
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `${localStorage.token || ""}`,
      };
    },
  },
};

const app = createApp(App);

//使用mixin来进行复用
app.mixin(myMixin);

installElementPlus(app);
app.use(router);
// ↓ 用来代替 Vue.prototype.$http
app.config.globalProperties.$http = http;

app.mount("#app");
export default app;
