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
        if(auth.authenticate(req.body.id, req.body.password))
            res.redirect('/home.html');
        else 
            res.redirect('/login-error.html');
    } else {
        res.redirect('/login-error.html');
    }
})

server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001')
})