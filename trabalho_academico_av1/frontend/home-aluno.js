document.body.onloadstart = testNavigation()

function testNavigation() {
    if(localStorage.getItem("role") != "aluno")
        window.location.assign('/')
    else
        loadStudentData()
}

function loadStudentData() {
    document.getElementById('container').innerHTML += ` 
        <span><strong>${localStorage.getItem("role")}</strong> - ${localStorage.getItem("name")}</span>
        <p>${localStorage.getItem("id")}</p>
    `

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
                        <td colspan="3">${res.trabalhoAV3}</td>
                    </tr>
                    <tr>
                        <th>Situação</th>
                        <td colspan="3">${res.status}</td>
                    </tr>
                </tbody>
            </table>
        `
}

function onError(e) {
    document.getElementById('container').innerHTML += `
    <p>Dados do aluno não encontrados, tente acessar o sistema mais tarde ou entre em contato com o suporte</p>
    <p>Erro: ${e.error}</p>
`
}