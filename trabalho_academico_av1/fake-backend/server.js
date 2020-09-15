const jsonServer = require('json-server')
const path = require('path')
const auth = require('./auth')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const root = path.resolve('./frontend/')
const middlewares = jsonServer.defaults([root])

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (["POST", "PUT"].includes(req.method.toUpperCase())) {
        req.body.updateTimestamp = new Date().toLocaleString()
        if (req.path.indexOf('/grades') > -1) {
            let av1 = Number.parseFloat(req.body.trabalhoAV1) + Number.parseFloat(req.body.APSAV1);
            let av2 = Number.parseFloat(req.body.trabalhoAV2) + Number.parseFloat(req.body.APSAV2);
            let av3 = Number.parseFloat(req.body.trabalhoAV3);

            let partialGrade = ((av1 + av2) / 2).toFixed(1);
            if(partialGrade >= 7.0) {
                req.body.finalGrade = partialGrade;
                req.body.status = 'aprovado';
            } else {
                let maxAv = av1 > av2 ? av1 : av2;
                partialGrade = ((maxAv + av3) / 2).toFixed(1);
                if(partialGrade >= 7.0) {
                    req.body.finalGrade = partialGrade;
                    req.body.status = 'aprovado';
                } else {
                    req.body.finalGrade = partialGrade;
                    req.body.status = 'reprovado';
                }
            }
        }
    }
    next()
})

server.post('/login', (req, res) => {
    if (req.body.password && req.body.id) {
        let isAuth = auth.authenticate(req.body.id, req.body.password);
        if (isAuth) res.status(200).jsonp({ role: isAuth.role, name: isAuth.name, id: isAuth.id })
        else res.status(401).jsonp(
            { error: "Id e/ou senha não conferem, verifique suas credenciais e tente novamente." }
        )
    } else
        res.status(401).jsonp({ error: "Credenciais inválidas ou incompletas." })
})

server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001')
})