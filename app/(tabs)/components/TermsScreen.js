import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TermsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>
      <Text style={styles.content}>
        Insert your terms and conditions text here. You can format it as needed.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#D5D9EF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default TermsScreen;
