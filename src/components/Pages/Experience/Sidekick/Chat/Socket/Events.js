import { addParticipantsMessage,setUserAttributes, sendMessage } from './Actions'
import { Message } from 'react-chat-ui'

export const getSocketEvents = (one) => {
    /* 'one' is the this binding from the chat react component in Chat.js */
    let socket = one.state.socket;
    let messages = one.state.messages;

    socket.on('add user', (data) => {
      let updatedUserID = one.state.userID;
      updatedUserID++; 
      one.setState({userID: updatedUserID});
      console.log("User has been added",data);
    });

    socket.on('new message', (data) => {
            console.log(data);
            let messagesArr = messages;
            messagesArr.push(new Message({id: 1, message: data.username + ": " + data.message}));
            one.setState({messages: messagesArr});
    });

    socket.on('user joined', (data) =>{       
        let message = addParticipantsMessage(data);
        one.setState({numOnline: message});
        let messagesArr = messages;
        messagesArr.push(new Message({id: 100, message: data.username + " has joined chat!"}));
        one.setState({messages: messagesArr});         
        
        /* connectedUserNames state update */       
        one.setState({connectedUserNames: data.usersOnline});          
    });    
    
    socket.on('user left', (data) => {
      let message = addParticipantsMessage(data);
      one.setState({numOnline: message});
      let messagesArr = messages;
      messagesArr.push(new Message({id: 100, message: data.username + " has left chat."}));
      one.setState({messages: messagesArr});   

      /* connectedUserNames state update */       
      one.setState({connectedUserNames: data.usersOnline});  
    });

    /* This event triggers only for the user that just logged in by click the input text box*/  
    socket.on('login', (data) => {
        let message = addParticipantsMessage(data);
        one.setState({numOnline: message});
        /* connectedUserNames state update */       
        one.setState({connectedUserNames: data.usersOnline});                  
    });

    socket.on('disconnect', function () {
      console.log("User disconnected!"); 
    });    
    
}
    