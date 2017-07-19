const debug = require('debug')('example')
const Koa = require('koa')
const bodyParser = require('koa-body')
const { createKoaRouter } = require('createrest-koa')
const routes = require('./routes')


const app = new Koa()
const router = createKoaRouter(routes)

app.use(bodyParser())
app.use(router.routes(), router.allowedMethods())

app.listen(3000, () => {
  debug('Listening port 3000...')
})
