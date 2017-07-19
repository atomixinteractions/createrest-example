const { users, userEmails, userKeys } = require('../db')

let currentUser = users[0]


exports.UserController = {
  read(ctx) {
    ctx.body = currentUser
  },
  patch(ctx) {
    currentUser = Object.assign({}, currentUser, ctx.request.body)
    ctx.body = currentUser
  },
  update(ctx) {
    currentUser = ctx.request.body
    ctx.body = currentUser
  },
}


exports.UserEmailsController = {
  // List of all
  read(ctx) {
    ctx.body = userEmails
  },

  // Add emails
  create(ctx) {
    ctx.body = 'Not implemented yet'
  },

  // Delete emails
  destroy(ctx) {
    ctx.body = 'Not implemented yet'
  },
}


exports.UserKeysController = {
  index(ctx) {
    ctx.body = userKeys.map(({ id, key }) => ({ id, key }))
  },

  read(ctx) {
    const found = userKeys.filter(key => key.id === Number(ctx.params.keyId))

    if (found.length) {
      ctx.body = found[0]
    }
    else {
      ctx.status = 404
      ctx.body = { error: 'Key not found', query: ctx.params }
    }
  },

  create(ctx) {
    ctx.body = 'Not implemented yet'
  },

  destroy(ctx) {
    ctx.body = 'Not implemented yet'
  },
}
