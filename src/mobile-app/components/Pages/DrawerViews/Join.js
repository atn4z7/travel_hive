import React from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { addUser } from '../../../../userApi.js';
import { connect } from 'dva';

const Item = List.Item;

class JoinForm extends React.Component {
  state = {
    value: 1,
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error,values) => {
      if (!error) { 
        console.log('Received values of form: ', values);       
        const { username, email, password } = values;
        addUser(username, email, password).then(user => {
          if(user){
            Toast.success("Thanks for signing up! Get ready for an adventure!");
            this.props.dispatch({type:'user/logInUser'});   // antd dva operation to change isLoggedIn state to yes
            this.props.changeDrawerView("Profile");
          } else {
            Toast.fail("Signup process failed. Please try again!");
          }
          });
        
      } 
    });
  }
  
  onReset = () => {
    this.props.form.resetFields();
  }
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four charactors for account'));
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<form>
      <List
        renderHeader={() => 'Join'}
        renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
      >
        <InputItem {...getFieldProps('username',{rules: [{ required: true, message: 'Your username is required.' }],})} placeholder="please input username" type="text">
          Username
        </InputItem> 
        <InputItem
          {...getFieldProps('email', {
            // initialValue: 'little ant',
            rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your email!',
              }],
          })}
          type="email-address"
          clear
          error={!!getFieldError('email')}
          onErrorClick={() => {
            alert(getFieldError('email').join('、'));
          }}
          placeholder="please input email"
        >Email</InputItem>
        <InputItem {...getFieldProps('password',{rules: [{ required: true, message: 'Please input your Password!' }],})} placeholder="please input password" type="password">
          Password
        </InputItem>
        <InputItem {...getFieldProps('confirmPassword',{rules: [{ required: true, message: 'Please confirm your Password!' }],})} placeholder="please confirm password" type="password">
          Confirm
        </InputItem>     
        
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
          <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>Reset</Button>
        </Item>
      </List>
    </form>);
  }
}

export const WrappedJoinForm = createForm()(connect()(JoinForm));