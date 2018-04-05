const io = require('socket.io-client')

export const connect = () => {
    return io("https://travelhive-chat-server.herokuapp.com" || "http://localhost:80");
}
