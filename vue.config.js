/* eslint-disable prettier/prettier */
module.exports = {
  devServer: {
    proxy: {
      "/sisp-business": {
        target: "http://211.143.59.146:9045",
        ws: true,
        changeOrigin: true
      },
      "/api": {
        target: "http://localhost:9000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
