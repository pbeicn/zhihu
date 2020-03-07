/* eslint-disable prettier/prettier */
module.exports = {
  devServer: {
    proxy: {
      "/youzhan": {
        target: "http://127.0.0.1:8080",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
