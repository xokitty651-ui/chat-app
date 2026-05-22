const socket = io();

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");

const myId = Math.random().toString(36).substring(2,8);

/* Emojis */
const emojis = [
    "😀","😂","😍","🥺","💕","✨",
    "🌸","☁️","😭","💜","🐻",
    "🎀","🍓","🫶","😎","❤️"
];

/* Create Emoji Picker */
emojis.forEach((emoji)=>{

    const span = document.createElement("span");

    span.textContent = emoji;

    span.classList.add("emoji");

    span.addEventListener("click", ()=>{

        input.value += emoji;

        emojiPicker.style.display = "none";

        input.focus();
    });

    emojiPicker.appendChild(span);

});

/* Toggle Emoji Picker */
emojiBtn.addEventListener("click", ()=>{

    if(emojiPicker.style.display === "flex"){
        emojiPicker.style.display = "none";
    }
    else{
        emojiPicker.style.display = "flex";
    }

});

/* Send Message */
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e)=>{

    if(e.key === "Enter"){
        sendMessage();
    }

});

function sendMessage(){

    if(input.value.trim() !== ""){

        const messageData = {
            sender: myId,
            text: input.value
        };

        socket.emit("chat message", messageData);

        input.value = "";
    }

}

/* Receive Message */
socket.on("chat message", (data)=>{

    const li = document.createElement("li");

    li.textContent = data.text;

    if(data.sender === myId){
        li.classList.add("me");
    }
    else{
        li.classList.add("other");
    }

    messages.appendChild(li);

    messages.scrollTop = messages.scrollHeight;

});