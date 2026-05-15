/* eslint @typescript-eslint/no-var-requires: "off" */
const plugins = require("./webpack.main.plugins");

module.exports = {
  entry: "./src/main.ts",

  externals: {
    realm: "commonjs realm",
  },

  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },

  plugins: plugins,
};
