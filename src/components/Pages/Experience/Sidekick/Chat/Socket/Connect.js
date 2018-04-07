const io = require('socket.io-client')

export const connect = () => {
    return io(process.env.REACT_CHAT_URL || "http://localhost:80");
}
