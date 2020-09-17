const gradeTable = require('./grade-table');
const studentForm = require('./student-form');
const coreUtils = require('./core-utils');

document.body.onloadstart = coreUtils.testNavigation('professor', loadAllGrades);
let allData = undefined;

function loadAllGrades() {
    fetch('/grades')
        .then(r => r.json())
        .then(res => {
            if (res.error) throw Error(res.error)
            else onSuccess(res)
        })
        .catch(e => alert(e))
}

function onSuccess(data) {
    allData = data;
    document.getElementById('container').innerHTML = '';
    data.forEach(d => {
        document.getElementById('container').innerHTML += `
        <div id="${d.id}">
            <h3>${d.id}</h3>
            <button id="modal-btn" onclick="showModal(${d.id}, 'update')">Editar</button>
            <button id="modal-btn" onclick="showModal('create')">Lançar nota</button>
            ${gradeTable(d)}
        </div>
        `
    })
}

function loadStudentGrade(id) {
    fetch(`/grades/${id}`)
        .then(r => r.json())
        .then(res => {
            if (res.error) throw Error(res.error)
            else onStudentGradeSuccess(res)
        })
        .catch(e => alert(e))
}

function onStudentGradeSuccess(d) {
    document.getElementById(d.id).innerHTML = `
        <h3>${d.id}</h3>
        <button id="modal-btn" onclick="showModal(${d.id}, 'update')">Editar</button>
        <button id="modal-btn" onclick="showModal('create')">Lançar nota</button>
        ${gradeTable(d)}
    `
}

window.showModal = function (id = "", mode) {
    if (mode == 'update') injectStudentForm(id)
    else injectGradeForm()
}

window.hideModal = function () {
    document.getElementById('modal').style.display = 'none';
    document.querySelector('div[id=modal-content] div').innerHTML = '';
}

function injectStudentForm(id) {
    let data = allData.find(d => { return d.id === id.toString() });
    document.getElementById('modal').style.display = 'block';
    document.querySelector('div[id=modal-content] div').innerHTML += `${studentForm(data, '/grades', 'PUT', 'studentForm')}`;
    document.studentForm.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const options = {
            method: "put",
            body: new URLSearchParams(data)
        }

        fetch(document.studentForm.action, options)
            .then(r => r.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                else {
                    alert("Dados atualizados com sucesso.");
                    loadStudentGrade(id);
                    hideModal();
                }
            })
            .catch(e => alert(e))
    }
}

function injectGradeForm() {
    document.getElementById('modal').style.display = 'block';
    document.querySelector('div[id=modal-content] div').innerHTML += `${studentForm({}, '/grades', 'POST', 'gradeForm')}`;
    document.gradeForm.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const options = {
            method: "post",
            body: new URLSearchParams(data)
        }

        fetch(document.gradeForm.action, options)
            .then(r => r.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                else {
                    alert("Dados cadastrados com sucesso.");
                    loadAllGrades();
                    hideModal();
                }
            })
            .catch(e => alert(e))
    }
}