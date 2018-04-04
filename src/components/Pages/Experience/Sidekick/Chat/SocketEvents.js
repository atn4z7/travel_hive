import { addParticipantsMessage,setUserAttributes } from './SocketActions'

export const getSocketEvents = (socket) => {
    socket.on('add user', (data) => {
      console.log("User has been added",data);
    });

    socket.on('new message', (data) => {
            console.log(data);
    });

    socket.on('user joined', (data) =>{
        console.log("New user joined");
  
    });

    socket.on('user left', (data) => {
        
    });

    socket.on('login', (data) => {
        console.log(addParticipantsMessage(data));
                
    })

}
    