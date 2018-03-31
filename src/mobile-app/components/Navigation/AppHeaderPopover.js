import React from 'react';
import { Popover } from 'antd-mobile';
import {logoutUser} from '../../../userApi';
import { saveState } from "../../../models/localStorage";
import { app } from "../../../components/app";

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;


export class AppHeaderPopover extends React.Component {
  state = {
    visible: false,
    selected: '',
  };
  onSelect = (opt) => {
    // console.log(opt.props.value);
    logoutUser();
    app._store.dispatch({ type: "user/logOutUser" }); // alternate way to connect to the app store/state dispatcher
    saveState(undefined);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
    window.location.reload();
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render() {
    return (<div>
     
          <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Profile</Item>),
              (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>Logout</Item>),
              (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }}>Help</span>
              </Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [0, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
              
              {this.props.profileImg}
              
            
            
          </Popover>
    
        
    </div>);
  }
}
