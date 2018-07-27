var fs = require('fs');
var obj;

fs.readFile('./file.json', 'utf8', (err, data) => {
  if (err) {
  	throw err;
  }
  obj = JSON.parse(data);
  console.log(obj[0].name);
});

