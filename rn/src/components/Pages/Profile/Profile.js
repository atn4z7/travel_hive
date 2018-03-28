import React from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button,Avatar } from 'react-native-elements'
import { AppHeader } from '../../Navigation/AppHeader';

// implemented with Text and Button as children
export class Profile extends React.Component {
  render() {    
    let navigation = this.props.navigation;   
    return (
  <View>
    <AppHeader navigation={navigation}/>
    <View style= {{alignItems: 'center', marginTop: 30}}>
      
      <Avatar
          xlarge
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
      />
    </View>
  </View>
)
  }
}