const messageContainer = document.querySelector('#message-container')
const form = document.querySelector('form')
const article = document.querySelector('#aRules')

// const baseURL = 'http://54.153.74.137:4001/api/messages'
const baseURL = 'http://localhost:4001/api/messages'

const messagesCallback = ({ data: messages }) => displayMessages(messages)
const errCallback = err => {
    if (err.response && err.response.data) {
        console.log(err.response.data)
    } else {
        console.log(err)
    }
}

const getAllMessages = () => axios.get(baseURL).then(messagesCallback).catch(errCallback)
const createMsg = body => axios.post(baseURL, body).then(messagesCallback).catch(errCallback)
const deleteMsg = id => axios.delete(`${baseURL}/${id}`).then(messagesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#firstName').value
    let message = document.querySelector('#message_text').value

    if (!name || !message) {
        return;
    }

    let bodyObj = {
        name: name,
        message: message
    }

    createMsg(bodyObj)

    document.querySelector('#firstName').value = ''
    document.querySelector('#message_text').value = ''
}

function createMessageCard(messager) {
    const messageCard = document.createElement('div')
    messageCard.classList.add('message-card')

    const messageTime = new Date(messager.timestamp)

    const currentTime = new Date()
    const timeDiff = Math.abs(currentTime - messageTime)
    const minutes = Math.floor(timeDiff / (1000 * 60))
    const timeString = minutes > 0 ? `${minutes} minutes ago` : `just now`

    messageCard.innerHTML = `
    <p class="message-name">${messager.name}</p>
    <div class="btns-container">
        <p class="message-body">${messager.message}</p>
        <p class="message-time">Sent: ${messageTime.toLocaleString()}</p>
        <p class="message-elapsed-time">${timeString}</p>
    </div>
    <button onclick="deleteMsg(${messager.id})">DELETE</button>
    `;

    messageContainer.appendChild(messageCard)
}



function displayMessages(arr) {
    messageContainer.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        createMessageCard(arr[i]);
    }
}

function dismiss() {
    article.innerHTML = ''
}

form.addEventListener('submit', submitHandler)

const socket = io()
socket.on('newMessage', () => {
    getAllMessages()
})

getAllMessages()
