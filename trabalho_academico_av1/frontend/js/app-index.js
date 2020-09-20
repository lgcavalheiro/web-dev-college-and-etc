document.loginForm.onsubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const options = {
        method: document.loginForm.method,
        body: new URLSearchParams(data)
    }

    fetch(document.loginForm.action, options)
        .then(r => r.json())
        .then(res => {
            if (res.error) throw Error(res.error)
            if (res.role === 'professor') window.location.assign('/home-professor.html')
            else window.location.assign('/home-aluno.html')
            localStorage.setItem("role", res.role);
            localStorage.setItem("name", res.name);
            localStorage.setItem("id", res.id);
        })
        .catch(e => alert(e))
}
