import React from 'react';
import { View, Text, Image , StyleSheet,ScrollView} from 'react-native'
import { Button,Card, ListItem} from 'react-native-elements'
import { AppHeader } from '../Navigation/AppHeader';   
   
// implemented with Text and Button as children
export class HomeDrawer extends React.Component {
    render() {      
      return (
        <View style={ styles.topLevelView }> 
      <AppHeader />   
      <ScrollView>       
        <Card
          title="Kasbah du Toubkal"
          image={{uri: "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2RlODZjMTUyZWY2YWRlZmYxNDljNWIxNzU2NjNmYThhNzI4NTVhNzMuanBnIl0sWyJwIiwidGh1bWIiLCI5ODB4PiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXV0/de86c152ef6adeff149c5b175663fa8a72855a73.jpg"}}>        
          <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            gh
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
        <Card
          title="Kasbah du Toubkal"
          image={require('../../images/cancun.jpg')}>        
          <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            gh
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
        <Card
          title="Kasbah du Toubkal"
          image={{uri: "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2RlODZjMTUyZWY2YWRlZmYxNDljNWIxNzU2NjNmYThhNzI4NTVhNzMuanBnIl0sWyJwIiwidGh1bWIiLCI5ODB4PiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXV0/de86c152ef6adeff149c5b175663fa8a72855a73.jpg"}}>        
          <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            gh
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
      </ScrollView>
    </View>
      );
    }
  }      

  const styles = StyleSheet.create({
    topLevelView: {
      flex: 1,
      justifyContent: 'flex-start'
    }
  })
  
  
