// Learn more about configuring Webpack
// https://webpack.js.org/concepts/
import webpack from "webpack"

export default function(env) {
  const isProduction = (env === "production") || (process.env.NODE_ENV === "production")

  return {
    output: {
      path: __dirname + "/js/",
      filename: "[name].js"
    },
    externals: {
      // Any third-party deps added via a <script> tag
      // can be defined here so that they can be required
      // in your application's JS files
      // "jquery": "jQuery"
    },
    resolve: {
      // Can be used to create aliases for imports
      // utilities: path.resolve(__dirname, 'src/js/example/utilities/')
      // => import * from "utilities/filename"
    },
    module: {
      rules: [
        {
          // Enables ES6 syntax for JS
          loader: "babel-loader",
          test: /\.js?$/,
          exclude: /node_modules/,
          query: {cacheDirectory: true}
        }
      ]
    },
    devtool: (isProduction) ? "nosources-source-map" : "cheap-eval-source-map",
    plugins: [
      new webpack.ProvidePlugin({
        // Automatically make packages available
        // without having to require them
        // $: "jquery",
        // jQuery: "jquery",
        fetch: "imports-loader?this=>global!exports?global.fetch!whatwg-fetch"
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })
    ]
  }
}

