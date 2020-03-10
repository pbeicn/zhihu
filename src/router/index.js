import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";
import reg from "@/views/reg.vue";
import orderReceive from "../views/OrderReceive/OrderReceive";
import orderReceiveList from "../views/OrderReceive/OrderReceiveList";
import orderReceiveDetail from "../views/OrderReceive/OrderReceiveDetail";
import resetpassword from "@/views/resetpassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/reg",
    name: "reg",
    component: reg
  },
  {
    path: "/resetpassword",
    name: "resetpassword",
    component: resetpassword
  },
  {
    path: "/orderReceive",
    name: "orderReceive",
    component: orderReceive,
    children: [
      {
        path: "/orderReceive/orderReceiveList",
        name: "orderReceiveList",
        component: orderReceiveList
      }
    ]
  },
  {
    path: "/orderReceive/orderReceiveDetail",
    name: "orderReceiveDetail",
    component: orderReceiveDetail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
