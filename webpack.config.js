const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack');

const cssLoader = (esModule = false, importLoaders = 0) => {
  return {
    loader: 'css-loader',
    options: {
      esModule: esModule,
      importLoaders: importLoaders
    }
  }
}

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash:8].js',
    clean: true
  },
  stats: {
    children: true
  },
  devServer: {
    open: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          cssLoader(false, 1),
          'postcss-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          cssLoader(false, 2),
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(styl(us)?)$/,
        use: [
          'style-loader',
          cssLoader(false, 2),
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: "images/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff2?|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "static/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin({
      template: 'index.html',
      title: '我的主页',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico')
    }),
    new DefinePlugin({
      'process.env': {
        BASE_URL: process.env.BASE_URL
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'public/markdown'), 
          to: "markdown"
        }
      ],
    })
  ]
}
