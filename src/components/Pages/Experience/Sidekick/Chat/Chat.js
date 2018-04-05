import {AutoComplete, Avatar, Button, Input} from  'antd'
import {app} from '../../../../app.js' /* Contains dva app from antd which has state management components*/
import React, {Component} from 'react'
import { ChatBubble,ChatFeed, Message } from 'react-chat-ui'
import { connect } from './Socket/Connect'
import { getSocketEvents } from './Socket/Events'
import { disconnectUser, setUserAttributes, sendMessage } from './Socket/Actions'

export class Chat extends Component {
 
  constructor() {
    super();
    this.state = {
      user: {},
      connectedUserNames: [],
      socket: null,
      connected: false,
      messages: [],      
      is_type:false,
      numOnline: "",
      infoMessage: "",
      //...
    };
  }
  componentWillUnmount = () => {
    disconnectUser(this.state.socket);
    this.state.socket.disconnect();
  }
 
  render() {
    
    const dadOfgetSocketEvents = () => getSocketEvents(this);
    const connectToSocket = () => { 
      const user = app._store.getState().user;      
      this.setState({user:user});     
      if(this.state.connected === true) return
      this.setState({socket: connect()}, () => {
        this.setState({connected: true});
        console.log("Client socket added");
        dadOfgetSocketEvents()
        setUserAttributes(this.state.socket, this.state.user, this.state.userID) 
      });       
    }
    const callSendMessage = (e) => {             
       const message = e.target.value;
       sendMessage(this.state.socket, message); 
       let messagesArr = this.state.messages;
       messagesArr.push(new Message({id: 0, message: message }));
       this.setState({messages: messagesArr});
       e.target.value = "";
    }
    
    return (
    <div style={{minHeight: "300px",maxHeight:"300px", position: "relative"}}>
      <div>users online: {this.state.connectedUserNames.join(",")}</div>

      <ChatFeed                 
        maxHeight="400px"
        minHeight="400px"
        messages={this.state.messages} // Boolean: list of message objects
        isTyping={this.state.is_typing} // Boolean: is the recipient typing
        hasInputField={false} // Boolean: use our input, or use your own
        showSenderName ={false} // show the name of the user who sent the message
        bubblesCentered={true} //Boolean should the bubbles be centered in the feed?
        // JSON: Custom bubble styles
        bubbleStyles={
          {
            text: {
              fontSize: 30
            },
            chatbubble: {
              borderRadius: 70,
              padding: 40
            }
          }
        }
      >
      </ChatFeed>   

    <div style={{marginRight:"330px" } }>          
        <Input style={{boxShadow: "inset 3px 3px 3px  grey",borderRadius: "15%",position:"absolute", top:"400px", minWidth: "300px"}} onPressEnter = {callSendMessage} onFocus = {connectToSocket}/>                 
    </div> 
  </div>
      

    )}
}