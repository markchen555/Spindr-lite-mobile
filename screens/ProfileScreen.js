import React from 'react';

import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity,
} from 'react-native';

export default class ProfileScreen extends React.Component {

  static navigationOptions =({navigation})=> ({
    title: 'Profile',
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: '#FF5A5F', 
      elevation: null
    },
    headerRight:(
      <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('Setting')}>
        <Text style={styles.headerRightText} >Setting</Text>
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <Text>Profile</Text>
      </View>
    );
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