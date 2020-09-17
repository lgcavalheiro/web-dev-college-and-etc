module.exports = function gradeTable(res) {
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