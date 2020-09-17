const gradeTable = require('./grade-table');
const coreUtils = require('./core-utils');

document.body.onloadstart = coreUtils.testNavigation('aluno', loadStudentData);

function loadStudentData() {
    fetch(`/grades/${localStorage.getItem("id")}`)
        .then(r => r.json())
        .then(res => {
            if (res.error) throw Error(res.error)
            else onSuccess(res)
        })
        .catch(e => onError(e))
}

function onSuccess(res) {
    document.getElementById('container').innerHTML += `
            <span>
                <strong>${localStorage.getItem("role")}</strong> 
                - ${localStorage.getItem("name")}
            </span>
            <p>${localStorage.getItem("id")}</p>
            ${gradeTable(res)}
        `
}

function onError(e) {
    document.getElementById('container').innerHTML += `
    <p>Dados do aluno não encontrados, tente acessar o sistema mais tarde ou entre em contato com o suporte</p>
    <p>Erro: ${e.error}</p>
`
}