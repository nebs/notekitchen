var fs = require('fs');
var path = require('path');
var root = path.resolve(__dirname, "..", "..");
var contents = fs.readFileSync(root + '/package.json');
var pjson = {};

if (contents) {
    pjson = JSON.parse(contents);
}

module.exports = pjson;
