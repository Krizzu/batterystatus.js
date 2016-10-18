module.exports = {
  entry: ["./src/index.js"], // entry points
  module: {
    loaders: [
      {
        test: /\.js$/, // look for .js files and use loader on them
        exclude: /(node_modules)/, //don't look inside that folder
        loader: "babel", //babel-loader
        query: {
          presets: ["es2015"], // preset to use es6 - converts es6 to es5
        }
      },
    ]
  },
  output: {
    path: "./",
    filename: "batterystatus.js"
  }
}
