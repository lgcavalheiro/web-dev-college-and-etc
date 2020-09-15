let allData = undefined;

function testNavigation() {
    if (localStorage.getItem("role") != "professor" || !localStorage.getItem("id").includes("9999"))
        window.location.assign('/')
    else
        loadAllGrades()
}

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
    data.forEach(d => {
        document.getElementById('container').innerHTML += `
        <div id="${d.id}">
            <h3>${d.id}</h3>
            <button id="modal-btn" onclick="showModal(${d.id})">Editar</button>
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
                        <td>${d.trabalhoAV1}</td>
                        <td>${d.trabalhoAV2}</td>
                        <td>${d.trabalhoAV3}</rd>
                    </tr>
                    <tr>
                        <th>APS</th>
                        <td>${d.APSAV1}</td>
                        <td colspan="2">${d.APSAV2}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td colspan="3">${d.trabalhoAV3}</td>
                    </tr>
                    <tr>
                        <th>Situação</th>
                        <td colspan="3">${d.status}</td>
                    </tr>
                </tbody>
            </table>
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
    <button id="modal-btn" onclick="showModal(${d.id})">Editar</button>
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
                <td>${d.trabalhoAV1}</td>
                <td>${d.trabalhoAV2}</td>
                <td>${d.trabalhoAV3}</rd>
            </tr>
            <tr>
                <th>APS</th>
                <td>${d.APSAV1}</td>
                <td colspan="2">${d.APSAV2}</td>
            </tr>
            <tr>
                <th>Total</th>
                <td colspan="3">${d.trabalhoAV3}</td>
            </tr>
            <tr>
                <th>Situação</th>
                <td colspan="3">${d.status}</td>
            </tr>
        </tbody>
    </table>
    `
}

function showModal(id) {
    let data = allData.find(d => { return d.id === id.toString() });
    document.getElementById('modal').style.display = 'block';
    document.querySelector('div[id=modal-content] div').innerHTML += `
        <fieldset>
            <legend>${id}</legend>
            <form action="/grades/${data.id}" method="PUT" name="studentForm">
                <label for="trabalhoAV1">
                    AV1 - Trabalho
                    <input type="number" name="trabalhoAV1" id="trabalhoAV1" min="0" max="7" value="${data.trabalhoAV1}">
                </label>
                
                <label for="APSAV1">
                    AV1 - APS
                    <input type="number" name="APSAV1" id="APSAV1" min="0" max="3" value="${data.APSAV1}">
                </label>

                <label for="trabalhoAV2">
                    AV2 - Trabalho
                    <input type="number" name="trabalhoAV2" id="trabalhoAV2" min="0" max="8" value="${data.trabalhoAV2}">
                </label>

                <label for="APSAV2">
                    AV2 - APS
                    <input type="number" name="APSAV2" id="APSAV2" min="0" max="2" value="${data.APSAV2}">
                </label>

                <label for="trabalhoAV3">
                    AV3 - Trabalho
                    <input type="number" name="trabalhoAV3" id="trabalhoAV3" min="0" max="10" value="${data.trabalhoAV3}">
                </label>

                <input type="hidden" name="id" value="${data.id}">
                <input type="hidden" name="status" value="${data.status}">

                <input type="submit" value="Atualizar">
            </form>
        </fieldset>
    `;

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
                if(res.error) throw Error(res.error)
                else {
                    alert("Dados atualizados com sucesso.");
                    loadStudentGrade(id);
                    hideModal();
                }
            })
            .catch(e => alert(e))
    }
}

function hideModal() {
    document.getElementById('modal').style.display = 'none';
    document.querySelector('div[id=modal-content] div').innerHTML = '';
}

document.body.onloadstart = testNavigation();

