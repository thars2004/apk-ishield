import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import TextInputField from '../components/TextInputField';
import { validateEmail, validateName, validatePassword } from '../components/validators';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const CreateaccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [pin, setPin] = useState(''); // Add state for PIN
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRePassword, setHideRePassword] = useState(true);

  const handleCreateAccount = () => {
    if (!email.trim() || !name.trim() || !phone.trim() || !empid.trim() || !password.trim() || !rePassword.trim() || !pin.trim()) {
      alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (!validateName(name)) {
      alert('Invalid Name', 'Name should contain only letters.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!/^\d+$/.test(phone) || phone.length !== 10) {
      alert('Invalid Phone Number', 'Phone number should be 10 digits and contain only digits.');
      return;
    }
    if (!validatePassword(password)) {
      alert('Invalid Password, Password must be at least 8 characters.', 'Password must be at least 8 characters.');
      return;
    }
    if (password !== rePassword) {
      alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      alert('Invalid PIN, PIN should be exactly 4 digits.', 'PIN should be exactly 4 digits.');
      return;
    }

    // Send POST request to server to create user
    axios.post('http://localhost:3306/users', {
      name,
      email,
      phone,
      empid,
      password,
      pin // Include PIN in request
    })
    .then(response => {
      alert('Account created successfully', 'You have successfully created a account.');
      navigation.navigate('Login');
    })
    .catch(error => {
      let errorMessage = 'Failed to create account.';

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

      alert('Error in create account', errorMessage);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.screen__background}>
        <View style={styles.screen__background__shape1}></View>
        <View style={styles.screen__background__shape2}></View>
        <View style={styles.screen__background__shape3}></View>
        <View style={styles.screen__background__shape4}></View>
      </View>
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
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"
        required
      />
      <TextInputField
        placeholder="Employee ID"
        value={empid}
        onChangeText={setEmpid}
        keyboardType="default"
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
      <TextInputField
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4} // Limit input to 4 digits
        required
      />
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By creating an account, you agree to our{' '}
          <Text style={styles.termsLink} onPress={() => navigation.navigate('Terms')}>
            Terms & Conditions
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Log In</Text>
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
    paddingBottom: 50, // Ensure there's space at the bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  createAccountButton: {
    width: '100%',
    padding: 12,
    backgroundColor: 'black',
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default CreateaccountScreen;
