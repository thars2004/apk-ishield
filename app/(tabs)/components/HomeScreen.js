import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming FontAwesome5 for icons
import ProfileImage from '../assets/mycoin.jpeg'; // Replace with your profile image path
import { useAuth } from '../AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth(); // Get user data from AuthContext

  const handleDailyCheck = async () => {
    try {
      const response = await fetch(`http://localhost:3306/daily-reward/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}, Details: ${errorText}`);
      }

      const result = await response.json();

      if (result.error) {
        alert('Daily Check', result.error || 'An error occurred while processing your daily check.');
      } else {
        alert('You have earned 1 rupees today!', `You have earned ${result.daily_amount} rupees today!`);
      }
    } catch (error) {
      console.error('Error during daily check:', error);
      alert('Reward already claimed today.', `An unexpected error occurred: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={ProfileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>{user?.name}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
      </View>
      <View style={styles.walletContainer}>
        <Text style={styles.coinsText}>Total Amount: {user?.total_amount}</Text>
      </View>
      <View style={styles.profileDetails}>
        <TouchableOpacity style={styles.profileItem} onPress={handleDailyCheck}>
          <FontAwesome5 name="calendar-check" size={24} color="#1693B8" />
          <Text style={styles.profileItemText}>Daily Check</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5D9EF',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  walletContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coinsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  profileDetails: {
    marginTop: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileItemText: {
    marginLeft: 16,
    fontSize: 18,
    color: '#333',
  },
});

export default HomeScreen;
