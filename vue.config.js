/* eslint-disable prettier/prettier */
//临时配置测试地址1
module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://10.19.192.95:9000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
