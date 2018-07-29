const express = require('express');
const {readPdf} = require('../services/billService.js');

const router = express.Router();

router.get('/', function (req, res, next) {
  let a = readPdf('avro.pdf');
  let e = readPdf('edf.pdf');
  let i = readPdf('isupply.pdf');
  let o = readPdf('octopus.pdf');
  Promise.all([a, e, i, o]).then(values => {
    res.send(values);
  }).catch(e => {
    console.error(e);
    next(e);
  });
});

module.exports = router;
