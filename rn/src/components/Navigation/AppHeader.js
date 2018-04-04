import React from 'react';
import { Header } from 'react-native-elements';
import { Image, View } from 'react-native';
import { DrawerContent } from './Drawer';

export const AppHeader = (props) => (
    <View style={{marginTop: 20}}>
        <Header
            leftComponent={{ icon: 'menu', color: '#fff' ,onPress: () => props.navigation.navigate("DrawerOpen")}}
            centerComponent={<Image  source={require('../../images/logo.png')}/>}
            rightComponent={{ icon: 'home', color: '#fff' }}
            outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
        >        
        </Header>
    </View>
);

