import React from 'react';
import { Dimensions, View, Text, Image } from 'react-native'
import { Card, Input, ListItem, Button, Avatar } from 'react-native-elements'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppHeader } from '../Navigation/AppHeader';

const SCREEN_WIDTH = Dimensions.get('window').width;

export class Login extends React.Component {
  render() {    
    let navigation = this.props.navigation;   
    return (
  <View >
    <AppHeader navigation={navigation}/>
    <View style={{ width: SCREEN_WIDTH, alignItems: "center" }}>      
      <Text
        style={{
          color: "black",
          fontSize: 30,
          marginVertical: 10,
          fontWeight: "300"
        }}
      >
        Login
      </Text>      
      <Input containerStyle={{ borderRadius: 40, borderWidth: 1, borderColor: "rgba(110, 120, 170, 1)", height: 50, width: SCREEN_WIDTH - 50, marginVertical: 10 }} icon={<MaterialIcon name="email-outline" color="rgba(110, 120, 170, 1)" size={25} />} iconContainerStyle={{ marginLeft: 20 }} placeholder="Email" placeholderTextColor="rgba(110, 120, 170, 1)" inputStyle={{ marginLeft: 10, color: "white" }} autoCapitalize="none" autoCorrect={false} keyboardAppearance="light" keyboardType="email-address" returnKeyType="next" ref={input => (this.email2Input = input)} onSubmitEditing={() => {
          this.password2Input.focus();
        }} blurOnSubmit={false} />
      <Input containerStyle={{ borderRadius: 40, borderWidth: 1, borderColor: "rgba(110, 120, 170, 1)", height: 50, width: SCREEN_WIDTH - 50, marginVertical: 10 }} icon={<SimpleIcon name="lock" color="rgba(110, 120, 170, 1)" size={25} />} iconContainerStyle={{ marginLeft: 20 }} placeholder="Password" placeholderTextColor="rgba(110, 120, 170, 1)" inputStyle={{ marginLeft: 10, color: "white" }} autoCapitalize="none" keyboardAppearance="light" secureTextEntry={true} autoCorrect={false} keyboardType="default" returnKeyType="next" ref={input => (this.password2Input = input)} onSubmitEditing={() => {
          this.confirmPassword2Input.focus();
        }} blurOnSubmit={false} />      
    </View>
  </View>
        
);
  }
}
