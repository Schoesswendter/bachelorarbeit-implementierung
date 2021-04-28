var country = "Austria"

var select_countries = document.getElementsByClassName("country")

var corona_data = {}

await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
    .then((resp) => resp.json())
    .then(function(data) {
        corona_data = data
    })
    .catch(function(error) {
        console.log(error);
    });

// NOT ANIMATED
var ctx_bar_no = document.getElementById('coronaBarChart');

let cases = numberWithCommas(corona_data["cases"]);
let active = numberWithCommas(corona_data["active"]);
let deaths = numberWithCommas(corona_data["deaths"]);
let recovered = numberWithCommas(corona_data["recovered"]);

var coronaBarChart = new Chart(ctx_bar_no, {
    type: 'bar',
    data: {
        labels: [
            [cases, ' Fälle'],
            [active, ' Aktive Fälle'],
            [deaths, ' Todesfälle'],
            [recovered, ' Geheilte Fälle']
        ],
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
        scaleLabel: function(label) { return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
        legend: {
            display: false
        },
        hover: {
            animationDuration: 0
        },
        animation: {
            duration: 0
        },
        tooltips: {
            enabled: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // max: 4000000,
                    fontSize: 16,
                    fontColor: 'black',
                    callback: function(value, index, values) {
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

document.getElementById("noanimated--country--list").addEventListener("change", function(e) {
    let selected = this.options[this.selectedIndex].value

    updateData(coronaBarChart, selected)
})

var ctx_pie_no = document.getElementById('coronaPieChart');

var myPieChart_no = new Chart(ctx_pie_no, {
    type: 'pie',
    data: {
        labels: [
            [recovered + ' Geheilte Fälle'],
            [active + ' Aktive Fälle'],
            [deaths + ' Todesfälle']
        ],
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

document.getElementById("noanimated--country--list--pie").addEventListener("change", function(e) {
    let selected = this.options[this.selectedIndex].value

    updateData(myPieChart_no, selected, 'pie')
})

var corona_data_italy = {};
var corona_data_hungary = {};
var corona_data_germany = {};

await fetch(`https://coronavirus-19-api.herokuapp.com/countries/Germany`)
    .then((resp) => resp.json())
    .then(function(data) {
        corona_data_germany = data;
    })
    .catch(function(error) {
        console.log(error);
    });

await fetch(`https://coronavirus-19-api.herokuapp.com/countries/Hungary`)
    .then((resp) => resp.json())
    .then(function(data) {
        corona_data_hungary = data;
    })
    .catch(function(error) {
        console.log(error);
    });

await fetch(`https://coronavirus-19-api.herokuapp.com/countries/Italy`)
    .then((resp) => resp.json())
    .then(function(data) {
        corona_data_italy = data;
    })
    .catch(function(error) {
        console.log(error);
    });

var ctx_stacked_no = document.getElementById("coronaStackedChart");

var myStackedChart = new Chart(ctx_stacked_no, {
    type: "bar",
    data: {
        labels: [
            [
                numberWithCommas(corona_data["casesPerOneMillion"]) +
                " Fälle Österreich",
            ],
            [
                numberWithCommas(corona_data_germany["casesPerOneMillion"]) +
                " Fälle Deutschland",
            ],
            [
                numberWithCommas(corona_data_italy["casesPerOneMillion"]) +
                " Fälle Italien",
            ],
            [
                numberWithCommas(corona_data_hungary["casesPerOneMillion"]) +
                " Fälle Ungarn",
            ],
        ],
        datasets: [{
                type: "bar",
                label: "Fälle pro 1 Millionen",
                data: [
                    corona_data["casesPerOneMillion"],
                    corona_data_germany["casesPerOneMillion"],
                    corona_data_italy["casesPerOneMillion"],
                    corona_data_hungary["casesPerOneMillion"],
                ],
                backgroundColor: "rgba(54, 162, 235, 0.9)",
            },
            // {
            //   type: 'line',
            //   label: 'Tests pro 1 Millionen',
            //   data: [corona_data["testsPerOneMillion"], corona_data_germany["testsPerOneMillion"], corona_data_italy["testsPerOneMillion"], corona_data_hungary["testsPerOneMillion"]],
            //   borderColor: 'black',
            //   fill: false
            // }
        ],
    },
    options: {
        tooltips: {
            enabled: true,
        },
        animation: {
            duration: 0,
        },
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    fontSize: 16,
                    fontColor: "black",
                },
            }, ],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    // max: 4000000,
                    fontSize: 16,
                    fontColor: "black",
                    callback: function(value, index, values) {
                        return numberWithCommas(value);
                    },
                    // stepSize: 1000000
                },
            }, ],
        },
        legend: {
            display: true,
            labels: {
                fontColor: "black",
                fontSize: 18,
            },
        },
    },
});

async function updateData(chart, selected, chart_type = 'bar') {
    let new_data = {}

    await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${selected}`)
        .then((resp) => resp.json())
        .then(function(data) {
            new_data = data
        })
        .catch(function(error) {
            console.log(error);
        });

    if (chart_type == 'bar') {
        chart.data.datasets[0].data[0] = new_data["cases"]
        chart.data.datasets[0].data[1] = new_data["active"]
        chart.data.datasets[0].data[2] = new_data["deaths"]
        chart.data.datasets[0].data[3] = new_data["recovered"]

        chart.data.labels[0] = [cases, ' Fälle']
        chart.data.labels[1] = [active, ' Aktive Fälle']
        chart.data.labels[2] = [deaths, ' Todesfälle']
        chart.data.labels[3] = [recovered, ' Geheilte Fälle']
    } else {
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