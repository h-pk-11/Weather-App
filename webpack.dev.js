const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "./static/js/main.bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "template.html"),
      filename: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3000,
    open: {
      app: {
        name: "chrome",
      },
    },
    hot: true,
    watchFiles: ["src/*.html"],
    compress: true,
    historyApiFallback: true,
  },
});
