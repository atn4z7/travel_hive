
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));


/* chatroom */

let numUsers = 0;

io.on('connection', (socket) => {
  let addedUser = false;

  /* Watching for messages the client emits to the server */

  socket.on('new message', (data) => {
    /* Broadcast event to all clients */
    socket.broadcast.emit('new message', {
      username: socket.username,
      //profileImage: socket.profileImage,
      message: data
    });
  });

  socket.on('add user', (data) => {
    console.log("Server receives 'add user' message from " + data.username);
    if(addedUser) return;
    
    /* Store added user's username in the socket session for this client */
    socket.userID = numUsers; /* Not currently used by view on client, maybe useful if we switch views */
    socket.username = data.username;    
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      userID: socket.userID,
      username: socket.username,      
      numUsers: numUsers
    });

    /* Tell all connected clients that a new user has connected */
    socket.broadcast.emit('user joined', {
      userID: socket.userID,
      username: socket.username,      
      numUsers: numUsers
    });

  });

}); /* Ends the connection object io.on above */