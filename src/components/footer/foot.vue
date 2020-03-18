<template>
  <div>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="home-o"
        >接单赚钱<img slot="icon" src="@/assets/p1.png" />
      </van-tabbar-item>
      <van-tabbar-item icon="search"
        >点赞推广<img slot="icon" src="@/assets/p2.png"
      /></van-tabbar-item>
      <van-tabbar-item icon="friends-o"
        >反对压制<img slot="icon" src="@/assets/p3.png"
      /></van-tabbar-item>
      <van-tabbar-item icon="setting-o"
        >定制推广<img slot="icon" src="@/assets/p4.png"
      /></van-tabbar-item>
      <van-tabbar-item icon="setting-o"
        >我的<img slot="icon" src="@/assets/p5.png"
      /></van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 4
    };
  },
  methods: {
    onChange(index) {
      alert(index);
      if (index == "0") {
        this.$router.push("/reg");
      }
    }
  }
};
</script>
