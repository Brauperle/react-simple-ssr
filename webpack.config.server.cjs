const path = require("node:path");
const url = require("node:url");

// "node:path": path,
// "node:url": url,

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
// const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.server.tsx"),
  // externalsPresets: { node: true },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    clean: {
      keep(asset) {
        return asset.includes('public');
      },
    },
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: ".",
    // library: {
    //   type: "module"
    // }
  },
  // experiments: {
  //   outputModule: true,
  // },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      Public: path.resolve(__dirname, path.resolve(__dirname, "dist/public")),
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "esbuild-loader",
        options: {
          target: "esnext",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [],
};
