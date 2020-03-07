import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import qs from "qs";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from "@fortawesome/vue-fontawesome";
import Vant from "vant";
import "vant/lib/index.css";
import "@/assets/mm.css";

library.add(fas, far, fab);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
Vue.use(Vant);

Vue.config.productionTip = false;
axios.interceptors.request.use(
  config => {
    let authtoken = sessionStorage.getItem("access_token");
    if (authtoken !== null) {
      config.headers.Authorization = authtoken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   const role = sessionStorage.getItem("access_token");
//   window.console.log(to.path);
//   window.console.log(role);
//   if (to.path == "/reg") {
//     sessionStorage.removeItem("access_token");
//     next();
//   }
//   if (!role && (to.path !== "/" || to.path !== "/")) {
//     sessionStorage.removeItem("access_token");
//     next("/");
//   } else if (to.path === "/") {
//     sessionStorage.removeItem("access_token");
//     next();
//   } else {
//     next();
//   }
// });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
