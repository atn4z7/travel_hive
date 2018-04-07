import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { DrawerNavigator, NavigationActions, DrawerItems } from 'react-navigation';
import LoginDrawerItem  from '../Pages/Drawer/Login';
import ProfileDrawerItem from '../Pages/Drawer/Profile';
import HomeDrawerItem from '../Pages/Drawer/Home';
import { InspirationHome } from '../Pages/Inspiration/InspirationHome';
import { RootTab } from './RootTab';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DrawerContent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('../../images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57 }}
        resizeMode="contain"
      />
    </View>
    <View style={{marginLeft: 10}}>
      <DrawerItems {...props} />
    </View>
  </View>
);

export const Drawer = DrawerNavigator(
  {
    Home: {
      path: '/rootTab',
      screen: RootTab
    },
    Login: {
      path: '/login',
      screen: LoginDrawerItem
    },
    Profile: {
      path: '/profile',
      screen: ProfileDrawerItem
    }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: DrawerContent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);