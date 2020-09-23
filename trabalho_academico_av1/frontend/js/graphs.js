module.exports = {
  activateCharts(data) {
    window.chartData = data.sort((a, b) => {
      return b.trabalhoAV1 - a.trabalhoAV1;
    });
    generalGrades();
  },
};

window.sortData = function () {
  window.chartData = window.chartData.sort((a, b) => {
    return a.trabalhoAV1 - b.trabalhoAV1;
  });
  console.log(window.chartData);
  generalGrades();
};

function generalGrades() {
  var ctx = document.getElementById("general").getContext("2d");
  var generalChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: window.chartData.map((d) => {
        return d.name;
      }),
      datasets: [
        {
          label: "Nota Trabalho AV1",
          data: window.chartData.map((d) => {
            return d.trabalhoAV1;
          }),
          backgroundColor: "#caf270",
        },
        {
          label: "Nota APS AV1",
          data: window.chartData.map((d) => {
            return d.APSAV1;
          }),
          backgroundColor: "#c062ff",
        },
        {
          label: "Nota Trabalho AV2",
          data: window.chartData.map((d) => {
            return d.trabalhoAV2;
          }),
          backgroundColor: "#caf270",
        },
        {
          label: "Nota APS AV2",
          data: window.chartData.map((d) => {
            return d.APSAV2;
          }),
          backgroundColor: "#c062ff",
        },
        {
          label: "Nota Trabalho AV3",
          data: window.chartData.map((d) => {
            return d.trabalhoAV3;
          }),
          backgroundColor: "#caf270",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Notas'
      },
      maintainAspectRatio: false,
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
