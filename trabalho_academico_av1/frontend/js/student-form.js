const idField = `
    <label for="id">
        Id do aluno
        <input type="text" name="id" id="id" maxlength="10" required>
    </label>
`

function studentForm(data = {}, action, method, name) {
    let formAction = `${action}/${data.id ? data.id : ''}`
    return `
        <fieldset>
            <legend>${data.id ? data.name + ' - ' + data.id : 'Lançar nota'}</legend>
            <form action="${formAction}" method="${method}" name="${name}">
                ${name == 'gradeForm' ? idField : ''}
                <label for="trabalhoAV1">
                    AV1 - Trabalho
                    <input type="number" name="trabalhoAV1" id="trabalhoAV1" min="0" max="7" value="${data.trabalhoAV1}" required>
                </label>
                
                <label for="APSAV1">
                    AV1 - APS
                    <input type="number" name="APSAV1" id="APSAV1" min="0" max="3" value="${data.APSAV1}" required>
                </label>

                <label for="trabalhoAV2">
                    AV2 - Trabalho
                    <input type="number" name="trabalhoAV2" id="trabalhoAV2" min="0" max="8" value="${data.trabalhoAV2}" required>
                </label>

                <label for="APSAV2">
                    AV2 - APS
                    <input type="number" name="APSAV2" id="APSAV2" min="0" max="2" value="${data.APSAV2}" required>
                </label>

                <label for="trabalhoAV3">
                    AV3 - Trabalho
                    <input type="number" name="trabalhoAV3" id="trabalhoAV3" min="0" max="10" value="${data.trabalhoAV3}" required>
                </label>

                ${name == 'studentForm'
            ? `<input type="hidden" name="id" value="${data.id}"><input type="hidden" name="status" value="${data.status}">`
            : ''
        }
                
                <input type="submit" value="Atualizar">
            </form>
        </fieldset>
    `
}

function createUserForm() {
    return `
        <fieldset>
            <legend>Cadastrar novo aluno</legend>
            <form action="/users" method="PUT" name="createUser">
                <label for="id">
                    Id do aluno:
                    <input type="text" name="id" id="id" required>
                </label>

                <label for="name">
                    Nome do aluno:
                    <input type="text" name="name" name="id" required>
                </label>

                <input type="submit" value="Cadastrar aluno">
            </form>
        </fieldset>
    `
}

module.exports = { studentForm, createUserForm }