const jsonServer = require('json-server')
const path = require('path')
const auth = require('./auth')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const root = path.resolve('./public/')
const middlewares = jsonServer.defaults([root])

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
    if(req.body.password && req.body.id){
        let isAuth = auth.authenticate(req.body.id, req.body.password);
        if(isAuth){
            res.status(200).jsonp({ role: isAuth.role, name: isAuth.name, id: isAuth.id })
        } else
            res.status(401).jsonp({ error: "Id e/ou senha não conferem, verifique suas credenciais e tente novamente."}) 
    } else {
        res.status(401).jsonp({ error: "Credenciais inválidas."}) 
    }
})

server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001')
})