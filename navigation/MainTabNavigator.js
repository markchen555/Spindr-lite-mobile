import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createTabNavigator } from 'react-navigation';

import {TabBarIcon, TabBarMainIcon }from '../components/TabBarIcon';
import MatchScreen from '../screens/MatchScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VideoScreen from '../screens/VideoScreen';
import SettingScreen from '../screens/SettingScreen';

const MatchStack = createStackNavigator({
  Match: MatchScreen,
});

MatchStack.navigationOptions = {
  tabBarLabel: 'Match',
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={
    //     Platform.OS === 'ios'
    //       ? `ios-information-circle${focused ? '' : '-outline'}`
    //       : 'md-information-circle'
    //   }
    // />
    <TabBarIcon
    focused={focused}
    name='heart'
  />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Video: VideoScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    // />
    <TabBarMainIcon
    focused={focused}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Setting: SettingScreen,
}, {
  initialRouteName: 'Profile',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
  }),
});

ProfileStack.navigationOptions = ({navigation}) => {
  return {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
      // <TabBarIcon
      //   focused={focused}
      //   name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
      // />
      <TabBarIcon
      focused={focused}
      name='user'/>
    ),
    tabBarOnPress: ({navigation}) => { 
      console.log('test scene', navigation);
      if(navigation.state.index === 0) {
        navigation.navigate('Profile')
      }
      if(navigation.state.index > 0) {
        navigation.popToTop();
      }
    },
  }
};

export default createBottomTabNavigator({
  MatchStack,
  HomeStack,
  ProfileStack,
},{
  initialRouteName: 'HomeStack',
  tabBarOptions: {
    showLabel: false,
  },
  // navigationOptions: ({ navigation }) => {
  //   console.log('this is navigation', navigation)
  //   return {
  //     tabBarOnPress: (previousScene, scene, jumpToIndex) => { 
  //       console.log('test scene', previousScene, scene, jumpToIndex);
  //     },
  //   }
  // }
});


