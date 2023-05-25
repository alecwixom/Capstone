const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 4001

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/Public'))

const { getMessages, addMessage, deleteMsg } = require('./controller.js')

app.get('/api/messages', getMessages)
app.post('/api/messages', (req, res) => {
    addMessage(req, res)
    io.emit('newMessage')
})
app.delete('/api/messages/:id', deleteMsg)

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('newMessage', () => {
        io.emit('newMessage')
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

http.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
