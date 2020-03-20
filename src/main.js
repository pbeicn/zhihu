import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import qs from "qs";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";

Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
Vue.use(Vant);

Vue.config.productionTip = false;
axios.interceptors.request.use(
  config => {
    let authtoken = sessionStorage.getItem("access_token");
    if (authtoken !== null) {
      if (config.url.indexOf("/people") == -1) {
        window.console.log(config.url);
        config.headers.Authorization = authtoken;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem("access_token");
  window.console.log(to.path);
  window.console.log(role);
  if (to.path == "/reg") {
    sessionStorage.removeItem("access_token");
    next();
  } else {
    if (!role && (to.path !== "/" || to.path !== "/")) {
      sessionStorage.removeItem("access_token");
      next("/");
    } else if (to.path === "/") {
      sessionStorage.removeItem("access_token");
      next();
    } else {
      next();
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
