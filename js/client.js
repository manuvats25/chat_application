const socket = io.connect('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('message');
const messageContainer = document.querySelector(".container");
var audio = new Audio('chat_sound.mp3');
const append =(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('mes');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left') audio.play();
}
form.addEventListener('submit',(a)=>{
    a.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value='';


})
const user= prompt("Enter your name");
// sender
socket.emit('new-user', user );

// reciever
socket.on('user-joined',user=>{
    append(`${user} Joined the chat`, 'right')
})
// wehe recieve the data
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`, 'left')
})
socket.on('left',names=>{
    append(`${names} left the Chat`,'left');
})