const CALC = require("./calculations");

module.exports = {
  activateCharts(data) {
    window.chartData = data;
    standardDeviation();
  },
};

window.sortData = function () {
  window.chartData = window.chartData.sort((a, b) => {
    return a.trabalhoAV1 - b.trabalhoAV1;
  });
  standardDeviation();
};

function standardDeviation() {
  let ctx = document.getElementById("deviation").getContext("2d");
  let deviationChart = new Chart(ctx, {
    type: "scatter",
    data: {
      labels: window.chartData.map((d) => {
        return d.name;
      }),
      datasets: [
        {
          label: "Desvio padrão",
          data: [
            {
              x: 0,
              y: CALC.variancia(
                window.chartData.map((d) => {
                  return parseInt(d.trabalhoAV1);
                })
              ),
            },
            {
              x: 0.5,
              y: CALC.variancia(
                window.chartData.map((d) => {
                  return parseInt(d.APSAV1);
                })
              ),
            },
            {
              x: 1,
              y: CALC.variancia(
                window.chartData.map((d) => {
                  return parseInt(d.trabalhoAV2);
                })
              ),
            },
            {
              x: 1.5,
              y: CALC.variancia(
                window.chartData.map((d) => {
                  return parseInt(d.APSAV2);
                })
              ),
            },
            {
              x: 2,
              y: CALC.variancia(
                window.chartData.map((d) => {
                  return parseInt(d.trabalhoAV3);
                })
              ),
            },
          ],
          borderColor: "#4589ff",
          type: "line",
        },
        {
          label: "Trabalho AV1",
          backgroundColor: "#7c9885",
          borderColor: " #7c9885",
          data: window.chartData.map((d, i) => {
            return { x: (i / window.chartData.length) * 2, y: d.trabalhoAV1 };
          }),
          pointStyle: "triangle",
          pointRadius: 8
        },
        {
          label: "APS AV1",
          backgroundColor: "#7c9885",
          borderColor: "#7c9885",
          data: window.chartData.map((d, i) => {
            return { x: (i / window.chartData.length) * 2, y: d.APSAV1 };
          }),
          pointStyle: "triangle",
          pointRadius: 8
        },
        {
          label: "Trabalho AV2",
          backgroundColor: "#8d6346",
          borderColor: "#8d6346",
          data: window.chartData.map((d, i) => {
            return { x: (i / window.chartData.length) * 2, y: d.trabalhoAV2 };
          }),
          pointStyle: "triangle",
          pointRadius: 8
        },
        {
          label: "APS AV2",
          backgroundColor: "#8d6346",
          borderColor: "#8d6346",
          data: window.chartData.map((d, i) => {
            return { x: (i / window.chartData.length) * 2, y: d.APSAV2 };
          }),
          pointStyle: "triangle",
          pointRadius: 8
        },
        {
          label: "Trabalho AV3",
          backgroundColor: "#e94f37",
          borderColor: "#e94f37",
          data: window.chartData.map((d, i) => {
            return { x: (i / window.chartData.length) * 2, y: d.trabalhoAV3 };
          }),
          pointStyle: "triangle",
          pointRadius: 8
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Notas + Desvio Padrão",
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let indexLabel = data.labels[tooltipItem.index] || "";
            let datasetLabel =
              data.datasets[tooltipItem.datasetIndex].label || "";
            if (indexLabel != "" && datasetLabel != "Desvio padrão")
              return `${indexLabel} - ${datasetLabel} : ${tooltipItem.yLabel}`;
            else {
              let deviationType = "";
              switch (tooltipItem.xLabel) {
                case 0:
                  deviationType = "Trabalho AV1";
                  break;
                case 0.5:
                  deviationType = "APS AV1";
                  break;
                case 1:
                  deviationType = "Trabalho AV2";
                  break;
                case 1.5:
                  deviationType = "APS AV2";
                  break;
                case 2:
                  deviationType = "Trabalho AV3";
                  break;
              }
              return `${datasetLabel} - ${deviationType} : ${tooltipItem.yLabel}`;
            }
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
