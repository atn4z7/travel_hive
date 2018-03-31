import { connect } from "dva";
import React from "react";
import 'antd-mobile/dist/antd-mobile.css';
import { AppHeader } from './components/Navigation/AppHeader';


export const AppMobile = connect(({ user, inspiration }) => ({
  user,
  inspiration
}))(function(props) {
  return (
    <div>
      <AppHeader />   
      
    </div>
  );
});