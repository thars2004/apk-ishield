import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../AuthContext'; // Ensure correct path

const PinLockScreen = () => {
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState('');
  const navigation = useNavigation();
  const { user, fetchUser } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchUser(user.id).then(() => {
        // Debug log
        // console.log('Fetched user:', user);
        if (user.pin) {
          setStoredPin(user.pin);
        }
      }).catch(error => {
        alert('Error', 'Failed to fetch user data.');
        console.error('Error fetching user PIN:', error);
      });
    } else {
      alert('Error', 'User ID is missing.');
    }
  }, [user, fetchUser]);

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handlePinChange = (value) => {
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      if (pin === storedPin) {
        navigation.navigate('MainApp');
      } else {
        alert('Invalid PIN', 'The PIN you entered is incorrect.');
      }
    } else {
      alert('Enter a 4-digit PIN', 'Please enter a 4-digit PIN.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter PIN</Text>
      <TextInput
        style={styles.input}
        value={pin}
        secureTextEntry
        keyboardType='numeric'
        maxLength={4}
        editable={false}
        onChangeText={() => {}}
      />
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity key={num} style={styles.numberButton} onPress={() => handlePinChange(num.toString())}>
            <Text style={styles.numberText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
          <Icon name="backspace-outline" size={24} color="#1693B8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handlePinChange('0')}>
          <Text style={styles.numberText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleSubmit}>
          <Icon name="checkmark-circle-outline" size={24} color="#1693B8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D9EF',
  },
  title: {
    fontSize: width * 0.08,
    marginBottom: height * 0.03,
    color: '#000',
    fontFamily: 'Lora-Regular',
  },
  input: {
    width: width * 0.5,
    height: height * 0.07,
    fontSize: width * 0.06,
    borderBottomWidth: 1,
    textAlign: 'center',
    marginBottom: height * 0.03,
    color: '#000',
    fontFamily: 'Lora-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: width * 0.6,
    marginBottom: height * 0.02,
    backgroundColor: '#D5D9EF',
  },
  numberButton: {
    width: width * 0.18,
    height: width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.01,
    borderWidth: 0,
    backgroundColor: '#D5D9EF',
  },
  numberText: {
    fontSize: width * 0.06,
    color: '#000',
    fontFamily: 'Lora-Regular',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.6,
    marginBottom: height * 0.02,
  },
  iconButton: {
    width: width * 0.18,
    height: width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.01,
    borderWidth: 0,
    backgroundColor: '#D5D9EF',
  },
});

export default PinLockScreen;
