
// Sets the client's username
export const setUserAttributes = (socket,user,userID) => {   
    // Tell the server your username
    socket.emit('add user', {userID:userID,username:user.username});       
}

export const addParticipantsMessage = (data) => {  
  return `${data.numUsers} users connected`;
}

export const sendMessage = (socket,message) => {
  /* Need to check if connected first before sending message */
  socket.emit("new message", message);
}

export const disconnectUser = (socket) => {
  socket.emit("user left");
}










