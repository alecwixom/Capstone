const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'));


const { getMessages, addMessage, deleteMsg } = require('./controller.js')


app.get('/api/messages', getMessages)
app.post('/api/messages', addMessage)
app.delete('/api/messages/:id', deleteMsg)


app.listen(4001, () => {
    console.log('Were up on 4001!');
})