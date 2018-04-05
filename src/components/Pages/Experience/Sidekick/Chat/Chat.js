import {AutoComplete, Avatar, Button, Input} from  'antd'
import {app} from '../../../../app.js' /* Contains dva app from antd which has state management components*/
import React, {Component} from 'react'
import { ChatFeed, Message } from 'react-chat-ui'
import { connect } from './Socket/Connect'
import { getSocketEvents } from './Socket/Events'
import { setUserAttributes, sendMessage } from './Socket/Actions'


 
export class Chat extends Component {
 
  constructor() {
    super();
    this.state = {
      user: {},
      socket: null,
      connected: false,
      messages: [
        new Message({
          id: 1,
          message: "I'm the recipient! (The person you're talking to)",
        }), // Gray bubble
        new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
         
      ],
      //...
    };
  }
 
 
  render() {
    
    const connectToSocket = () => { 
      const user = app._store.getState().user;
      console.log("User info from store", user);  
      this.setState({user:user});     
      if(this.state.connected === true) return
      this.setState({socket: connect()}, () => {
        this.setState({connected: true});
        console.log("Client socket added");
        getSocketEvents(this.state.socket);
        setUserAttributes(this.state.socket, this.state.user) 
      });       
    }
    const callSendMessage = (e) => {    
      console.log("Enter key pressed",e);
       const message = e.target.value;
       sendMessage(this.state.socket, message); 
       let messagesArr = this.state.messages;
       messagesArr.push(new Message({id: 0, message: message}));
       this.setState({messages: messagesArr});
    }
    
    return (<div>

      <ChatFeed
      messages={this.state.messages} // Boolean: list of message objects
      isTyping={this.state.is_typing} // Boolean: is the recipient typing
      hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
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
    />

    <AutoComplete>
      <Input onPressEnter = {callSendMessage}/>
    </AutoComplete>

    

    <Button onClick = {connectToSocket}/>      
    </div>

      

    )}
}