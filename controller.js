let db = require ('./db.json')

module.exports = {
    getMessages: (req, res) => {
        res.status(200).send(db)
    },

    addMessage: (req, res) => {
        let {name, message} = req.body

        if (!name || !message) {
            res.send(400).send('New messages MUST have a name and a message')
        } else {
            let newMessage = {
                name,
                message
            }
            db.push(newMessage)

            res.status(200).send(db)
        }
    }
}