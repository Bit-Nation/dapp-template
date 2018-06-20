/**
 * Usage: ./fake-pbcontact output.txt 2000
 * * output.txt - The output file.
 * * 2000 - The number of ROWS.
 */

const fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, 'lib/index.js');

const outputPath = path.join(__dirname, 'build.json');
const obj = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dapp_config.json'), 'utf8')
);

const jsonData = obj
  ? obj
  : {
      app_name: 'My App',
      code: 'var3=4',
      image: 'base64...',
    };

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
      console.log('The file was saved!');
    });
  } else {
    console.log(err);
  }
});
