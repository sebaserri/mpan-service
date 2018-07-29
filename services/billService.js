const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf2json');

module.exports = {
  readPdf: (pdfFilename, res, next) => {
    let file = path.join(__dirname.replace('services', 'resources'), pdfFilename);
    let fileJson = path.join(__dirname.replace('services', 'resources'), "avron.json");
    _pdfToString(file, fileJson).then((filename) => {

      _findMpam(filename);

      res.send(filename);
    }).catch((e) => {
      console.error(e);
      next(e);
    });
  }
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

_findMpam = (filename) => {

  fs.readFile(filename, "utf-8", (err, data) => {
   console.log(data);
  });


};