const { gradeTable } = require("./grade-table");
const coreUtils = require("./core-utils");

document.body.onloadstart = coreUtils.testNavigation("aluno", loadStudentData);

document.getElementById(
  "user-info"
).innerHTML = `Aluno ${localStorage.getItem(
  "name"
)} - ${localStorage.getItem("id")}`;

function loadStudentData() {
  fetch(`/grades/${localStorage.getItem("id")}`)
    .then((r) => r.json())
    .then((res) => {
      if (res.error) throw Error(res.error);
      else onSuccess(res);
    })
    .catch((e) => onError(e));
}

function onSuccess(res) {
  document.getElementById("container").innerHTML += `
            <div id="header-aluno">
                <span>Aluno: ${localStorage.getItem("name")}</span>
                <span>Matrícula: ${localStorage.getItem("id")}</span>
            </div>
            ${gradeTable(res)}
        `;
}

function onError(e) {
  document.getElementById("container").innerHTML += `
    <p>Dados do aluno não encontrados, tente acessar o sistema mais tarde ou entre em contato com o suporte</p>
    <p>Erro: ${e.error}</p>
`;
}
