<template>
  <div class="login_h1">
    <br />
    <br />
    <br />
    <br />
    <br />
    <table width="100%">
      <tr>
        <td width="35%" align="right">
          <img src="@/assets/gexinghuadingzhi.png" class="img1" />
        </td>
        <td align="left">
          <img src="@/assets/login-bb.png" class="img1" />
        </td>
      </tr>
    </table>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="box">
      <div>
        <van-form @submit="onSubmit">
          <van-field
            v-model="logininfo.username"
            name="手机号码"
            label=""
            :border="aborder"
            placeholder="手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
          />
          <van-field
            v-model="logininfo.password"
            type="password"
            name="登录密码"
            label=""
            placeholder="登录密码"
            :rules="[{ required: true, message: '请填写登录密码' }]"
          />
          <br />
          <br />
          <div class="bo1">
            <van-button class="bo" round block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    <br />
    <br />
    <div class="box1">
      <div>
        <router-link to="/reg" style="color: #108EE9;width:80%"
          >注册新用户</router-link
        >
      </div>
      <div>
        <router-link to="/findpsw" style="color: #108EE9;width:80%"
          >找回密码</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      aborder: true,
      logininfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      sessionStorage.clear();
      this.$ajax
        .post("/api/login", this.logininfo)
        .then(res => {
          window.console.log(res);
          if (res.data.code == "0") {
            sessionStorage.setItem("access_token", res.data.token);
            this.$router.push("/orderReceive/orderReceiveDetail?orderid=2");
          } else {
            this.tipinfos(res.data.message);
          }
        })
        .catch(res => {
          window.console.log(res);
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
input::-webkit-input-placeholder {
  color: #d9d9d9;
  font-size: 36px;
}
.bg {
  background: rgb(153, 243, 7);
}
.login_input {
  height: 100px;
  font-size: 36px;
}
.login_h1 {
  background: rgba(255, 255, 255, 1);
}

.box1 {
  justify-content: center;
  font-size: 14px;
}
.img1 {
  height: 90px;
}
.box {
  width: 100%;
  display: flex;
  justify-content: center;
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
.box div {
  width: 100%;
  text-align: center;
}
.box1 {
  width: 100%;
  display: flex;
  justify-content: center;
  div {
    width: 100%;
    text-align: center;
    color: rgb(85, 132, 226);
  }
}
</style>
