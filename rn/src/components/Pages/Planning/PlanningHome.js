import React from 'react';
import { View, Text, Image , StyleSheet} from 'react-native'
import { Card, ListItem} from 'react-native-elements'
import { AppHeader } from '../../Navigation/AppHeader';   
   
// implemented with Text and Button as children
export class PlanningHome extends React.Component {  
    render() {
      let navigation = this.props.navigation;      
      return (
        <View style={styles.topLevelView}>
            <AppHeader navigation = {navigation}/>
            <Text>Planning Page</Text>            
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
  
  
