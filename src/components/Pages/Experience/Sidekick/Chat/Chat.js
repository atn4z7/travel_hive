import React from "react";
import {Avatar, Button} from  'antd';
import {setUserAttributes} from './Socket.js';
import {app} from '../../../../app.js' /* Contains dva app from antd which has state management components*/
const io = require('socket.io-client')


/* Clientside code for socket.io chat room 
   Converted chat example at https://github.com/socketio/socket.io/blob/master/examples/chat 
   into a more component react version.
*/

const COLORS = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'

];



const socket = io(process.env.REACT_APP_CHAT_SERVER_URL || "http://localhost:80");

//let username = app._store.getState().username;
//let profileImage = app._store.getState().profileImage
console.log(app);



socket.on('add user', (data) => {
    console.log("Server sent message",data);
    return {username: data.username, profileImage: data.profileImage};        
});




const MyMessage = ()=>{
  <div>
    My Message
  </div>  
  
}

const OthersProfileAvatar = (profileImage) => {
  <div>    
    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            src={profileImage} 
    />
    
  </div>
}

const OthersMessage = () => {
  <div style={{display:"inline"}}>
    <OthersProfileAvatar />
    <div>Others Message</div>
  </div>
  
}

export class Chat extends React.Component {
  constructor(props){
    super(props);    
    this.state = {hidden: "false"}
  }
  
  addUser = () => {
    this.setState({hidden: "true"});
    // Tell the server your username
    socket.emit('add user', ("darth", "dude"));
    
  }

  render() { 
    const user = app._store.getState(); 
    
    
    return (
      <div>
        <Button visible={this.state.hidden} onClick={this.addUser}/>
      </div>
    );
  }
}