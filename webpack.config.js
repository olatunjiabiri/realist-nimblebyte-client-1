module.exports = {
  entry: ["./src/App.js"],
  output: {
    filename: "./bundle.js", //File that all react gets compioled into
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
