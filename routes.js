const { createRest, flattenRoutes } = require('createrest')
const { UserController, UserEmailsController, UserKeysController } = require('./controllers/user')
const UsersController = require('./controllers/users')


function routesHandler(ctx) {
  const flat = flattenRoutes(routes) // eslint-disable-line no-use-before-define
  const map = []

  Object.keys(flat).forEach((path) => {
    Object.keys(flat[path]).forEach((method) => {
      map.push(`${method}: ${path}`)
    })
  })

  ctx.body = {
    routes: map,
  }
}

function rootHandler(ctx) {
  ctx.body = {
    status: 'ok',
    koa: 'ok',
    db: 'ok',
  }
}


const routes = createRest((root) => {
  root.get('/', rootHandler)
  root.get('routes', routesHandler)

  root.crud('user', UserController, {}, (user) => {
    user.patch('/', UserController.patch)
    user.crud('emails', UserEmailsController)
    user.resources('keys', UserKeysController)
  })

  root.resources('users', UsersController, { memberId: 'userLogin' })
})

module.exports = routes
