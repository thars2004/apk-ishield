import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const UncompletedTasksScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.taskItem}>
          <FontAwesome5 name="coins" size={24} color="#ff0000" />
          <Text style={styles.taskText}>Coin Flip and Earn - Incomplete</Text>
        </View>
      </View>
      <View style={styles.taskContainer}>
        <View style={styles.taskItem}>
          <FontAwesome5 name="dice" size={24} color="#ff0000"  />
          <Text style={styles.taskText}>Drop the Dice - Incomplete</Text>
        </View>
      </View>
      <View style={styles.taskContainer}>
        <View style={styles.taskItem}>
          <FontAwesome5 name="ticket-alt" size={24} color="#ff0000"  />
          <Text style={styles.taskText}>Reveal the Scratch Card - Incomplete</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5D9EF',
    padding: 20,
  },
  taskContainer: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#faf6f6', // Updated background color of each task container
    padding: 10,
    shadowColor: '#1c1c1c', // Updated shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 3,
    height: 80, // Fixed height of each task container
    justifyContent: 'center', // Center align vertically
    alignItems: 'center', // Center align horizontally
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#FF0000', // Bright red color for incomplete tasks
  },
});

export default UncompletedTasksScreen;
