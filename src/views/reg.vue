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
            v-model="user.sms"
            center
            clearable
            label=""
            placeholder="请输入短信验证码"
          >
            <van-button
              slot="button"
              size="small"
              :disabled="smsdis"
              type="primary"
              @click="sendSms()"
              >{{ buttonvalue }}</van-button
            ><van-count-down :time="time" />
          </van-field>
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
          <div class="bo1">
            <van-button class="bo" round block type="info" native-type="submit">
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
      time: 60 * 1000,
      tipinfo: "",
      smsdis: false,
      buttonvalue: "发送验证码",
      user: {
        phone: "",
        sms: "",
        hiddensms: "",
        password: "",
        reppassword: ""
      }
    };
  },
  methods: {
    regUser() {
      window.console.log(this.user);
      if (this.user.password != this.user.reppassword) {
        this.tipinfos("两次密码输入不一致");
        return;
      }
      if (this.user.phone.length != 11) {
        this.tipinfos("手机号长度不正确");
        return;
      }
      if (this.user.sms.length != 6) {
        this.tipinfos("请填写6位数字验证码");
        return;
      }
      if (this.user.sms != this.user.hiddensms) {
        this.tipinfos("验证码填写不正确");
        return;
      }
      if (this.user.password.length < 6) {
        this.tipinfos("密码长度请大于6位");
        return;
      }
      this.user.username = this.user.phone;
      // let that = this;
      this.$ajax
        .post("/api/reg", this.user)
        .then(res => {
          window.console.log(res);
          this.tipinfo = res.data.message;
          this.tipinfos(res.data.message);
        })
        .catch(function(error) {
          window.console.log(error);
        });
    },
    sendSms() {
      if (this.user.phone.length != 11) {
        this.tipinfos("手机号长度不正确");
        return;
      }
      this.$ajax
        .get("/api/sendsms?phone=" + this.user.phone)
        .then(res => {
          window.console.log(res);
          this.buttonvalue = "";
          this.smsdis = true;
          this.countDown(60);
          this.tipinfos("本次验证码:" + res.data.data);
        })
        .catch(function(error) {
          window.console.log("AAAA" + error);
        });
    },
    // 倒计时 方法
    countDown(time) {
      if (time === 0) {
        this.smsdis = false;
        this.buttonvalue = "发送验证码";
        return;
      } else {
        this.smsdis = true;
        this.buttonvalue = "重新发送(" + time + ")";
        time--;
      }
      setTimeout(() => {
        this.countDown(time);
      }, 1000);
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
