import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import {InspirationHome} from '../Inspiration/InspirationHome';
import {HomeDrawer} from '../HomeDrawer';
import {PlanningHome} from '../Planning/PlanningHome';

const HomeDrawerItem = StackNavigator({
  Home: { screen: HomeDrawer }
  },
  {
    headerMode: 'none'
  }
);

HomeDrawerItem.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="email"
      size={30}
      iconStyle={{
        width: 30,
        height: 30
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default HomeDrawerItem;