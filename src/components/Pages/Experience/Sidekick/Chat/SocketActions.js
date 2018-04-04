
// Sets the client's username
export const setUserAttributes = (socket,username, profileImage) => {    

    // Tell the server your username
    socket.emit('add user', (username, profileImage));   
    
}

export const addParticipantsMessage = (data) => {
  return `${data.numUsers} connected`;
}







