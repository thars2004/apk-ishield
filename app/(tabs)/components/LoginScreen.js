import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { useAuth } from '../AuthContext';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import TextInputField from '../components/TextInputField';
import Icon from 'react-native-vector-icons/FontAwesome';
import { validateEmail } from '../components/validators';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3306/login', {
        email,
        password,
      });

      console.log('Login Response:', response.data);

      if (response.data.success) {
        login(response.data.user); // Pass the user data to the login function
        navigation.navigate('PinLockScreen');
      } else {
        alert('Login Failed', 'Incorrect email or password.');
      }
    } catch (error) {
      let errorMessage = 'Failed to log in.';

      if (error.response) {
        const { data } = error.response;
        if (data.error) {
          errorMessage = data.error;
        } else if (data.details) {
          errorMessage = data.details;
        }
      } else {
        errorMessage = error.message;
      }

      console.error('Error in login:', error);
      alert('Error in Login', errorMessage);
      console.log('Error in Login', errorMessage);
    }
  };

  const handleCreateaccount = () => {
    navigation.navigate('Createaccount');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.screen__background}>
        <View style={styles.screen__background__shape1}></View>
        <View style={styles.screen__background__shape2}></View>
        <View style={styles.screen__background__shape3}></View>
        <View style={styles.screen__background__shape4}></View>
      </View>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        rightIcon={
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <EyeIcon name={hidePassword ? 'eye-off' : 'eye'} size={20} />
          </TouchableOpacity>
        }
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
        <Icon name="google" size={20} color="#DB4437" style={styles.icon} />
        <Text style={styles.socialButtonText}>Sign Up with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]} onPress={() => {}}>
        <Icon name="facebook" size={20} color="#3B5998" style={styles.icon} />
        <Text style={[styles.socialButtonText, styles.facebookButtonText]}>
          Sign Up with Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.CreateaccountLink} onPress={handleCreateaccount}>
        <Text style={styles.CreateaccountText}>Don't have an account? Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen__background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  screen__background__shape1: {
    position: 'absolute',
    height: 520,
    width: 520,
    backgroundColor: '#D5D9EF',
    top: -50,
    right: 120,
    borderRadius: 72,
    transform: [{ rotate: '45deg' }],
  },
  screen__background__shape2: {
    position: 'absolute',
    height: 220,
    width: 220,
    backgroundColor: '#395886',
    top: -172,
    right: 0,
    borderRadius: 32,
    transform: [{ rotate: '45deg' }],
  },
  screen__background__shape3: {
    position: 'absolute',
    height: 540,
    width: 190,
    backgroundColor: '#8AAEE0',
    top: -24,
    right: 0,
    borderRadius: 32,
    transform: [{ rotate: '45deg' }],
  },
  screen__background__shape4: {
    position: 'absolute',
    height: 400,
    width: 200,
    backgroundColor: '#B1C9EF',
    top: 420,
    right: 50,
    borderRadius: 60,
    transform: [{ rotate: '45deg' }],
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  or: {
    marginVertical: 16,
    fontSize: 16,
    color: '#888',
  },
  socialButton: {
    width: '100%',
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
  },
  facebookButton: {
    borderColor: 'black',
  },
  socialButtonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
  },
  facebookButtonText: {
    color: 'black',
  },
  icon: {
    marginRight: 10,
    color: 'black',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: 'black',
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  CreateaccountLink: {
    marginTop: 20,
  },
  CreateaccountText: {
    color: '#4285F4',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
