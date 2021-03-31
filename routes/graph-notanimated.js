var express = require('express');
var Chart = require('chart.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('graph-notanimated', { title: 'Coronadaten - Österreich' });
});

module.exports = router;
