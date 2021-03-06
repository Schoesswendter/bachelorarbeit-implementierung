//register custome positioner
Chart.Tooltip.positioners.custom = function(elements, position) {
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
        y: position.y,
    };
};

var country = "Austria";

Chart.defaults.global.tooltips.enabled = false;

var select_countries = document.getElementsByClassName("country");

var corona_data = {};
var corona_data_italy = {};
var corona_data_hungary = {};
var corona_data_germany = {};

await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
    .then((resp) => resp.json())
    .then(function(data) {
        corona_data = data;
        console.log(data);
    })
    .catch(function(error) {
        console.log(error);
    });

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

var ctx = document.getElementById("myChart");

let cases = numberWithCommas(corona_data_italy["cases"]);
let active = numberWithCommas(corona_data_italy["active"]);
let deaths = numberWithCommas(corona_data_italy["deaths"]);
let recovered = numberWithCommas(corona_data_italy["recovered"]);

var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [
            [cases, " F??lle"],
            [active, " Aktive F??lle"],
            [deaths, " Todesf??lle"],
            [recovered, " Geheilte F??lle"],
        ],
        datasets: [{
            label: "Personen",
            data: [
                corona_data_italy["cases"],
                corona_data_italy["active"],
                corona_data_italy["deaths"],
                corona_data_italy["recovered"],
            ],
            backgroundColor: [
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(75, 192, 192, 0.9)",
            ],
        }, ],
    },
    options: {
        scaleLabel: function(label) {
            return "$" + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
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
            position: "custom",
        },
        hover: { mode: null },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 4500000,
                    fontSize: 18,
                    fontColor: "black",
                    callback: function(value, index, values) {
                        return numberWithCommas(value);
                    },
                    // stepSize: 1000000
                },
            }, ],
            xAxes: [{
                ticks: {
                    fontSize: 18,
                    fontColor: "black",
                },
            }, ],
        },
    },
});

document.getElementById('description').innerHTML = `In Italien sind derzeit ${cases} F??lle, davon ${active} aktiv, ${deaths} tod, ${active} geheilt.`

document
    .getElementById("country--list")
    .addEventListener("change", function(e) {
        let selected = this.options[this.selectedIndex].value;
        let german_selected = this.options[this.selectedIndex].innerHTML

        updateData(myChart, selected, 'bar', german_selected)
    });

var ctx_pie = document.getElementById("myPieChart");

var myPieChart = new Chart(ctx_pie, {
    type: "doughnut",
    data: {
        labels: [
            [recovered + " Geheilte F??lle"],
            [active + " Aktive F??lle"],
            [deaths + " Todesf??lle"],
        ],

        // labels: ['Geheilte F??lle', 'Aktive F??lle', 'Todesf??lle' ],
        datasets: [{
            label: "Personen",
            data: [
                corona_data["recovered"],
                corona_data["active"],
                corona_data["deaths"],
            ],
            backgroundColor: [
                "rgba(75, 192, 192, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(255, 99, 132, 0.9)",
            ],
        }, ],
    },
    options: {
        tooltips: {
            enabled: true,
        },
        animation: {
            duration: 7000,

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

myPieChart.reset();

document
    .getElementById("country--list--pie")
    .addEventListener("change", function(e) {
        let selected = this.options[this.selectedIndex].value;

        updateData(myPieChart, selected, "pie");
    });

// STACKED BAR CHART

var ctx_stacked = document.getElementById("myStackedChart");

console.log("DATA AUSTRIA: ", corona_data);
console.log("DATA GERMANY: ", corona_data_germany);
console.log("DATA ITALY: ", corona_data_italy);
console.log("DATA HUNGARY: ", corona_data_hungary);

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 1 * $(window).height()) {
        myPieChart.update();
        console.log("trigger reset");
    }
    if (scroll >= 2 * $(window).height()) {
        var myStackedChart = new Chart(ctx_stacked, {
            type: "bar",
            data: {
                labels: [
                    [
                        numberWithCommas(corona_data["casesPerOneMillion"]) +
                        " F??lle ??sterreich",
                    ],
                    [
                        numberWithCommas(corona_data_germany["casesPerOneMillion"]) +
                        " F??lle Deutschland",
                    ],
                    [
                        numberWithCommas(corona_data_italy["casesPerOneMillion"]) +
                        " F??lle Italien",
                    ],
                    [
                        numberWithCommas(corona_data_hungary["casesPerOneMillion"]) +
                        " F??lle Ungarn",
                    ],
                ],
                datasets: [{
                        type: "bar",
                        label: "F??lle pro 1 Millionen Einwohner",
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
                    duration: 7000,
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
    }
});

async function updateData(chart, selected, chart_type = "bar", german_selected = '??sterreich') {
    let new_data = {};

    await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${selected}`)
        .then((resp) => resp.json())
        .then(function(data) {
            new_data = data;
        })
        .catch(function(error) {
            console.log(error);
        });
    console.log(chart.data);
    cases = numberWithCommas(new_data["cases"]);
    active = numberWithCommas(new_data["active"]);
    deaths = numberWithCommas(new_data["deaths"]);
    recovered = numberWithCommas(new_data["recovered"]);

    if (chart_type == "bar") {
        chart.data.datasets[0].data[0] = new_data["cases"];
        chart.data.datasets[0].data[1] = new_data["active"];
        chart.data.datasets[0].data[2] = new_data["deaths"];
        chart.data.datasets[0].data[3] = new_data["recovered"];

        chart.data.labels[0] = [cases, " F??lle"];
        chart.data.labels[1] = [active, " Aktive F??lle"];
        chart.data.labels[2] = [deaths, " Todesf??lle"];
        chart.data.labels[3] = [recovered, " Geheilte F??lle"];

        document.getElementById('description').innerHTML = `In ${german_selected} sind derzeit ${cases} F??lle, davon ${active} aktiv, ${deaths} tod, ${active} geheilt.`
    } else {
        chart.data.datasets[0].data[0] = new_data["recovered"];
        chart.data.datasets[0].data[1] = new_data["active"];
        chart.data.datasets[0].data[2] = new_data["deaths"];

        chart.data.labels[0] = [recovered + " Geheilte F??lle"];
        chart.data.labels[1] = [active + " Aktive F??lle"];
        chart.data.labels[2] = [deaths + " Todesf??lle"];
    }

    chart.update();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}