/* eslint-disable prettier/prettier */
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
