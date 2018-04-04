import React from "react";
import { Icon,Tabs, Radio } from 'antd';
import {Chat} from './Chat';
import {Camera} from './Camera';
import {Checklist} from './Checklist';
import {Expenses} from './Expenses';

export class Sidekick extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      componentSelected: <Chat />
    };
  }

  render() {  
    const changeComponent = (e)=>{
      const componentName = e.target.value;
      switch(componentName){
        case "message":
          return this.setState({componentSelected: <Chat />});
          break;
        case "camera":
          return this.setState({componentSelected: <Camera />});
          break;
        case "checklist":
          return this.setState({componentSelected: <Checklist />});
          break;
        case "expenses":
          return this.setState({componentSelected: <Expenses />});
          break; 
      }
    }  
    return (
      <div>
        <Radio.Group onChange={changeComponent} defaultValue="chat" style={{}}>
          <Radio.Button value="chat"><Icon className="custom-icon" type="message"/></Radio.Button>
          <Radio.Button value="camera"><Icon className="custom-icon" type="camera" /></Radio.Button>
          <Radio.Button value="checklist"><Icon className="custom-icon" type="schedule" /></Radio.Button>
          <Radio.Button value="expenses"><Icon className="custom-icon" type="credit-card" /></Radio.Button>
          <div style={{minHeight:"60%", borderColor:"lightgray", borderStyle:"solid"}}>
              {this.state.componentSelected}
          </div>
        </Radio.Group>
        
      </div>
    );
  }
}
