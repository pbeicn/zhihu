<template>
  <div>
    <div id="reg">
      <Header :title="titlemsg"></Header>
    </div>
    <br />
    <br />
    <div>
      <div>
        <van-form @submit="regUser">
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
            placeholder="请再次确认登录密码"
            :rules="[{ required: true, message: '请再次确认登录密码' }]"
          />
          <br />
          <br />
          <br />
          <br />
          <div>
            <van-button round block type="info" native-type="submit">
              注册
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    <br />
    <div class="box1">
      <div>
        <router-link to="/" style="color: #108EE9"
          >已有帐户,立即登录</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header/header.vue";
import { Dialog } from "vant";
export default {
  components: { Header },
  data() {
    return {
      titlemsg: "新用户注册",
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
    regUser() {
      window.console.log(this.user);
      if (this.user.password != this.user.reppassword) {
        Dialog.alert({
          message: "两次密码输入不一致"
        }).then(() => {
          // on close
        });
      }
      this.$ajax
        .put("/api/v1/register/user", this.user)
        .then(res => {
          window.console.log(res);
          this.tipinfo = res.data.message;
          this.success();
        })
        .catch(res => {
          window.console.log(res);
        });
    },
    success() {
      this.$success({
        title: "成功提示",
        // JSX support
        content: this.tipinfo
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
</style>
