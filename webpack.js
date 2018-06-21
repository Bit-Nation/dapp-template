const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const filePath = path.join(__dirname, 'dist/index.js');
const outputPath = path.join(__dirname, 'build.json');
const appIconPath = path.join(__dirname, 'appIcon.png');

const base64_encode = file => {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
};

const obj = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dapp_config.json'), 'utf8')
);

const jsonData = obj ? { ...obj, image: base64_encode(appIconPath) } : {};

console.log('====================================');
console.log(jsonData);
console.log('====================================');
const writeFile = () => {
  fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
      const content = JSON.stringify({
        ...jsonData,
        code: data,
      });
      fs.writeFile(outputPath, content, 'utf8', function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('success write update');
      });
    } else {
      console.log(err);
    }
  });
};

const mode = process.argv[2];
const compiler = webpack({
  entry: ['babel-polyfill', './main.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: mode ? mode : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
});

const watching = compiler.watch(
  {
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined,
  },
  (err, stats) => {
    // Print watch/build result here...
    writeFile();
    if (mode != 'development') {
      watching.close();
    }
  }
);
