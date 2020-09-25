module.exports = {
  media(data) {
    return (
      data.reduce((c, n) => {
        return c + n;
      }) / data.length
    );
  },

  desvio(data) {
    let m = this.media(data);
    return parseFloat(
      Math.sqrt(
        data
          .map((d) => {
            return Math.pow(d - m, 2);
          })
          .reduce((c, n) => {
            return c + n;
          }) / data.length
      ).toFixed(2)
    );
  },

  boxplotData(data) {
    let partial = [];
    partial.push(
      data.map((d) => {
        return parseFloat(d.trabalhoAV1);
      })
    );
    partial.push(
      data.map((d) => {
        return parseFloat(d.APSAV1);
      })
    );
    partial.push(
      data.map((d) => {
        return parseFloat(d.trabalhoAV2);
      })
    );
    partial.push(
      data.map((d) => {
        return parseFloat(d.APSAV2);
      })
    );
    partial.push(
      data.map((d) => {
        return parseFloat(d.trabalhoAV3);
      })
    );

    return [
      {
        label: "Quartis",
        backgroundColor: "#4589ff66",
        borderColor: "#7c9885",
        borderWidth: 1,
        outlierColor: "#e94f37",
        padding: 10,
        itemRadius: 0,
        data: partial,
      },
    ];
  },

  histogramData(data) {
    let AV1 = data.map((d) => {
      return {
        name: d.name,
        grade: parseFloat(d.trabalhoAV1) + parseFloat(d.APSAV1),
      };
    });
    let AV2 = data.map((d) => {
      return {
        name: d.name,
        grade: parseFloat(d.trabalhoAV2) + parseFloat(d.APSAV2),
      };
    });
    let AV3 = data.map((d) => {
      return { name: d.name, grade: parseFloat(d.trabalhoAV3) };
    });

    let countAV1 = [0, 0, 0, 0];
    let countAV2 = [0, 0, 0, 0];
    let countAV3 = [0, 0, 0, 0];

    AV1.forEach((e) => {
      if (0 <= e.grade && e.grade <= 2) countAV1[0]++;
      else if (3 <= e.grade && e.grade <= 5) countAV1[1]++;
      else if (6 <= e.grade && e.grade <= 8) countAV1[2]++;
      else if (9 <= e.grade && e.grade <= 10) countAV1[3]++;
    });

    AV2.forEach((e) => {
      if (0 <= e.grade && e.grade <= 2) countAV2[0]++;
      else if (3 <= e.grade && e.grade <= 5) countAV2[1]++;
      else if (6 <= e.grade && e.grade <= 8) countAV2[2]++;
      else if (9 <= e.grade && e.grade <= 10) countAV2[3]++;
    });

    AV3.forEach((e) => {
      if (0 <= e.grade && e.grade <= 2) countAV3[0]++;
      else if (3 <= e.grade && e.grade <= 5) countAV3[1]++;
      else if (6 <= e.grade && e.grade <= 8) countAV3[2]++;
      else if (9 <= e.grade && e.grade <= 10) countAV3[3]++;
    });

    return [
      {
        label: "AV1",
        data: countAV1,
        backgroundColor: "#7c9885",
      },
      {
        label: "AV2",
        data: countAV2,
        backgroundColor: "#8d6346",
      },
      {
        label: "AV3",
        data: countAV3,
        backgroundColor: "#e94f37",
      },
    ];
  },
};
