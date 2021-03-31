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

// NOT ANIMATED
var ctx_bar_no = document.getElementById('coronaBarChart');

var coronaBarChart = new Chart(ctx_bar_no, {
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
        hover: {
            animationDuration: 0
        },
        animation: {
            duration: 0,
            onComplete: function () {
                const chartInstance = this.chart,
                    ctx = chartInstance.ctx;

                ctx.font = Chart.helpers.fontString(
                    18,
                    Chart.defaults.global.defaultFontStyle,
                    Chart.defaults.global.defaultFontFamily
                );
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";

                this.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        const data = dataset.data[index];
                        ctx.fillStyle = "#000";
                        ctx.fillText(data, bar._model.x, bar._model.y - 2);
                    });
                });
            }
        },
        tooltips: {
            enabled: false
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

document.getElementById("noanimated--country--list").addEventListener("change", function (e) {
    let selected = this.options[this.selectedIndex].value

    updateData(coronaBarChart, selected)
})

var ctx_pie_no = document.getElementById('coronaPieChart');

var myPieChart_no = new Chart(ctx_pie_no, {
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
            duration: 0,
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

document.getElementById("noanimated--country--list--pie").addEventListener("change", function (e) {
    let selected = this.options[this.selectedIndex].value

    updateData(myPieChart_no, selected, 'pie')
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