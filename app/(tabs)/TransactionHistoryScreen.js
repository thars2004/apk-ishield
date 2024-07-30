import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TransactionHistoryScreen = () => {
  const navigation = useNavigation();

  const transactions = [
    { id: '1', date: '2024-07-01', description: 'Completed Task: Survey', amount: '+₹50', status: 'Completed' },
    { id: '2', date: '2024-07-02', description: 'Completed Task: App Review', amount: '+₹100', status: 'Completed' },
    { id: '3', date: '2024-07-03', description: 'Completed Task: Video Ad', amount: '+₹30', status: 'Completed' },
    { id: '4', date: '2024-07-04', description: 'Spent on: In-App Purchase', amount: '-₹250', status: 'Spent' },
    { id: '5', date: '2024-07-05', description: 'Completed Task: Sign-up Bonus', amount: '+₹90', status: 'Completed' },
    { id: '6', date: '2024-07-06', description: 'Withdrawn: Cash', amount: '-₹50', status: 'Withdrawn' },
  ];

  const calculateTotalBalance = () => {
    let balance = 0;
    transactions.forEach(transaction => {
      const amount = parseInt(transaction.amount.replace(/[^\d.-]/g, ''));
      balance += transaction.amount.startsWith('+') ? amount : -amount;
    });
    return balance;
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={[
          styles.transactionAmount,
          { color: item.amount.startsWith('+') ? 'green' : 'red' }
        ]}>{item.amount}</Text>
      </View>
      <Text style={[
        styles.transactionStatus,
        { backgroundColor: getStatusColor(item.status) }
      ]}>{item.status}</Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#8BC34A'; // Green
      case 'Spent':
        return '#FF9800'; // Orange
      case 'Withdrawn':
        return '#F44336'; // Red
      default:
        return '#ccc'; // Grey
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.withdrawButton, styles.withdrawButtonContainer]} 
        onPress={() => navigation.navigate('UpiPaymentApps')}
      >
        <Text style={styles.withdrawButtonText}>Withdraw Money</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Transaction History</Text>
      <Text style={styles.balance}>Total Balance: ₹{calculateTotalBalance()}</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Background color for the entire screen
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  listContent: {
    width: '100%',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Background color for each transaction item
    marginBottom: 10,
    elevation: 2,
  },
  transactionDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  transactionDate: {
    fontSize: 16,
    color: '#555',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  transactionAmount: {
    fontSize: 16,
    marginTop: 5,
  },
  transactionStatus: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    minWidth: 80,
  },
  withdrawButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  withdrawButtonContainer: {
    backgroundColor: '#6A0DAD', // Purple color
  },
});

export default TransactionHistoryScreen;
