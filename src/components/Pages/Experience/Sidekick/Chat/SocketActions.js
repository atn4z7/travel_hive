
// Sets the client's username
export const setUserAttributes = (socket,username, profileImage) => {    

    // Tell the server your username
    socket.emit('add user', (username, profileImage));   
    
}

export const addParticipantsMessage = (data) => {
  return `${data.numUsers} connected`;
}

export const sendMessage = (socket,message) => {

  /* Need to check if connected first before sending message */
  socket.emit("new message", message);
}








