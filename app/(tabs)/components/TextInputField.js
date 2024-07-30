import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextInputField = ({ placeholder, value, onChangeText, secureTextEntry, rightIcon }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '100%'
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  icon: { 
    marginLeft: 10, // Added margin to create space between input and icon
  },
});

export default TextInputField;