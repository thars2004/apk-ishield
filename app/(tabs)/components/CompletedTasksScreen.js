import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const CompletedTasksScreen = () => {
  const completedTasks = [
    { name: 'Spin and Earn - Completed', icon: 'sync-alt' },
    { name: 'Task 1 - Completed', icon: 'tasks' },
    { name: 'Task 2 - Completed', icon: 'tasks' },
    { name: 'Flip the Card - Completed', icon: 'ticket-alt' },
  ];

  return (
    <View style={styles.container}>
      {completedTasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <View style={styles.taskItem}>
            <FontAwesome5 name={task.icon} size={20} color="#009d2a" style={styles.taskIcon} />
            <Text style={styles.taskText}>{task.name}</Text>
          </View>
        </View>
      ))}
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
    paddingVertical: 8, // Added padding around each task item
  },
  taskIcon: {
    marginRight: 10,
  },
  taskText: {
    fontSize: 18,
    color: '#32CD32',
    textDecorationLine: 'none', // Remove text decoration
  },
});

export default CompletedTasksScreen;
