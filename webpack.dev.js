const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { createProxyMiddleware } = require('http-proxy-middleware');
//https://knowledge.udacity.com/questions/308599  + https://webpack.js.org/plugins/copy-webpack-plugin/
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    entry: './src/client/index.js',
    output: {
         libraryTarget: 'var',
         library: 'client'
     },
  //https://knowledge.udacity.com/questions/250269
    /*  devServer: {
      host: 'localhost',
       port: 8080,
       inline: true,
       hot: true,
             proxy:{
             context: () => true,
             target: "http://localhost:1515",
             secure: false,
             changeOrigin: true
       }
     },*/
      devServer: {
      proxy: {
      '/allkeys': 'http://localhost:1515',
              },
            },

    module : {
    rules: [
                   {
               test: '/\.js$/',
               exclude: /node_modules/,
               loader: "babel-loader"
             },
             {
                  test: /\.(png|jpe?g|gif)$/i,
                  use: [
                    {
                      loader: 'file-loader',
                    },
                  ],
                },
             {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
              }
           ]
         },
       plugins: [
         new CopyPlugin({
           patterns: [{ from: './src/client/media',
            to: 'media' }]
         }),

        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
          // Simulate the removal of files
          dry: true,
          // Write Logs to Console
          verbose: true,
          // Automatically remove all unused webpack assets on rebuild
          cleanStaleWebpackAssets: true,
          protectWebpackAssets: false
  }),
  //https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
  new WorkboxPlugin.GenerateSW({
// Do not precache images
exclude: [/\.(?:png|jpg|jpeg|svg)$/],

// Define runtime caching rules.
runtimeCaching: [{
  // Match any request that ends with .png, .jpg, .jpeg or .svg.
  urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

  // Apply a cache-first strategy.
  handler: 'CacheFirst',

  options: {
    // Use a custom cache name.
    cacheName: 'images',

    // Only cache 10 images.
    expiration: {
      maxEntries: 10,
    },
  },
}],
})
      ]
}
