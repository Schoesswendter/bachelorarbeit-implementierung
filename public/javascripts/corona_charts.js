var country = "Austria"

var select_countries = document.getElementsByClassName("country")

var corona_data = {}

await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
  .then((resp) => resp.json())
  .then(function (data) {
    corona_data = data
  })
  .catch(function (error) {
    console.log(error);
  });

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
    animation: {
      duration: 7000,
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 4000000,
          fontSize: 16,
          fontColor: 'black',
          stepSize: 1000000
        }
      }],
      xAxes: [{
        ticks: {
          fontSize: 16,
          fontColor: 'black'
        }
      }]
    }
  }
});

document.getElementById("country--list").addEventListener("change", function (e) {
  let selected = this.options[this.selectedIndex].value

  updateData(myChart, selected)
})

var ctx_pie = document.getElementById('myPieChart');

var myPieChart = new Chart(ctx_pie, {
  type: 'pie',
  data: {
    labels: ['Aktive Fälle', 'Tode durch Corona', 'Geheilte Fälle'],
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
    animation: {
      duration: 7000,
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'black',
        fontSize: 18
      }
    }
  }
});

document.getElementById("country--list--pie").addEventListener("change", function (e) {
  let selected = this.options[this.selectedIndex].value

  updateData(myPieChart, selected, 'pie')
})


async function updateData(chart, selected, chart_type = 'bar') {
  let new_data = {}

  await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${selected}`)
    .then((resp) => resp.json())
    .then(function (data) {
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