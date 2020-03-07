<template>
  <div>
    <div id="reg" class="reg_reg">
      <Header :title="titlemsg"></Header>
    </div>
    <br />
    <br />
    <br />
    <div class="box">
      <div>
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="请输入注册手机号码"
            class="input3"
            label=""
            :border="aborder"
            placeholder="请输入注册手机号码"
          />
          <van-field
            v-model="username"
            name="请输入短信验证码"
            class="input3"
            label=""
            :border="aborder"
            placeholder="请输入短信验证码"
          />
          <van-field
            v-model="password"
            type="password"
            name="请设置6-20位登录密码"
            class="input3"
            label=""
            placeholder="请设置6-20位登录密码"
          />
          <van-field
            v-model="password"
            type="password"
            name="请设置6-20位登录密码"
            class="input3"
            label=""
            placeholder="请设置6-20位登录密码"
          />
          <br />
          <br />
          <div>
            <van-button
              round
              block
              type="info"
              class="input3"
              native-type="submit"
            >
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header/header.vue";
export default {
  components: { Header },
  data() {
    return {
      titlemsg: "新用户注册",
      name: "ss",
      tipinfo: ""
    };
  },
  methods: {
    regPatient() {
      window.console.log(this.user);
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
.reg_reg {
  background: rgba(245, 245, 245, 1);
  position: relative;
}
.reg_h3 {
  width: 390px;
  height: 50px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  line-height: 50px;
}
.box {
  width: 750px;
  display: flex;
  justify-content: center;
}
.box div {
  width: 700px;
  text-align: center;
}
.input3 {
  font-size: 40px;
  height: 80px;
}
</style>
