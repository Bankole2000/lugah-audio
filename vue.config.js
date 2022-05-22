module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Lugah Audio";
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === "production" ? "/lugah-audio" : "/"
  // publicPath: '',
  // baseUrl: '/projects/vue/webpieces/dist/',
};