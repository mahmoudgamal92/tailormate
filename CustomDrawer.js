import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'; 
const CustomDrawer = (props,{navigation,route}) => {
  return (
    <SafeAreaView style={{ 
        flex: 1,
        paddingTop:50,
        backgroundColor:"#FFF",
        fontFamily:"Bold",
     }}>
      <Image
        source={ require("./assets/avatar.png") }
        style={styles.sideMenuProfileIcon}
      />
      
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  logout: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom:20
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});

export default CustomDrawer;