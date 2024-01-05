module.exports = {
  entry: {
    index: "./src/assets/javascripts/index.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "[name].[hash][ext]",
          outputPath: "./assets/images/",
          publicPath: "./assets/images/",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "[name].[hash][ext]",
          outputPath: "./assets/fonts/",
          publicPath: "./assets/fonts/",
        },
      },
    ],
  },
};
