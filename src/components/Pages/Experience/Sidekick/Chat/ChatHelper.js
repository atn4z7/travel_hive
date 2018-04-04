

export const SocketEvents = () =>
    // Whenever the server emits 'login', log the login message
    socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Socket.IO Chat – ";
    log(message, {
        prepend: true
    });
    addParticipantsMessage(data);
    });