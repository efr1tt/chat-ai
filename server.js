import { createServer } from 'http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res)
  })

  const io = new Server(server)

  io.on('connection', socket => {
    socket.on('message', msg => {
      io.emit('message', { content: msg.content, role: 'user' })
    })
  })

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000')
  })
})
