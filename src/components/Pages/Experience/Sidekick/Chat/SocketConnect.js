const io = require('socket.io-client')

export const connect = () => {
    return io(process.env.REACT_APP_CHAT_SERVER_URL || "http://localhost:80");
}
