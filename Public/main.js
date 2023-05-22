
const messageContainer = document.querySelector('#message-container')
const form = document.querySelector('form')

const baseURL = 'http://localhost:4001/api/messages'

const messagesCallback = ({ data: messages }) => displayMessages(messages)
const errCallback = err => {
    if (err.response && err.response.data) {
    console.log(err.response.data);
    } else {
    console.log(err);
    }
}


const getAllMessages = () => axios.get(baseURL).then(messagesCallback).catch(errCallback)
const createMsg = body => axios.post(baseURL, body).then(messagesCallback).catch(errCallback)




function submitHandler(e) {
    e.preventDefault();

    let named = document.querySelector('#name');
    let message = document.querySelector('#msg');

    if (named !== null && message !== null) {
    let bodyObj = {
        named: named.value,
        message: message.value
    };

    createMsg(bodyObj);

    named.value = '';
    message.value = '';
    }
}






function createMessageCard(message) {
    const messageCard = document.createElement('div')
    messageCard.classList.add('message-card')

    messageCard.innerHTML = `
    <p class= "message-name">${message.name}</p>
    <div class="btns-container">
        <p class="message-body">${message.body}</p>
    </div>
    <button onclick="deleteMsg(${message.id})">delete</button>
    `
    messageContainer.appendChild(messageCard)
}



function displayMessages(arr) {
    messageContainer.innerHTML = ``
    for(let i = 0; i < arr.length; i++) {
        createMessageCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllMessages()