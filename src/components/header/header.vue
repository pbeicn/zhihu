<template>
  <div class="box_reg box_reg-center">
    <div class="reg_h2">
      <router-link to="/" style="color: #108EE9">返回</router-link>
    </div>
    <div class="reg_h3">{{ title }}</div>
  </div>
</template>
<script>
export default {
  props: { title: String }
};
</script>
<style lang="less" scoped>
.reg_h2 {
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 144, 255, 1);
}
.reg_h3 {
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.box_reg {
  width: 745px;
  height: 100px;
  // backgsround: rgb(185, 44, 44);
  border-bottom: 1px solid rgb(235, 227, 227);
  display: flex;
}
.box_reg div {
  text-align: center;
}
.box_reg div:nth-of-type(1) {
  font-size: 36px;
  // background: rgb(102, 29, 170);
  flex-grow: 1;
}
.box_reg div:nth-of-type(2) {
  font-size: 36px;
  // background: rgb(185, 44, 44);
  flex-grow: 9;
}

.box_reg-center {
  align-items: center;
}
</style>
