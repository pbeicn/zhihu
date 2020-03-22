<template>
  <div>
    <div id="reg">
      <Header :title="titlemsg"></Header>
    </div>
    <br />
    <br />
    <div>
      <div>
        <van-form @submit="resetpsw">
          <van-field
            v-model="user.phone"
            name=""
            label=""
            placeholder="请输入注册手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
          />
          <br />
          <van-field
            v-model="user.password"
            type="password"
            name=""
            label=""
            placeholder="请设置6-20位登录密码"
            :rules="[{ required: true, message: '请设置6-20位登录密码' }]"
          />
          <br />
          <van-field
            v-model="user.reppassword"
            type="password"
            name=""
            label=""
            placeholder="请再次输入新的登录密码"
            :rules="[{ required: true, message: '请再次输入新的登录密码' }]"
          />
          <br />
          <br />
          <div class="bo1">
            <van-button class="bo" round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
import Header from "@/components/header/header.vue";
import Foot from "@/components/footer/foot.vue";
import { Dialog } from "vant";
export default {
  components: { Header, Foot },
  data() {
    return {
      titlemsg: "重置密码",
      name: "ss",
      tipinfo: "",
      user: {
        phone: "",
        password: "",
        reppassword: ""
      }
    };
  },
  methods: {
    resetpsw() {
      window.console.log(this.user);
      if (this.user.password != this.user.reppassword) {
        this.tipinfos("两次密码输入不一致");
        return;
      }
      if (this.user.phone.length != 11) {
        this.tipinfos("手机号长度不正确");
        return;
      }
      if (this.user.password.length < 6) {
        this.tipinfos("密码长度请大于6位");
        return;
      }
      this.user.username = this.user.phone;
      // let that = this;
      this.$ajax
        .post("/api/modifypassword", this.user)
        .then(res => {
          window.console.log(res);
          window.console.log("a1" + res.code);
          window.console.log("a2" + res.data.code);
          this.tipinfo = res.data.message;
          this.tipinfos(res.data.message);
        })
        .catch(function(error) {
          if (error.response) {
            window.console.log("AAA" + error.response.data.message);
            window.console.log("11111111");
          } else if (error.request) {
            window.console.log("22222222222");
            window.console.log(error.request);
          } else {
            window.console.log("333333333333");
            window.console.log("Error", error.message);
          }
          window.console.log("4444444444");
          window.console.log(error.config);
        });
    },
    tipinfos(info) {
      Dialog.alert({
        message: info
      }).then(() => {
        // on close
      });
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  display: flex;
  justify-content: center;
}
.box div {
  width: 100%;
  text-align: center;
}
.bo1 {
  // background: rgb(124, 98, 219);
  display: flex;
  justify-content: center;
}
.bo {
  width: 80%;
  // background: rgb(153, 243, 7);
}
</style>
