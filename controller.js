let db = require('./db.json')

module.exports = {
    getMessages: (req, res) => {
        res.status(200).send(db)
    },

    addMessage: (req, res) => {
        let { name, message, timestamp } = req.body

        if (!name || !message || !timestamp) {
            res.status(400).send('New messages MUST have a name and a message')
        } else {
            let newMessage = {
                id: db.length + 1,
                name: name,
                message: message,
                timestamp: timestamp
            };
            db.push(newMessage)

            res.status(200).send(db)
        }
    },

    deleteMsg: (req, res) => {
        let { id } = req.params

        let index = db.findIndex(msg => +msg.id === +id)

        if (index === -1) {
            res.status(404).send('Message not found')
        } else {
            db.splice(index, 1)

            res.status(200).send(db)
        }
    }
}
