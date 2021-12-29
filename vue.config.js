module.exports = {
  devServer: {
    proxy: {
      // spring 서버 주소를 적는다
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
      },
      // aws s3 url
      "/": {
        target:
          "https://springboot-intern-backend.s3.ap-northeast-2.amazonaws.com/",
        changeOrign: true,
      },
    },
  },
};
