import {Avatar, Button} from  'antd'
import {app} from '../../../../app.js' /* Contains dva app from antd which has state management components*/
import React, {Component} from 'react'
import { ChatFeed, Message } from 'react-chat-ui'
import { connect } from './SocketConnect'
import { getSocketEvents } from './SocketEvents'
import { setUserAttributes } from './SocketActions'

 
export class Chat extends Component {
 
  constructor() {
    super();
    this.state = {
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
    const {username, profileImage} = [app._store.getState().user, app._store.getState().profileImage];    
    const connectToSocket = () => {      
      if(this.state.connected === true) return
      this.setState({socket: connect()}, () => {
        this.setState({connected: true});
        console.log("Client socket added");
        getSocketEvents(this.state.socket);
        setUserAttributes(this.state.socket,username, profileImage) 
      });       
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

    <Button onClick = {connectToSocket}/>      
    </div>

      

    )}
}