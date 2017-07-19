const { users } = require('../db')


module.exports = {
  // Get all users
  index(ctx) {
    ctx.body = users
  },

  // Read single user
  read(ctx) {
    const found = users.filter(user => user.login === ctx.params.userLogin)

    if (found.length) {
      ctx.body = found[0]
    }
    else {
      ctx.status = 404
      ctx.body = { error: 'User not found', query: ctx.params }
    }
  },
}
