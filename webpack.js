const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

/* Helper functions start*/
const ensureDirectoryExistence = filePath => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const base64Encode = file => {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
};

/* Helper functions end*/

const filePath = path.join(__dirname, 'dist/index.js');
const outputPath = path.join(__dirname, 'build/build.json');
const appIconPath = path.join(__dirname, 'appIcon.png');

const mode = process.argv[2]; // get mode argurment from command line

const dappConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dapp_config.json'), 'utf8')
);

const dAppMetaData = dappConfig
  ? { ...dappConfig, image: base64Encode(appIconPath) }
  : {};

const writeBuildFile = () => {
  fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
      const content = JSON.stringify({
        ...dAppMetaData,
        code: data,
      });
      ensureDirectoryExistence(outputPath);
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

const compiler = webpack({
  entry: ['babel-polyfill', './app.js'],
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
    writeBuildFile();
    if (mode != 'development') {
      watching.close();
    }
  }
);
