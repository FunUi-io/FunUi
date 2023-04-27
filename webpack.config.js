const path = require("path");
    const fileName = "BreadCrumb"
    const extendFolder = ""
    module.exports = {
        mode:"production",
        entry: `./../Funcss/Components/${fileName}.js`,
        output: {
            path: path.resolve("component"),
            filename: `${extendFolder ? extendFolder : ''}${fileName}.jsx`,
            libraryTarget:"commonjs2"
        },
        module:{
            rules:[
                {
                loader: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
        ]
        },
        externals:{
            react:"react"
        }
    }

