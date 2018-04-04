
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { Card, ListItem} from 'react-native-elements'
import { AppHeader } from '../../Navigation/AppHeader';

export class InspirationHome extends React.Component {
    render() {    
      let navigation = this.props.navigation;   
      return (
        <View style={ styles.topLevelView }> 
      <AppHeader navigation = {navigation}/>   
      <ScrollView>       
        <Card
          title="Kasbah du Toubkal"
          image={{uri: "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2RlODZjMTUyZWY2YWRlZmYxNDljNWIxNzU2NjNmYThhNzI4NTVhNzMuanBnIl0sWyJwIiwidGh1bWIiLCI5ODB4PiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXV0/de86c152ef6adeff149c5b175663fa8a72855a73.jpg"}}>        
          
        </Card>
        <Card
          title="Cancun"
          image={require('../../../images/cancun.jpg')}>             
        </Card>
        <Card
          title="Kasbah du Toubkal"
          image={{uri: "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2RlODZjMTUyZWY2YWRlZmYxNDljNWIxNzU2NjNmYThhNzI4NTVhNzMuanBnIl0sWyJwIiwidGh1bWIiLCI5ODB4PiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXV0/de86c152ef6adeff149c5b175663fa8a72855a73.jpg"}}>        
          
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
  
  
