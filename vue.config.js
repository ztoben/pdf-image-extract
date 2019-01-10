module.exports = {
  devServer: {
    port: 8888
  },
  baseUrl: process.env.NODE_ENV === 'DEV' ? '/' : '/pdf-image-extract/',
};
