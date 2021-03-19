fetch("https://www.trackcorona.live/api/countries")
.then((resp) => resp.json())
.then(function(data) {
  console.log("data", data["data"][38]);
})
.catch(function(error) {
  console.log(error);
});