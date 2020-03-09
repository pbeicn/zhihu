/* eslint-disable prettier/prettier */
module.exports = {
  devServer: {
    "/api": {
      target: "http://localhost:9000",
      ws: true,
      changeOrigin: true
    }
  }
};
