import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  StyleSheet, 
  StatusBar, 
  Animated, 
  Easing, 
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
//import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
//import AWS, { Config, CognitoIdentityCredentials } from 'aws-sdk';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signInUserData } from '../actions/authAction';
import Loading from '../screens/LoadingScreen';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {
      isReady: false,
      username: null,
      email: null,
      password: null,
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.spinLogo();
    //this.props.actions.fbLogin();
  }

  successfulLogin = () => {
    this.setState({isReady: true})
  }

  spinLogo() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => this.spinLogo())
  }

  _isOnFocus = (input) => {
    this.setState({[`${input}Focused`]: true})
  }

  _isOnBlur = (input) => {
    this.setState({[`${input}Focused`]: false})
  }

  _signInAsync = async () => {
    if((this.state.username || this.state.email) && this.state.password) {
      console.log('user pass')
      if(this.state.username){
        await this.props.signInUserData({username: this.state.username, password: this.state.password})
        await AsyncStorage.setItem('userToken', this.state.username);
        this.props.navigation.navigate('Main');
      }
      if(this.state.email) {
        await this.props.signInUserData({email: this.state.email, password: this.state.password})    
        await AsyncStorage.setItem('userToken', this.state.email);   
        this.props.navigation.navigate('Main'); 
      }
    } else {
      alert('Please enter a valid username or email and password!')
    }
  };

  _register = () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    const spinLogo = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    if(this.props.Auth.userName === '') {
      return (<Loading />)
    } 
      return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <StatusBar
          barStyle='light-content'/>
          <View style={styles.logoContainer}>
            <Animated.Image
            style={{
            width: 110,
            height: 110,
            transform: [{rotate: spinLogo}] }}
            source={require('../assets/images/login-logo.png')} />
            <Text style={styles.logoTitle}>Get Started</Text>
            <Text style={styles.logoInfo}>Please log in with your username and password.</Text>
          </View>
          <View style={styles.formContainer}>
              <View style={styles.formSection}>
                <TextInput 
                name='username'
                returnKeyType='next' 
                value={this.state.username} 
                style={[styles.loginInput, { borderBottomColor: this.state.usernameFocused ? '#FF5A5F' : 'grey'}]} 
                placeholder='Username or Email' 
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                onFocus={() => this._isOnFocus('username')}
                onBlur={() => this._isOnBlur('username')}
                onSubmitEditing={() => this.passwordInput.focus()}
                onChangeText={text => { this.setState({ username: text })}}/>
                <TextInput 
                name="password" 
                returnKeyType='go' 
                secureTextEntry 
                value={this.state.password} 
                style={[styles.loginInput, { borderBottomColor: this.state.passwordFocused ? '#FF5A5F' : 'grey'}]} 
                placeholder='Password' 
                onFocus={() => this._isOnFocus('password')}
                onBlur={()=> this._isOnBlur('password')}
                ref={(input) => this.passwordInput = input}
                onChangeText={text => { this.setState({ password: text })}}/>
                <Text style={styles.forgetText}>Forget your password?</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={this._signInAsync}>
                  <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={styles.registerText}>Don't have an account?&nbsp;
                    <Text onPress={this._register} style={styles.registerLink}>Register</Text>
                </Text>
              </View>
          </View>
          {/* <LoginButton 
            style={styles.loginBtn}
            readPermissions={["email", "public_profile"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("Login failed with error: " + error.message);
                } else if (result.isCancelled) {
                  console.log("Login was cancelled"); 
                } else {
                  this.props.actions.fbLogin();
                  console.log("Login was successful with permissions: " + result.grantedPermissions)
                }
              }
            }
            onLogoutFinished={
              (error, result) => {
                if (error) {
                  console.log("Logout failed with error: " + error.message);
                } else {
                  this.props.actions.logout();
                }
              }
            }/> */}
        </KeyboardAvoidingView>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: 30,
  },
  logoTitle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#4A4A4A',
    opacity: 0.9,
  },
  logoInfo: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    color: '#888888',
    width: 250,
    opacity: 0.8,
  },
  formContainer: {
    flexGrow: 1,
    marginTop: 30,
  },
  formSection: {
    padding: 20,
  },
  loginTitle: {
    alignItems: 'center',
  },
  loginInput: {
    height: 50,
    borderBottomWidth: 1, 
    marginBottom: 10,
    color: 'grey',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 15,
    borderBottomLeftRadius: 5,
	  borderBottomRightRadius: 5,
	  borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 0, width: 0 },
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  forgetText: {
    textAlign: 'right',
    marginBottom: 40,
    color: '#FF5A5F',
  },
  registerText: {
    marginTop: 30,
    marginBottom: 10,
  },
  registerLink: {
    color: '#FF5A5F',
    fontWeight: 'bold',
  }
});

const mapStateToProps = state => ({
  Auth: state.Auth,
})

const mapDispatchToProps = dispatch => ({
  signInUserData: bindActionCreators(signInUserData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);