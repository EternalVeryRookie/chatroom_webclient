const webpack = require("webpack");
const path = require("path");


module.exports = {
    context: __dirname, // ビルド対象ディレクトリ
    entry : { // ビルドの起点となるファイル
        client: path.join(__dirname, 'src', 'client.js'),
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },
    watch: true,
    watchOptions: {
      poll: true
    },
    devtool: "source-map",
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [
              "style-loader", 
              {
                loader: "css-loader",
                options: {
                  //URL の解決を有効に
                  url: false,  //デフォルトは true なので省略可能
                  // ソースマップを有効に
                  sourceMap: true,
                  modules: true,
                  importLoaders: 2,
                }
              },
              {
                loader: "sass-loader"
              }
            ],
          },
          {
            test: /\.css$/i,
            use: [
              "style-loader", 
              {
                loader: "css-loader",
                options: {
                  //URL の解決を有効に
                  url: true,  //デフォルトは true なので省略可能
                  // ソースマップを有効に
                  sourceMap: true,
                  modules: true,
                }
              }
            ],
          },
          {
            // 対象となるファイルの拡張子
            test: /\.(gif|png|jpe?g|eot|wof|woff|woff2|ttf)$/i,
            use: [
              {
                //画像をData URI（Base64）に変換するローダー
                loader: "url-loader",
              }
            ]
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-react", "@babel/preset-env"],
                  plugins: ["@babel/plugin-transform-runtime"],
                },
              }
            ]
          },
          {
            test: /\.svg$/,
            exclude: /node_modules/,
            use: {
              loader: 'file-loader',
              options: {
                name: "[name].[ext]"
              }
            } 
          }
        ]
    },
    resolve: {
      modules: [
        __dirname,
        path.resolve("./node_modules")
      ],
      alias: {
        ENV: path.resolve(__dirname, `.env/${process.env.NODE_ENV}.js`)
      },
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV,
      })
    ]
};