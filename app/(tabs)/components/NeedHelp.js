import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const NeedHelp = () => {
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !issue.trim()) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    // Mock function to simulate API request
    const requestHelp = (name, issue) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('Help request submitted successfully.');
          } else {
            reject('Failed to submit help request. Please try again.');
          }
        }, 1000);
      });
    };

    requestHelp(name, issue)
      .then(response => {
        Alert.alert('Success', response);
        setName('');
        setIssue('');
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Need Help?</Text>
        <Text style={styles.description}>
          Describe your issue below and we'll assist you as soon as possible.
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your issue"
            multiline
            numberOfLines={5}
            value={issue}
            onChangeText={text => setIssue(text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <FontAwesome5 name="paper-plane" size={24} color="#fff" />
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor:'#D5D9EF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002740',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default NeedHelp;
