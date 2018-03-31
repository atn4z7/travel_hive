import React from "react";
import { app } from "../../../components/app";
import { NavBar, Icon } from 'antd-mobile';
import { DrawerNavigator } from './Drawer';
import './AppHeaderStyle.css';
import { AppHeaderPopover } from './AppHeaderPopover';

export class AppHeader extends React.Component{
      state = {
        docked: false,
      }
      onDock = () => {
          console.log("Clicked");
        this.setState({
          docked: !(this.state.docked)
        });
      }
      
      
      render(){
        
          return(
            <div style={{}} >
              <NavBar className="header" icon={<Icon type="ellipsis" />}
              onLeftClick={() => {console.log('onLeftClick'); this.onDock()}}
              rightContent={[
                <AppHeaderPopover profileImg = {<img className ="avatar" src={app._store.getState().user.profileImage} />}/>
                
             
              ]}
              ><img src={require("../../images/logo.png")} /> </NavBar>                           
            
            <DrawerNavigator  docked = {this.state.docked} onDock = {this.onDock}/>
            </div>
          );          
       }
    }
    