import { addParticipantsMessage,setUserAttributes } from './Actions'
import { Message } from 'react-chat-ui'

export const getSocketEvents = (one) => {
    console.log("THIS is here and its number one!", one);
    let socket = one.state.socket;
    let messages = one.state.messages;
    socket.on('add user', (data) => {
      console.log("User has been added",data);
    });

    socket.on('new message', (data) => {
            console.log(data);
            let messagesArr = messages;
            messagesArr.push(new Message({id: 1, message: data.message}));
            one.setState({messages: messagesArr});
    });

    socket.on('user joined', (data) =>{
        console.log("New user joined",data);
  
    });

    socket.on('user left', (data) => {
        
    });

    socket.on('login', (data) => {
        console.log(addParticipantsMessage(data));
                
    })

}
    