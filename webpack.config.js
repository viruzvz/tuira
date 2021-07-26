const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = (env = {}, argv) => {
  const isDev = argv.mode !== 'production'
  const PUBLIC_PATH = isDev ? '/' : '/'

  const config = {
    entry: {
      main: { import: './src/index.js', dependOn: 'vendor' },
      vendor: ['jquery', 'bootstrap']
    },

    resolve: {
      mainFields: ['browser', 'main', 'module'],
      alias: {
        'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
      }
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: isDev ? '/' : PUBLIC_PATH
    },

    devServer: {
      contentBase: path.resolve('./src'),
      publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        { test: /\.pug$/, use: ['pug-loader'] },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: ['autoprefixer']
                }
              }
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: ['autoprefixer']
                }
              }
            },
            'less-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          exclude: [/fonts/],
          use: 'file-loader?name=images/[name].[contenthash:5].[ext]'
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)$/,
          use: 'file-loader?name=fonts/[name].[hash:5].[ext]'
        }
      ]
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            output: { comments: /tuira/ },
            compress: { drop_console: true }
          }
        }),
        new CSSMinimizerPlugin()
      ]
    },

    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    },

    devtool: isDev ? 'source-map' : undefined,

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      ...glob.sync(isDev ? 'src/*.pug' : 'src/*.pug').map(
        (fileName) =>
          new HtmlWebpackPlugin({
            template: fileName,
            filename: path.basename(fileName).replace(/pug$/, 'html')
          })
      )
    ].concat(
      isDev ? [
        new CleanWebpackPlugin()
      ] : [
        new CopyPlugin({
          patterns: [{ from: 'src/assets/', to: 'assets' }]
        })
      ]
    )
  }

  if (env.analyze) {
    config.plugins.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'static' })
    )
  }

  return config
}
