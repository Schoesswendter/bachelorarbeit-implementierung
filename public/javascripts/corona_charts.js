var country = ""

var select_countries = document.getElementsByClassName("country")

console.log(select_countries)
// select_countries.forEach(element => {
//   element.addEventListener('click')
// });

var corona_data = {}

await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
.then((resp) => resp.json())
.then(function(data) {
  console.log("data", data);
  corona_data = data
})
.catch(function(error) {
  console.log(error);
});

console.log("All data", corona_data)
console.log("cases", corona_data["cases"])

var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Fälle', 'Aktive Fälle', 'Tode durch Corona', 'Geheilte Fälle'],
      datasets: [{
          label: '# of Votes',
          data: [corona_data["cases"], corona_data["active"], corona_data["deaths"], corona_data["recovered"]],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});