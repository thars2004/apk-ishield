// UpiPaymentAppsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const upiApps = [
  { id: '1', name: 'Google Pay', icon: 'google' },
  { id: '2', name: 'PhonePe', icon: 'phone' },
  { id: '3', name: 'Paytm', icon: 'money' },
  { id: '4', name: 'BHIM', icon: 'university' },
  { id: '5', name: 'Amazon Pay', icon: 'amazon' },
  { id: '6', name: 'Freecharge', icon: 'bolt' },
  { id: '7', name: 'Mobikwik', icon: 'credit-card' },
  { id: '8', name: 'Airtel Payments Bank', icon: 'mobile' },
  { id: '9', name: 'JioMoney', icon: 'signal' },
  { id: '10', name: 'Yono by SBI', icon: 'bank' },
];

const UpiPaymentAppsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.appItem}>
      <Icon name={item.icon} size={40} color="#007BFF" style={styles.appIcon} />
      <Text style={styles.appName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 10 UPI Payment Apps</Text>
      <FlatList
        data={upiApps}
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
    backgroundColor: '#D5D9EF',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContent: {
    width: '100%',
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appIcon: {
    marginRight: 15,
  },
  appName: {
    fontSize: 18,
    color: '#333',
  },
});

export default UpiPaymentAppsScreen;
