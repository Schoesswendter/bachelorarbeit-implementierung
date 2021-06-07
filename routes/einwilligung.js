var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('einwilligung', { title: 'Bachelorarbeit - Schoesswendter' });
});

module.exports = router;
