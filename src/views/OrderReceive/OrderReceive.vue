<template>
  <div id="orm">
     <van-row class="tabs" >
      <van-col span="8"  v-bind:class="['tab',tabIndex==1?'selectTab':'unselectTab']" @click="clickTable(1)">
        点赞
       </van-col>
      <van-col span="8"  v-bind:class="['tab',tabIndex==2?'selectTab':'unselectTab']"  @click="clickTable(2)">
        反对
       </van-col>
      <van-col span="8" v-bind:class="['tab',tabIndex==3?'selectTab':'unselectTab']"  @click="clickTable(3)">
        其他
      </van-col>
    </van-row>
   <router-view />
  </div>
</template>
<script type="text/javascript">
    export default {
        name: 'orm',
        data() {
            return {
                tabIndex:1
            }
        },
        methods: {
            clickTable(index) {
              this.tabIndex=index;
             this.$router.push({path:'/orderReceive/orderReceiveList',query: {tabIndex:index}})
            }
        }
    }
</script>
<style>
  .tabs{
    width: 100%;
    height:70px;
  }
  .tab{
    height: 70px;
    line-height: 70px;
    font-size: 30px;
    text-align:center;
    vertical-align:middle;
  }
  .unselectTab{
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(242, 242, 242, 1);
  }
  .selectTab{
    background-color: #02A7f0;
    color: white;
  }
</style>