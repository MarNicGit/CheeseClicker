const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: ['./src/scripts/main.ts', './src/style/site.scss'],
    devtool: 'source-map',
    output: {
      filename: 'clicky.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        { test: /\.tsx?$/i, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.s[ac]ss$/i, use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[name].css'
            }
          },
          {
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true
            }
          }
        ]}
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/assets/img/*.png',
            to: 'img/',
            flatten: true
          },
          {
            from: 'src/assets/img/*.svg',
            to: 'img/',
            flatten: true
          },
          {
            from: 'src/index.html',
            to: 'index.html',
            flatten: true
          },
        ]
      })
    ]
  };