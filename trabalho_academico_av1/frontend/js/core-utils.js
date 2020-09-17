module.exports = {
    testNavigation(role, callBack) {
        if (localStorage.getItem("role") != role) window.location.assign('/')
        else callBack()
    }
}