const express = require('express');
const {readPdf} = require('../services/billService.js');

const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', {title: 'Bill'});
});

router.get('/bill', function (req, res, next) {

  readPdf('../resources/avro.pdf', res, next);
});

module.exports = router;
