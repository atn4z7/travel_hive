import React from 'react';
import { Drawer, List } from 'antd-mobile';

import { WrappedLoginForm } from '../Pages/DrawerViews/Login';
import { WrappedJoinForm } from '../Pages/DrawerViews/Join';

import { TabNavigator} from './Tab';

export class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contentWindowSelected: "Home" };
  }
  
  render() {    
    const changeDrawerView = (viewStr)=>{
      this.setState({contentWindowSelected: viewStr});
    }
    const sidebar = (<List>     
           <img src={require('../../images/logo.png')} />
          <List.Item key={0}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
            onClick= {() => {
              this.setState({contentWindowSelected: "Home"});   
              this.props.onDock();
            }}
          >Home</List.Item>
        
        
        <List.Item key={1}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          onClick= {() => {
            this.setState({contentWindowSelected: "Login"});         
            this.props.onDock();
          }}
        >Login</List.Item>

        <List.Item key={2}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          onClick= {() => {
            this.setState({contentWindowSelected: "Join"});        
            this.props.onDock();
          }}
        >Join</List.Item>  
      
  
    </List>);

    const getContentWindow = (() => {
      switch(this.state.contentWindowSelected){    
        case 'Home':
          return(<TabNavigator />);
          break;    
        case 'Login':
          return (<WrappedLoginForm changeDrawerView = {changeDrawerView}/>);
          break;  
        case 'Join':
          return (<WrappedJoinForm changeDrawerView = {changeDrawerView}/>);
          break;  
      }
    });
  
    return (<div >      
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 5 }}
        sidebarStyle={{ border: '1px solid #ddd' }}
        sidebar={sidebar}
        docked={this.props.docked}
      >
        <div>   
                 
         {getContentWindow()}
        </div> 
      </Drawer>
    </div>);
  }
}

