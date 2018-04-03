import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { InspirationHome } from '../Pages/Inspiration/InspirationHome';
import { PlanningHome } from '../Pages/Planning/PlanningHome';
import { Drawer } from './Drawer';

export const RootTab = TabNavigator (
    {
      Inspiration: { screen: InspirationHome },
      Plan: { screen: PlanningHome },
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
  
          switch(routeName){
            case 'Inspiration':
              iconName = `ios-bulb${focused ? '' : '-outline'}`;
              break;
            case 'Plan':
              iconName = `ios-globe${focused ? '' : '-outline'}`;
              break;
  
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: '#2FB1C0',
        inactiveTintColor: 'gray',
      },
      animationEnabled: false,
      swipeEnabled: true,
    }
  );