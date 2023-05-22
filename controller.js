let messages = require ('./db.json')

module.exports = {
    getMessages: (req, res) => {
        res.status(200).send(messages)
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
            messages.push(newMessage)

            res.statues(200).send(messages)
        }
    }
}