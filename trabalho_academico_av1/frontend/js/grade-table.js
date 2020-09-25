const CALC = require("./calculations");

module.exports.gradeTable = function (res) {
  return `
    <table style="border: 1px solid black;">
        <thead>
            <th></th>
            <th>AV1</th>
            <th>AV2</th>
            <th>AV3</th>
        </thead>
        <tbody>
            <tr>
                <th>Trabalhos</th>
                <td>${res.trabalhoAV1}</td>
                <td>${res.trabalhoAV2}</td>
                <td>${res.trabalhoAV3}</rd>
            </tr>
            <tr>
                <th>APS</th>
                <td>${res.APSAV1}</td>
                <td colspan="2">${res.APSAV2}</td>
            </tr>
            <tr>
                <th>Total</th>
                <td colspan="3">${res.finalGrade}</td>
            </tr>
            <tr>
                <th>Situação</th>
                <td colspan="3">${res.status}</td>
            </tr>
        </tbody>
    </table>
    `;
};

module.exports.inspectedGradeTable = function (data) {
  let trabalhoAV1 = data
    .map((d) => {
      return { name: d.name, grade: d.trabalhoAV1 };
    })
    .sort((a, b) => {
      return b.grade - a.grade;
    });

  let trabalhoAV2 = data
    .map((d) => {
      return { name: d.name, grade: d.trabalhoAV2 };
    })
    .sort((a, b) => {
      return b.grade - a.grade;
    });

  let trabalhoAV3 = data
    .map((d) => {
      return { name: d.name, grade: d.trabalhoAV3 };
    })
    .sort((a, b) => {
      return b.grade - a.grade;
    });

  let APSAV1 = data
    .map((d) => {
      return { name: d.name, grade: d.APSAV1 };
    })
    .sort((a, b) => {
      return b.grade - a.grade;
    });

  let APSAV2 = data
    .map((d) => {
      return { name: d.name, grade: d.APSAV2 };
    })
    .sort((a, b) => {
      return b.grade - a.grade;
    });

  return `
    <table style="border: 1px solid black;">
        <thead>
            <th></th>
            <th>AV1</th>
            <th>AV2</th>
            <th>AV3</th>
        </thead>
        <tbody>
            <tr>
                <th>Maior Trabalho</th>
                <td>${trabalhoAV1[0].name} - ${trabalhoAV1[0].grade}</td>
                <td>${trabalhoAV2[0].name} - ${trabalhoAV2[0].grade}</td>
                <td>${trabalhoAV3[0].name} - ${trabalhoAV3[0].grade}</rd>
            </tr>
            <tr>
                <th>Menor Trabalho</th>
                <td>${trabalhoAV1[trabalhoAV1.length - 1].name} - ${
    trabalhoAV1[trabalhoAV1.length - 1].grade
  }</td>
                <td>${trabalhoAV2[trabalhoAV2.length - 1].name} - ${
    trabalhoAV2[trabalhoAV2.length - 1].grade
  }</td>
                <td>${trabalhoAV3[trabalhoAV3.length - 1].name} - ${
    trabalhoAV3[trabalhoAV3.length - 1].grade
  }</rd>
            </tr>
            <tr>
                <th>Média trabalhos</th>
                <td>${CALC.media(
                  data.map((a) => {
                    return parseFloat(a.trabalhoAV1);
                  })
                ).toFixed(2)}</td>
                <td>${CALC.media(
                  data.map((a) => {
                    return parseFloat(a.trabalhoAV2);
                  })
                ).toFixed(2)}</td>
                <td>${CALC.media(
                  data.map((a) => {
                    return parseFloat(a.trabalhoAV3);
                  })
                ).toFixed(2)}</rd>
            </tr>
            <tr>
                <th>Maior APS</th>
                <td>${APSAV1[0].name} - ${APSAV1[0].grade}</td>
                <td colspan="2">${APSAV2[0].name} - ${APSAV2[0].grade}</td>
            </tr>
            <tr>
                <th>Menor APS</th>
                <td>${APSAV1[APSAV1.length - 1].name} - ${
    APSAV1[APSAV1.length - 1].grade
  }</td>
                <td colspan="2">${APSAV2[APSAV2.length - 1].name} - ${
    APSAV2[APSAV2.length - 1].grade
  }</td>
            </tr>
            <tr>
                <th>Média APS</th>
                <td>${CALC.media(
                  data.map((a) => {
                    return parseFloat(a.APSAV1);
                  })
                ).toFixed(2)}</td>
                <td colspan="2">${CALC.media(
                  data.map((a) => {
                    return parseFloat(a.APSAV2);
                  })
                ).toFixed(2)}</td>
            </tr>
        </tbody>
    </table>
    `;
};
