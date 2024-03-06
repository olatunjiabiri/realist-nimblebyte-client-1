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
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules\/(?!react-stepper)/, // Exclude node_modules except react-stepper
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
