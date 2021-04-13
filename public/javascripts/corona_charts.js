//register custome positioner
Chart.Tooltip.positioners.custom = function (elements, position) {
  if (!elements.length) {
    return false;
  }
  var offset = 0;
  //adjust the offset left or right depending on the event position
  if (elements[0]._chart.width / 2 > position.x) {
    offset = 20;
  } else {
    offset = -20;
  }
  return {
    x: position.x + offset,
    y: position.y
  }
}

var country = "Austria"

Chart.defaults.global.tooltips.enabled = false;

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

let cases = numberWithCommas(corona_data["cases"]);
let active = numberWithCommas(corona_data["active"]);
let deaths = numberWithCommas(corona_data["deaths"]);
let recovered = numberWithCommas(corona_data["recovered"]);

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [[cases , ' Fälle'], [active , ' Aktive Fälle'], [deaths , ' Todesfälle'], [recovered , ' Geheilte Fälle']],
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
    scaleLabel: function (label) { return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
    animation: {
      duration: 7000,
      // onProgress: function () {
      //   const chartInstance = this.chart,
      //     ctx = chartInstance.ctx;

      //   ctx.font = Chart.helpers.fontString(
      //     18,
      //     Chart.defaults.global.defaultFontStyle,
      //     Chart.defaults.global.defaultFontFamily
      //   );
      //   ctx.textAlign = "center";
      //   ctx.textBaseline = "bottom";

      //   this.data.datasets.forEach(function (dataset, i) {
      //     const meta = chartInstance.controller.getDatasetMeta(i);
      //     meta.data.forEach(function (bar, index) {
      //       const data = dataset.data[index];
      //       ctx.fillStyle = "#000";
      //       ctx.fillText(data, bar._model.x, bar._model.y);
      //     });
      //   });
      // }
    },
    tooltips: {
      enabled: true,
      position: 'custom'
    },
    hover: { mode: null },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          // max: 4000000,
          fontSize: 16,
          fontColor: 'black',
          callback: function (value, index, values) {
            return numberWithCommas(value);
          }
          // stepSize: 1000000
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
    labels: [[recovered + ' Geheilte Fälle'], [active + ' Aktive Fälle'], [deaths + ' Todesfälle'] ],

    // labels: ['Geheilte Fälle', 'Aktive Fälle', 'Todesfälle' ],
    datasets: [{
      label: 'Personen',
      data: [corona_data["recovered"], corona_data["active"], corona_data["deaths"]],
      backgroundColor: [
        'rgba(75, 192, 192, 0.9)',
        'rgba(255, 206, 86, 0.9)',
        'rgba(255, 99, 132, 0.9)'
      ]
    }]
  },
  options: {
    tooltips: {
      enabled: true
    },
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
  console.log(chart.data)
  cases = numberWithCommas(new_data["cases"]);
  active = numberWithCommas(new_data["active"]);
  deaths = numberWithCommas(new_data["deaths"]);
  recovered = numberWithCommas(new_data["recovered"]);

  if (chart_type == 'bar') {
    chart.data.datasets[0].data[0] = new_data["cases"]
    chart.data.datasets[0].data[1] = new_data["active"]
    chart.data.datasets[0].data[2] = new_data["deaths"]
    chart.data.datasets[0].data[3] = new_data["recovered"]
    
    chart.data.labels[0] = [cases , ' Fälle']
    chart.data.labels[1] = [active , ' Aktive Fälle']
    chart.data.labels[2] = [deaths , ' Todesfälle']
    chart.data.labels[3] = [recovered , ' Geheilte Fälle']
  }
  else {
    chart.data.datasets[0].data[0] = new_data["recovered"]
    chart.data.datasets[0].data[1] = new_data["active"]
    chart.data.datasets[0].data[2] = new_data["deaths"]

    chart.data.labels[0] = [recovered + ' Geheilte Fälle']
    chart.data.labels[1] = [active + ' Aktive Fälle']
    chart.data.labels[2] = [deaths + ' Todesfälle']
  }

  chart.update();
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}