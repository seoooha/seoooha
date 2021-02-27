const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        style: "./public/css/style.less",
    },
    output: {
        filename: '[name].js?[chunkhash]',
        path: path.resolve(__dirname + '/dist'), 
        publicPath: "../"
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  strictMath: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg)$/,
          use: [
            'file-loader'
          ]
        },
      ],
    },
  }; 