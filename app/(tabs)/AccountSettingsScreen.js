import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Lora_400Regular, Lora_700Bold } from '@expo-google-fonts/lora';
import AppLoading from 'expo-app-loading';

const AccountSettingsScreen = () => {
  const [username, setUsername] = useState('Harini');
  const [email, setEmail] = useState('harin@gmail.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigation = useNavigation();

  const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

  let [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <LinearGradient
      colors={['#0e256b','#798fd2','#B3BFE5']}
      style={styles.container}
    >
      <Text style={styles.title}>Account Settings</Text>
      
      <View style={styles.setting}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={notificationsEnabled}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#0c2d91' }]}
        onPress={() => navigation.navigate('ChangePassword')}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FOF3FA', // Background color for the entire screen
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Lora_700Bold',
  },
  setting: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    fontFamily: 'Lora_700Bold',
  },
  input: {
    backgroundColor: '#eaecf1',
    padding: 10,
    borderRadius: 5,
    borderColor: '#11245d',
    borderWidth: 1,
    fontFamily: 'Lora_400Regular',
  },
  button: {
    backgroundColor: '#001a67', // Default button background color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lora_700Bold',
  },
});

export default AccountSettingsScreen;
