import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import EyeIcon from 'react-native-vector-icons/Ionicons';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Error', 'All fields are required.');
      return;
    }
    if (currentPassword === newPassword) {
      alert('Error', 'New password cannot be the same as the current password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Error', 'New password and confirm password do not match.');
      return;
    }

    // Perform password change logic here

    alert('Success', 'Password changed successfully.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={hideCurrentPassword}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity onPress={() => setHideCurrentPassword(!hideCurrentPassword)}>
          <EyeIcon name={hideCurrentPassword ? 'eye-off' : 'eye'} size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={hideNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setHideNewPassword(!hideNewPassword)}>
          <EyeIcon name={hideNewPassword ? 'eye-off' : 'eye'} size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={hideConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
          <EyeIcon name={hideConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor:'#D5D9EF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#002740' ,// light green color
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
