import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileImage from '../assets/mycoin.jpeg'; // Ensure this path is correct
import { useAuth } from '../AuthContext';


const WithdrawalScreen = () => {
  const { user } = useAuth();
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const navigation = useNavigation();

  const handleWithdraw = () => {
    if (!accountNumber || !accountName || !ifscCode || !withdrawAmount) {
      alert('Error', 'All fields are required.');
      return;
    }

    console.log('Withdraw details:', { accountNumber, accountName, ifscCode, withdrawAmount });

    alert('Success', 'Withdrawal request submitted successfully.');

    navigation.goBack(); // Navigate back after withdrawal
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
      <Image source={ProfileImage} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Account Number:</Text>
        <TextInput
          style={styles.input}
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Account Name:</Text>
        <TextInput
          style={styles.input}
          value={accountName}
          onChangeText={setAccountName}
        />
        <Text style={styles.label}>IFSC Code:</Text>
        <TextInput
          style={styles.input}
          value={ifscCode}
          onChangeText={setIfscCode}
        />
        <Text style={styles.label}>Withdraw Amount:</Text>
        <TextInput
          style={styles.input}
          value={withdrawAmount}
          onChangeText={setWithdrawAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
          <Text style={styles.withdrawButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Wallet')}>
          <FontAwesome5 name="arrow-left" size={24} color="#02505A" />
          <Text style={styles.navButtonText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AnotherScreen')}>
          <FontAwesome5 name="info-circle" size={24} color="#02505A" />
          <Text style={styles.navButtonText}>More Info</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5D9EF',
    padding: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  withdrawButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#002740',
    borderRadius: 8,
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtonText: {
    fontSize: 16,
    color: '#02505A',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default WithdrawalScreen;
