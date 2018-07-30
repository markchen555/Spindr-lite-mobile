import React from 'react';
// import { Icon } from 'expo';
import { Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';

class TabBarIcon extends React.Component {
  render() {
    return (
      // <Icon.Ionicons
      //   name={this.props.name}
      //   size={26}
      //   style={{ marginBottom: -3 }}
      //   color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      // />
      <Icon 
        name={this.props.name} 
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

class TabBarMainIcon extends React.Component {
  render() {
    return (
      <Image
        style={{width:26, height:26, marginBottom: -3}}
        source={this.props.focused ? require('../assets/images/tabicon-focused.png') : require('../assets/images/tabicon-unfocused.png')}
      />
    );
  }
}

export {
  TabBarIcon,
  TabBarMainIcon,
}