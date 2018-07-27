var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bill' });
});

router.get('/bill', function(req, res, next) {


  res.send({title: 'Bill'});
});


module.exports = router;
