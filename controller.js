const fs = require('fs');
const path = require('path');
const dbFilePath = path.resolve(__dirname, 'db.json');

let db = require(dbFilePath);

module.exports = {
getMessages: (req, res) => {
    res.status(200).send(db);
},

addMessage: (req, res) => {
    let { name, message } = req.body;

    if (!name || !message) {
    res.status(400).send('New messages MUST have a name and a message');
    } else {
    let newMessage = {
        id: db.length + 1,
        name: name,
        message: message
    };
    db.push(newMessage);

    fs.writeFile(dbFilePath, JSON.stringify(db), 'utf8', (err) => {
        if (err) {
        console.error(err);
        res.status(500).send('Unable to add message');
        return;
        }
        res.status(200).send(db);
    });
    }
},

deleteMsg: (req, res) => {
    let { id } = req.params;

    let index = db.findIndex(msg => +msg.id === +id);

    if (index === -1) {
    res.status(404).send('Message not found');
    } else {
    db.splice(index, 1);

    fs.writeFile(dbFilePath, JSON.stringify(db), 'utf8', (err) => {
        if (err) {
        console.error(err);
        res.status(500).send('Unable to delete message');
        return;
        }
        res.status(200).send(db);
    });
    }
}
};