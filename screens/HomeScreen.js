import React from 'react';
import { 
  View,
  StyleSheet, 
  StatusBar,
  TouchableWithoutFeedback,
  Image,
  ImageBackground
} from 'react-native';
// import { ExpoLinksView } from '@expo/samples';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: '#FF5A5F', 
      elevation: null
    },
  };

  _videoNavigate = () => {
    this.props.navigation.navigate('Video');
  }

  render() {
    return (
      <ImageBackground
      style={{width: '100%', height: '100%', position: 'absolute',  flex: 1, alignSelf: 'center',}}
      source={require('../assets/images/background.png')}
      >
        <View style={styles.container}>
          <StatusBar barStyle='light-content'/>
          <TouchableWithoutFeedback  onPress = {this._videoNavigate}>
            <Image
            style={styles.join}
            source={require('../assets/images/join.png')}
            />
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'transparent',
  },
  join: {
    width: 200, 
    height: 200,
  },
});
