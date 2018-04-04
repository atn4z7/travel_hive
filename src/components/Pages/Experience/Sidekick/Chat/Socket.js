const io = require('socket.io-client')

const socket = io(process.env.REACT_APP_CHAT_SERVER_URL || "http://localhost:80");

// Sets the client's username
export const setUserAttributes = (username, profileImage) => {    

    // Tell the server your username
    socket.emit('add user', (username, profileImage));

    socket.on('add user', (data) => {
        console.log("Server sent message",data);
        return {username: data.username, profileImage: data.profileImage};        
    });
    
    
}







