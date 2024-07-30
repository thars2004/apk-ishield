// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext'; // Adjust path as needed

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        {user.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <Ionicons name="person-circle" size={100} color="#007BFF" />
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>Name:</Text>
          <Text style={styles.tableText}>{user.name}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>Email:</Text>
          <Text style={styles.tableText}>{user.email}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>Phone:</Text>
          <Text style={styles.tableText}>{user.phone}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>Bank ID:</Text>
          <Text style={styles.tableText}>{user.bank_acc_no}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>IFSC:</Text>
          <Text style={styles.tableText}>{user.ifsc_code}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>Account Balance:</Text>
          <Text style={styles.tableText}>{user.total_amount}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>Referral Code:</Text>
          <Text style={styles.tableText}>{user.empid}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>KYC Status:</Text>
          <Text style={styles.tableText}>{user.kycStatus}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitle}>District:</Text>
          <Text style={styles.tableText}>{user.district}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('ProfileEdit')}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('TransactionHistory')}>
          <Text style={styles.buttonText}>View Transaction History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('AccountSettings')}>
          <Text style={styles.buttonText}>Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.customButton, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D9EF',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tableText: {
    fontSize: 18,
    color: '#555',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  customButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#002740',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
