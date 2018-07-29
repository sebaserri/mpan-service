const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf2json');

exports.readPdf = (pdfFilename) => {
  return new Promise((resolve, reject) => {
    let file = path.join(__dirname.replace('services', 'resources'), pdfFilename);
    let fileJson = path.join(__dirname.replace('services', 'resources'), `${pdfFilename}.txt`);
    _pdfToString(file, fileJson).then((filename) => {
      _read(filename).then((data) => {
        let mpan = _fetchMpan(data);
        resolve(mpan);
      });
    }).catch((e) => {
      console.error(e);
      reject(e);
    });
  });
};


_pdfToString = (file, fileJson) => {
  return new Promise((resolve, reject) => {
    let pdfParser = new PDFParser(this, 1);
    pdfParser.on("pdfParser_dataError", (errData) => {
      console.error(errData.parserError);
      reject(errData);
    });
    pdfParser.on("pdfParser_dataReady", pdfData => {
      fs.writeFile(fileJson, JSON.stringify(pdfParser.getRawTextContent(pdfData)));
      resolve(fileJson);
    });
    pdfParser.loadPDF(file);
  });
};

_read = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

_fetchMpan = (data) => {
  data = data.replace(/\r?\n|\r/g, '');
  let mpanIndex = data.search(/mpan/i);
  if (mpanIndex <0) {
    mpanIndex = data.search(/supply number/i);
  }
  let found = false;
  let mpan = [];

  for(let i = mpanIndex; i <= data.length; i++) {
    let c = data.charAt(i);
    if (c.toUpperCase() === 's'.toUpperCase() && _isNumeric(data.charAt(i+1))) {
      found = true;
    } else if (found && _isNumeric(c) && mpan.length < 21) {
      mpan.push(c);
    }
  }
  return mpan.join('');
};

_isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
