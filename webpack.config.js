// webpack.config.js 는 모던 js를 이해하지 못 해서 예전 js 코드를 써야 한다.
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractCSS = require('extract-text-webpack-plugin');

const MODE = process.env.WEBPACK_ENV;
// __dirname은 현재 js의 경로, resolve는 assets 안에 js 안에 main.js 를 찾아옴.
// path.join은 찾은 파일을 static 이라는 폴더로 내보냄.
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
const OUTPUT_DIR = path.join(__dirname, 'static');

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    // config는 아래에서 위로 출력됨. sass -> postcss -> css-loader 순서.
    // extract는 css를 추출해서 가져온다.
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: 'css-loader',
          },
          {
            // css로 추출한 sass 파일을 호환성있게 만들어주는 것 (크로스 브라우징 같은)
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer({ browsers: 'cover 99.5%' })];
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js',
  },
  plugins: [new ExtractCSS('styles.css')],
};

module.exports = config;
