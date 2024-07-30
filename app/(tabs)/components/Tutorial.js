import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tutorial = () => {
  const navigation = useNavigation();

  const watchTutorial = (url) => {
    navigation.navigate('YouTube', { url });
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.task}>Task 1: React Native Intro</Text>
        <Button title="Watch Tutorial" onPress={() => watchTutorial('https://youtu.be/ur6I5m2nTvk?si=HBbICkk4TT_hzeOM')} />
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.task}>Task 2: React Native Setup</Text>
        <Button title="Watch Tutorial" onPress={() => watchTutorial('https://youtu.be/cCcvNAEpF-4?si=1fs4QXGS5Jmv_T0Z')} />
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.task}>Task 3: React Native Basics</Text>
        <Button title="Watch Tutorial" onPress={() => watchTutorial('https://youtu.be/npe3Wf4tpSg?si=FClzUiIddI1X9MEH')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'#D5D9EF',
  },
  taskContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  task: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
});

export default Tutorial;
