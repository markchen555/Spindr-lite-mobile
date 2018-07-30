import React from 'react';

import {
  Text,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
} from 'react-native';

import { ExpoConfigView } from '@expo/samples';

export default class SettingScreen extends React.Component {
  
  static navigationOptions =({ navigation })=> {
    const { params = {} } = navigation.state;
    return {
      title: 'Setting',
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: '#FF5A5F', 
        elevation: null
      },
      headerRight:(
        <TouchableOpacity style={styles.headerRight} onPress={() => {params.Signout()}}>
          <Text style={styles.headerRightText}>Sign Out</Text>
        </TouchableOpacity>
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ Signout: this._signOutAsync });
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  headerRightText: {
    color: 'white',
    fontSize: 17,
  }
})