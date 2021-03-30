var country = "Austria"

var select_countries = document.getElementsByClassName("country")

console.log(select_countries)
// select_countries.forEach(element => {
//   element.addEventListener('click')
// });

var corona_data = {}

await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log("data", data);
    corona_data = data
  })
  .catch(function (error) {
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
      label: 'Personen',
      data: [corona_data["cases"], corona_data["active"], corona_data["deaths"], corona_data["recovered"]],
      backgroundColor: [
        'rgba(54, 162, 235, 0.9)',
        'rgba(255, 206, 86, 0.9)',
        'rgba(255, 99, 132, 0.9)',
        'rgba(75, 192, 192, 0.9)'
      ]
    }]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 4000000
        }
      }]
    }
  }
});

document.getElementById("country--list").addEventListener("change", function (e) {
  let selected = this.options[this.selectedIndex].value

  console.log(selected)

  updateData(myChart, selected)
})

var ctx_pie = document.getElementById('myPieChart');

var myPieChart = new Chart(ctx_pie, {
  type: 'pie',
  data: {
    labels: ['Fälle', 'Aktive Fälle', 'Tode durch Corona', 'Geheilte Fälle'],
    datasets: [{
      label: 'Personen',
      data: [corona_data["active"], corona_data["deaths"], corona_data["recovered"]],
      backgroundColor: [
        'rgba(255, 206, 86, 0.9)',
        'rgba(255, 99, 132, 0.9)',
        'rgba(75, 192, 192, 0.9)'
      ]
    }]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 4000000
        }
      }]
    }
  }
});

document.getElementById("country--list--pie").addEventListener("change", function (e) {
  let selected = this.options[this.selectedIndex].value

  updateData(myPieChart, selected, 'pie')
})


async function updateData(chart, selected, chart_type = 'bar') {
  let new_data = {}

  console.log(selected)

  await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${selected}`)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log("data", data);
      new_data = data
    })
    .catch(function (error) {
      console.log(error);
    });
  
  if (chart_type == 'bar') {
    chart.data.datasets[0].data[0] = new_data["cases"]
    chart.data.datasets[0].data[1] = new_data["active"]
    chart.data.datasets[0].data[2] = new_data["deaths"]
    chart.data.datasets[0].data[3] = new_data["recovered"]
  }
  else {
    chart.data.datasets[0].data[0] = new_data["active"]
    chart.data.datasets[0].data[1] = new_data["deaths"]
    chart.data.datasets[0].data[2] = new_data["recovered"]
  }
  
  chart.update();
}