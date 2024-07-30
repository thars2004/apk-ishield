import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../AuthContext'; // Ensure correct path

const WeekTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activationDate, setActivationDate] = useState(null);
  
  const { user, fetchUser } = useAuth(); // Fetch user data from context

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        if (user?.id) {
          await fetchUser(user.id); // Fetch user data including activation_date
          // Check and set the activation date
          if (user?.activation_date) {
            setActivationDate(new Date(user.activation_date));
            // console.log(user.activation_date);
          } else {
            alert('Error', 'User activation date is missing.');
            return;
          }
        } else {
          alert('Error', 'User ID is missing.');
          return;
        }

        // Fetch weekly tasks
        const response = await fetch('http://localhost:3306/tasks/weekly');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Calculate days since activation
        const now = new Date();
        const daysSinceActivation = getDaysSince(new Date(user.activation_date), now);
        // console.log(daysSinceActivation);

        // Filter tasks based on daysSinceActivation
        const filteredTasks = data.filter(task => {
          const taskStartDay = task.start_day;
          const taskEndDay = task.end_day;

          return taskStartDay <= daysSinceActivation && taskEndDay >= daysSinceActivation;
        });

        setTasks(filteredTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTasks();
  }, [user, fetchUser]);

  const getDaysSince = (startDate, endDate) => {
    const timeDiff = endDate - startDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert time difference to days
  };

  const renderTaskIcon = (completed, iconName) => {
    const iconColor = completed ? '#009d2a' : '#DB4437';
    return <FontAwesome5 name={iconName} size={20} color={iconColor} style={styles.taskIcon} />;
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity style={styles.taskContainer}>
      <View style={styles.taskItem}>
        {renderTaskIcon(item.completed, item.icon)}
        <Text style={[styles.taskText, item.completed && { color: '#009d2a' }]}>
          {item.title} - {item.completed ? 'Completed' : 'Incomplete'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heading}>Weekly Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
        renderItem={renderTaskItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#D5D9EF',
  },
  outerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor:'#D5D9EF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  taskContainer: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#faf6f6',
    padding: 10,
    shadowColor: '#1c1c1c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  taskText: {
    fontSize: 18,
    color: '#ff0000',
    marginLeft: 10,
  },
  taskIcon: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WeekTask;
