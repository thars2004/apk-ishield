import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../AuthContext';
import axios from 'axios'; // Ensure axios is installed

const ActivationPlanScreen = ({ navigation }) => {
  const { user, login } = useAuth();

  const handlePayment = async () => {
    try {
      // Simulate a dummy payment process
      const paymentSuccess = true; // Replace this with actual payment logic

      if (paymentSuccess) {
        // Update the activation status in your backend
        await axios.post(`http://localhost:3306/activate-account/${user.id}`);
        
        // After updating the activation status, update context or user state
        login(); // Re-fetch user or update context if necessary

        alert('Payment Successful', 'You have successfully paid for the activation plan.');

        // Navigate to the main app screen (home screen)
        navigation.navigate('Navi');
      } else {
        // Payment failed or was canceled
        alert('Payment Error', 'Payment was not successful. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment Error', 'There was an error processing your payment. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activation Plan</Text>
      <Text style={styles.description}>Please pay ₹250 to activate your account.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now with Google Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#50b458',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ActivationPlanScreen;
