const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'babel-loader'],
        type: 'javascript/auto',
      },
    ],
  },
};
