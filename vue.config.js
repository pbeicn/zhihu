/* eslint-disable prettier/prettier */
//临时配置测试地址1
module.exports = {
  devServer: {
    port: 8082,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
