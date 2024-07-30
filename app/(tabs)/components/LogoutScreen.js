import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, BackHandler } from 'react-native';
import { useAuth } from '../AuthContext'; // Assuming your AuthContext provides a logout function
import { useIsFocused } from '@react-navigation/native';

const LogoutScreen = ({ navigation }) => {
  const { logout } = useAuth(); // Accessing logout function from context
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  // useIsFocused hook to determine if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true); // Show modal when the screen is focused
    }
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        setModalVisible(false); // Hide modal if the back button is pressed
        navigation.goBack(); // Go back to the previous screen
        return true; // Prevent default back action
      }
      return false; // Allow default back action if modal is not visible
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Cleanup listener on unmount
  }, [modalVisible, navigation]);

  const handleLogout = () => {
    logout(); // Call the logout function
    setModalVisible(false); // Hide the modal
    navigation.navigate('Login'); // Navigate to login screen
  };

  const handleCancel = () => {
    setModalVisible(false); // Hide the modal
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false); // Hide the modal if user presses the back button
        navigation.goBack(); // Go back to the previous screen
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Oh No! You Are Leaving.... Are You Sure?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#002740', // Dark color for logout button
    borderRadius: 8,
    marginBottom: 10, // Space between buttons
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#6C757D', // Gray color for cancel button
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LogoutScreen;
