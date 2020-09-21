const gradeTable = require('./grade-table');
const SF = require('./student-form');
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
    document.getElementById('grades').innerHTML = '';
    data.forEach(d => {
        document.getElementById('grades').innerHTML += `
        <div id="${d.id}">
            ${injectButtons(d.id, d.name)}
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
    let newData = allData.find(data => data.id === d.id);
    allData[allData.indexOf(newData)] = d;
    document.getElementById(d.id).innerHTML = `
        ${injectButtons(d.id, d.name)}
        ${gradeTable(d)}
    `
}

window.showModal = function (id = "", mode) {
    const modalLiterals = {
        update: injectStudentForm,
        createGrade: injectGradeForm,
        createUser: injectCreateUserForm,
        deleteGrade: deleteGrade
    }
    modalLiterals[mode](id)
}

window.hideModal = function () {
    document.getElementById('modal').hidden = true;
    document.querySelector('div[id=modal-content] div').innerHTML = '';
}

function injectStudentForm(id) {
    let data = allData.find(d => {
        return d.id === id.toString()
    });
    document.getElementById('modal').hidden = false;
    document.querySelector('div[id=modal-content] div').innerHTML += `${SF.studentForm(data, '/grades', 'PUT', 'studentForm')}`;
    document.studentForm.onsubmit = async(e) => {
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
    document.getElementById('modal').hidden = false;
    document.querySelector('div[id=modal-content] div').innerHTML += `${SF.studentForm({}, '/grades', 'POST', 'gradeForm')}`;
    document.gradeForm.onsubmit = async(e) => {
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

function injectCreateUserForm() {
    document.getElementById('modal').hidden = false;
    document.querySelector('div[id=modal-content] div').innerHTML += `${SF.createUserForm()}`;
    document.createUser.onsubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        data.set('role', 'aluno');
        data.set('senha', data.get('name')[0] + '123');

        const options = {
            method: "post",
            body: new URLSearchParams(data)
        }

        Promise.all([
            fetch(document.createUser.action, options),
            updateGradeOnUserCreation({
                id: data.get('id'),
                name: data.get('name')
            })
        ]).then(res => {
            if (res.error) throw Error(res.error)
            else {
                alert("Aluno cadastrado com sucesso.");
                loadAllGrades();
                hideModal();
            }
        }).catch(e => alert(e))
    }
}

function updateGradeOnUserCreation(data) {
    data.trabalhoAV1 = "0";
    data.trabalhoAV2 = "0";
    data.trabalhoAV3 = "0";
    data.APSAV1 = "0";
    data.APSAV2 = "0";

    const options = {
        method: "post",
        body: new URLSearchParams(data)
    }

    fetch('/grades', options);
}

function injectButtons(id, name) {
    return `
        <h3>${name} - ${id}</h3>
        <button id="modal-btn" onclick="showModal(${id}, 'update')">Editar</button>
        <button id="modal-btn" onclick="showModal(null, 'createUser')">Cadastrar aluno</button>
        <button id="modal-btn" onclick="showModal(${id}, 'deleteGrade')">Deletar nota</button>
    `
}

function deleteGrade(id) {
    if (window.confirm(`Deletar notas para o aluno ${id} ?`)) {
        const options = {
            method: 'delete'
        };
        Promise.all([
            fetch(`/grades/${id}`, options),
            fetch(`/users/${id}`, options)
        ]).then(res => {
            if (res.error) throw Error(res.error)
            else {
                alert("Notas deletadas com sucesso.");
                loadAllGrades();
            }
        }).catch(e => alert(e))
    }
}

window.switchTab = function (tab) {
    let hide = tab == 'grades' ? 'dashboard' : 'grades';
    document.getElementById(hide).hidden = true;
    document.getElementById(tab).hidden = false;
}
