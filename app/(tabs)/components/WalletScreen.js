import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const WalletScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, fetchUser } = useAuth();
  // const { userDetails } = route.params || {}; // Get userDetails from route params

  // Default values
  const investmentAmount = user?.activation_plan ? 250 : 0;
  const dailyReward = user?.daily_amount || 0;
  const weeklyAmount = user?.weekly_amount || 0;
  const monthlyAmount = user?.monthly_amount || 0;
  const totalAmount = user?.total_amount || 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.earningContainer}>
        <Text style={styles.earningText}>Investment:</Text>
        <Text style={styles.amountText}>₹{investmentAmount}</Text>
      </View>
      <View style={styles.earningContainer}>
        <Text style={styles.earningText}>Daily Reward:</Text>
        <Text style={styles.amountText}>₹{dailyReward}</Text>
      </View>
      <View style={styles.earningContainer}>
        <Text style={styles.earningText}>Weekly Task Amount:</Text>
        <Text style={styles.amountText}>₹{weeklyAmount}</Text>
      </View>
      <View style={styles.earningContainer}>
        <Text style={styles.earningText}>Monthly Task Amount:</Text>
        <Text style={styles.amountText}>₹{monthlyAmount}</Text>
      </View>
      <View style={[styles.earningContainer, styles.totalContainer]}>
        <Text style={[styles.earningText, styles.totalText]}>Total Earnings:</Text>
        <Text style={[styles.amountText, styles.totalText]}>₹{totalAmount}</Text>
      </View>
      <TouchableOpacity
        style={styles.withdrawButton}
        onPress={() => navigation.navigate('Withdrawal')}
      >
        <Text style={styles.withdrawButtonText}>Withdraw</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: '#D5D9EF',
  },
  earningContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff', // light blue background
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainer: {
    backgroundColor: '#ffebee', // light red background
  },
  earningText: {
    fontSize: 18,
    color: 'black', // dark teal color
  },
  totalText: {
    color: '#f44336', // red color
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // dark teal color
    textAlign: 'right',
  },
  withdrawButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#002740', // deep orange background
    borderRadius: 8,
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletScreen;
