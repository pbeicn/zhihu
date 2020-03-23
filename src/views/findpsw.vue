<template>
  <div>
    <Header :title="titlemsg"></Header>
    <van-tabs v-model="active">
      <van-tab title="1.验证手机号码">
        <br />
        <br />
        <van-field
          v-model="user.phone"
          name=""
          label=""
          :id="wcolor"
          placeholder="请输入注册手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
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
            type="primary"
            @click="sendSms()"
            >发送验证码</van-button
          >
        </van-field>
        <br />
        <div class="box">
          <div class="bo">
            <van-button round block type="info" @click="checkcode">
              下一步
            </van-button>
          </div>
        </div>
      </van-tab>
      <van-tab title="2.设置新密码">
        <br /><br /><van-form @submit="resetpsw">
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
          <div class="box">
            <div class="bo">
              <van-button round block type="info" native-type="submit">
                提交
              </van-button>
            </div>
          </div>
        </van-form></van-tab
      >
    </van-tabs>
  </div>
</template>
<script>
import Header from "@/components/header/header.vue";
import { Dialog } from "vant";
export default {
  components: { Header },
  data() {
    return {
      titlemsg: "找回密码",
      active: 0,
      sendcode: "",
      hascode: 0,
      wcolor: "ls",
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
    sendSms() {
      if (this.user.phone.length != 11) {
        this.tipinfos("手机号长度不正确");
        return;
      }
      this.$ajax
        .get("/api/sendsms?phone=" + this.user.phone)
        .then(res => {
          window.console.log(res);
          this.user.hiddensms = res.data.data;
          //   this.tipinfos("本次验证码:" + res.data.data);
          return;
        })
        .catch(function(error) {
          window.console.log("AAAA" + error);
        });
    },
    checkcode() {
      if (this.user.sms != this.user.hiddensms) {
        this.tipinfos("验证码填写不正确");
        return;
      }
      this.active = 1;
    },
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
          this.tipinfos(res.data.message);
        })
        .catch(err => {
          window.console.log("AAA" + err.response.data.message);
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
<style>
@import "../assets/mm.css";
#ll {
  color: #0ead0e;
}
#ls {
  color: #5a25eb;
}
.bg {
  background: rgb(153, 243, 7);
}
.box {
  width: 100%;
  display: flex;
  justify-content: center;
}
.bo1 {
  display: flex;
  justify-content: center;
}
.bo {
  width: 80%;
}
</style>
