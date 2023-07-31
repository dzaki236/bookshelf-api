const HapiServer = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
  const server = HapiServer.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })
  server.route(routes)
  await server.start()
  const updatedAt = new Date().toISOString()
  console.log('Starting server at ' + updatedAt)
}
module.exports = init
