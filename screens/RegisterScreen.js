import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import { WebBrowser } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUserData } from '../actions/authAction';

import Icon from 'react-native-vector-icons/FontAwesome';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      gender: null,
      password: null,
      confirmPassword: null,
    }
  }
  static navigationOptions = {
    title: 'Register',
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: '#FF5A5F', 
      elevation: null
    },
  };

  _isOnFocus = (input) => {
    this.setState({[`${input}Focused`]: true})
  }

  _isOnBlur = (input) => {
    this.setState({[`${input}Focused`]: false})
  }

  _handleTermsPress = () => {
    WebBrowser.openBrowserAsync('https://expo.io/terms');
  };

  _handlePolicyPress = () => {
    WebBrowser.openBrowserAsync('https://expo.io/privacy');
  };

  _handleRigsterPress = () => {
    if(this.state.password !== this.state.confirmPassword) {
      this.setState({password: null, confirmPassword: null});
      alert('Password Incorrect!');
    } else {
      this.props.registerUserData({
        username: this.state.username,
        email: this.state.email,
        gender: this.state.gender,
        password: this.state.password
      })
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.formContainer}>
          <View style={styles.genderContainer}>
            <TouchableOpacity style={[styles.genderSectionLeft, {borderColor: this.state.gender === 'male' ? '#FF5A5F' : 'grey', backgroundColor: this.state.gender === 'male' ? '#FF5A5F': 'white'}]} onPress={() => { this.setState({ gender: 'male' })}}>
              <Text style={[styles.genderText, {color: this.state.gender === 'male' ? 'white' : 'grey',  fontWeight: this.state.gender === 'male' ? 'bold' : 'normal'}]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.genderSectionRight, {borderColor: this.state.gender === 'female' ? '#FF5A5F' : 'grey', backgroundColor: this.state.gender === 'female' ? '#FF5A5F': 'white'}]} onPress={() => { this.setState({ gender: 'female' })}}>
              <Text style={[styles.genderText, {color: this.state.gender === 'female' ? 'white' : 'grey', fontWeight: this.state.gender === 'female' ? 'bold' : 'normal' }]}>Female</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.formSection, { borderColor: this.state.usernameFocused ? '#FF5A5F' : 'grey'}]}>
            <Icon style={styles.inputIcon} name="user" size={20} color={this.state.usernameFocused ? '#FF5A5F' : 'grey'} />
            <TextInput 
              name='username'
              returnKeyType='next' 
              value={this.state.username} 
              style={styles.formInput} 
              placeholder='Username' 
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              onFocus={() => this._isOnFocus('username')}
              onBlur={() => this._isOnBlur('username')}
              onSubmitEditing={() => this.emailInput.focus()}
              onChangeText={text => { this.setState({ username: text })}}/>
          </View>
          <View style={[styles.formSection, { borderColor: this.state.emailFocused ? '#FF5A5F' : 'grey'}]}>
            <Icon style={styles.inputIcon} name="envelope" size={20} color={this.state.emailFocused ? '#FF5A5F' : 'grey'} />
            <TextInput 
              name='email'
              returnKeyType='next' 
              value={this.state.email} 
              style={styles.formInput} 
              placeholder='Email' 
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              onFocus={() => this._isOnFocus('email')}
              onBlur={() => this._isOnBlur('email')}
              onSubmitEditing={() => this.passwordInput.focus()}
              ref={(input) => this.emailInput = input}
              onChangeText={text => { this.setState({ email: text })}}/>
          </View>
          <View style={[styles.formSection, { borderColor: this.state.passwordFocused ? '#FF5A5F' : 'grey'}]}>
            <Icon style={styles.inputIcon} name="lock" size={20} color={this.state.passwordFocused ? '#FF5A5F' : 'grey'} />
            <TextInput 
              name='password'
              returnKeyType='next'
              secureTextEntry 
              value={this.state.password} 
              style={styles.formInput} 
              placeholder='Password' 
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              onFocus={() => this._isOnFocus('password')}
              onBlur={() => this._isOnBlur('password')}
              onSubmitEditing={() => this.confirmPasswordInput.focus()}
              ref={(input) => this.passwordInput = input}
              onChangeText={text => { this.setState({ password: text })}}/>
          </View>
          <View style={[styles.formSection, { borderColor: this.state.confirmPasswordFocused ? '#FF5A5F' : 'grey'}]}>
            <Icon style={styles.inputIcon} name="lock" size={20} color={this.state.confirmPasswordFocused ? '#FF5A5F' : 'grey'} />
            <TextInput 
              name='confirmPassword'
              returnKeyType='go'
              secureTextEntry 
              value={this.state.confirmPassword} 
              style={styles.formInput} 
              placeholder='Confirm Password' 
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              onFocus={() => this._isOnFocus('confirmPassword')}
              onBlur={() => this._isOnBlur('confirmPassword')}
              ref={(input) => this.confirmPasswordInput = input}
              onChangeText={text => { this.setState({ confirmPassword: text })}}/>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.termsText}>By signing up, I agree to the PlacePass&nbsp;
            <Text onPress={this._handleTermsPress} style={styles.termsLink}>Terms of Service</Text> and <Text onPress={this._handlePolicyPress} style={styles.termsLink}>Privacy Policy</Text>.</Text>
          <TouchableOpacity style={styles.buttonSection} onPress={this._handleRigsterPress}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  formInput: {
    flex: 1,
    paddingHorizontal: 15,
    margin: 5,
    height: 50,
    color: 'grey',
  },
  inputIcon: {
     paddingLeft: 20,
  },
  termsText: {
    color: 'grey',
    marginTop: 30,
    marginBottom: 20,
  },
  termsLink: {
    color: '#FF5A5F',
  },
  buttonContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
  },
  buttonSection: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 20,
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
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  genderSectionLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    height: 50,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  genderSectionRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 50,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  genderText: {
    color: 'grey'
  }
})


const mapStateToProps = state => ({
  Auth: state.Auth,
})

const mapDispatchToProps = dispatch => ({
  registerUserData: bindActionCreators(registerUserData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)