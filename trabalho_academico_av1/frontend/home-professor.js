let container = document.getElementById('container');
let data = [
    {
        "id": 1,
        "name": "aaa"
    },
    {
        "id": 2,
        "name": "bbb"
    },
    {
        "id": 3,
        "name": "ccc"
    }
]

function testNavigation() {
    if(localStorage.getItem("role") != "professor" || !localStorage.getItem("id").includes("9999"))
        window.location.assign('/')
    else 
        loadCrap(data)
}

function loadCrap(data){
    data.forEach(d => {
        container.innerHTML += `
            <div id="${d.id}">
                <span>${d.id}</span>
                <span><b>${d.name}</b></span>
            </div>
        `
    })
}

document.body.onloadstart = testNavigation();

