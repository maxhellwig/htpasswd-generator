module.exports = {
  publicPath: "/",
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.module
      .rule("worker")
      .test(/\.worker\.js$/i)
      .use("worker-loader")
      .loader("worker-loader");
  }
};
