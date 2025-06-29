const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/renderer/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist/renderer'),
      },
      {
        directory: path.join(__dirname, 'public'),
      },
    ],
    port: 3000,
    hot: true,
    open: false,
    historyApiFallback: true,
  },
}; 