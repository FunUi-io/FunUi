
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { webpack } = require('webpack');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: '../../assets/ui/Text.js',
  
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
  
// const path = require("path");

// const type = "component"

// if(type == "component"){
//     const fileName = "Text"
//     const extendFolder = "native"
//     module.exports = {
//         mode:"production",
//         entry: `./../assets/ui/${fileName}.tsx`,
//         output: {
//             path: path.resolve("component"),
//             filename: `${extendFolder ? extendFolder : ''}${fileName}.tsx`,
//             libraryTarget:"commonjs2"
//         },
//         module:{
//             rules:[
//                 {
//                 loader: 'babel-loader',
//                 test: /\.(js|jsx|ts|tsx)$/,
//                 exclude: /node_modules/,
//                 options: {
//                     presets: ['@babel/preset-env', '@babel/preset-react']
//                   }
//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader']
//               }
//         ]
//         },
//         externals:{
//             react:"react"
//         }
//     }


// }else if (type === "js"){
//     const fileName = "Fun"
//     module.exports = {
//         mode:"production",
//         entry: `./../Funcss/js/${fileName}.jsx`,
//         output: {
//             path: path.resolve("js"),
//             filename: `${fileName}.jsx`,
//             libraryTarget:"commonjs2"
//         },
//         module:{
//             rules:[
//                 {
//                 loader: 'babel-loader',
//                 test: /\.(js|jsx|ts|tsx)$/,
//                 exclude: /node_modules/,
//                 options: {
//                     presets: ['@babel/preset-env', '@babel/preset-react']
//                   }
//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader']
//               }
//         ]
//         },
//         externals:{
//             react:"react"
//         }
//     }


// }