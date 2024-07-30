import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import TextInputField from '../components/TextInputField';
import { validateEmail, validateName, validatePassword } from '../components/validators';
import Icon from 'react-native-vector-icons/FontAwesome';
import EyeIcon from 'react-native-vector-icons/Ionicons';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRePassword, setHideRePassword] = useState(true);

  const handleEmailSignUp = () => {
    if (!email && !name && !password && !rePassword) {
      alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
   if (!validateName(name)) {
      alert('Invalid Name', 'Name should contain only letters.');
      return;
    }
     if (!email) {
      alert('Missing Fields', 'Please fill email fields.');
      return;
    }
   if (!validateEmail(email)) {
      alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
     if (!name) {
      alert('Missing Fields', 'Please fill name fields.');
      return;
    }
     if ( !password) {
      alert('Missing Fields', 'Please fill password fields.');
      return;
    }
    if (!validatePassword(password)) {
      alert('Invalid Password','Password must contains 8 charectors.')
    }
     if (!rePassword) {
      alert('Missing Fields', 'Please fill repassword fields.');
      return;
    }
   if (password !== rePassword) {
      alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    

    // Perform signup logic here (Firebase integration)

    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Password:', password);
    alert('Sign Up Completed', 'You have successfully signed up.');

    // Redirect to login page after signup
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInputField
        placeholder="Name"
        value={name}
        onChangeText={setName}
        required
      />
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        required
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
        required
      />
      <TextInputField
        placeholder="Re-enter Password"
        value={rePassword}
        onChangeText={setRePassword}
        secureTextEntry={hideRePassword}
        rightIcon={
          <TouchableOpacity onPress={() => setHideRePassword(!hideRePassword)}>
            <EyeIcon name={hideRePassword ? 'eye-off' : 'eye'} size={20} />
          </TouchableOpacity>
        }
        required
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleEmailSignUp}>
        <Text style={styles.signupButtonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By creating an account, you agree to our{' '}
          <Text style={styles.termsLink} onPress={() => navigation.navigate('Terms')}>
            Terms & Conditions
          </Text>
        </Text>
      </View>
      <Text style={styles.or}>OR</Text>
      <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
        <Icon name="google" size={20} color="#4285F4" style={styles.icon} />
        <Text style={styles.socialButtonText}>Sign Up with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.socialButton, styles.facebookButton]}
        onPress={() => {}}>
        <Icon name="facebook" size={20} color="#3b5998" style={styles.icon} />
        <Text style={[styles.socialButtonText, styles.facebookButtonText]}>
          Sign Up with Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
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
  signupButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#002740', // light green color
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  socialButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#002740', // white color
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#4285F4',
    borderWidth: 1,
    marginBottom: 16,
  },
  facebookButton: {
    borderColor: '#4285F4',
  },
  socialButtonText: {
    color: '#4285F4', // Google blue color
    fontSize: 16,
    marginLeft: 10,
  },
  facebookButtonText: {
    color: '#4285F4', // Facebook blue text color
  },
  icon: {
    marginRight: 10,
    color: '#4285F4',
  },
  termsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  termsLink: {
    color: '#4285F4',
    textDecorationLine: 'underline',
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#4285F4',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
