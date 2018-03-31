import React from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { loginUser } from '../../../../userApi.js';
import { connect } from 'dva';

const Item = List.Item;

class LoginForm extends React.Component {
  state = {
    value: 1,
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error,values) => {
      if (!error) {        
        const { email, password } = values;
        loginUser(email, password).then(user => {
            if(user){
              const firstname = user.user.split(" ")[0];
              console.log("USER",user);
              Toast.success("Welcome back, " + firstname);
              let base64image = undefined;           
              base64image = user.profileImage;            
              this.props.dispatch({type:'user/logInUser'});   // antd dva operation to change isLoggedIn state to true
              this.props.dispatch({type:'user/updateProfileImage', payload:base64image})
              this.props.dispatch({type: 'user/updateBioText', payload: user.bioText})
              this.props.changeDrawerView("Home");
            } else {
              Toast.fail("Incorrect email or password!");
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
        renderHeader={() => 'Login'}
        renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
      >
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
        
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
          <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>Reset</Button>
        </Item>
      </List>
    </form>);
  }
}

export const WrappedLoginForm = createForm()(connect()(LoginForm));