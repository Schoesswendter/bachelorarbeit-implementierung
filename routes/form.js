var express = require('express');
var router = express.Router();

var unirest = require("unirest");

var req = unirest("GET", "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all");

req.headers({
	"x-rapidapi-key": "c4c1c90ca0msh02018d565331464p1b821bjsn0345a32b6760",
	"x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
	"useQueryString": true
});

var countries = [];

req.end(function (res) {
	if (res.error) throw new Error(res.error);

  countries_temp = res.body;
  countries_temp.forEach(country => {
    if(country["translations"]["de"] != null) {
      countries.push(country["translations"]["de"])
    }
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Bachelorarbeit - Schoesswendter', countries: countries });
});

module.exports = router;
