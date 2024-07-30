import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Alert, AsyncStorage } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ProfileImage from '../assets/mycoin.jpeg';
import { useAuth } from '../AuthContext';

const TaskScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [myEarnings, setMyEarnings] = useState(0);
  const [lastCheckDate, setLastCheckDate] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    const fetchEarnings = async () => {
      const storedEarnings = await AsyncStorage.getItem('earnings');
      const storedDate = await AsyncStorage.getItem('lastCheckDate');
      if (storedEarnings) setMyEarnings(parseInt(storedEarnings, 10));
      if (storedDate) setLastCheckDate(new Date(storedDate));
    };

    const fetchCompletedTasks = async () => {
      const completedTasksString = await AsyncStorage.getItem('completedTasks');
      if (completedTasksString) {
        const completedTasksArray = JSON.parse(completedTasksString);
        setCompletedTasks(completedTasksArray);
      }
    };

    const fetchIncompleteTasks = async () => {
      const incompleteTasksString = await AsyncStorage.getItem('incompleteTasks');
      if (incompleteTasksString) {
        const incompleteTasksArray = JSON.parse(incompleteTasksString);
        setIncompleteTasks(incompleteTasksArray);
      }
    };

    fetchEarnings();
    fetchCompletedTasks();
    fetchIncompleteTasks();
  }, []);

  const handleDailyCheck = async () => {
    try {
      // Make a POST request to claim daily reward for the user
      const response = await fetch(`http://localhost:3306/daily-reward/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle non-successful responses
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}, Details: ${errorText}`);
      }

      // Parse response as JSON
      const result = await response.json();

      // Handle response from the server
      if (result.error) {
        alert('Daily Check', result.error || 'An error occurred while processing your daily check.');
      } else {
        alert('You have earned 1 rupees today!', `You have earned ${result.daily_amount} rupees today!`);
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error during daily check:', error);
      alert('Reward already claimed today.', `An unexpected error occurred: ${error.message}`);
    }
  };

  const handleWeekTask = () => {
    navigation.navigate('WeekTask', { completedTasks });
  };

  const handleMonthTask = () => {
    navigation.navigate('MonthTask', { completedTasks });
  };

  const handleTaskCompletion = async (taskName) => {
    const updatedCompletedTasks = [...completedTasks, taskName];
    setCompletedTasks(updatedCompletedTasks);
    await AsyncStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
    navigation.navigate('CompletedTasksScreen', { completedTasks: updatedCompletedTasks });
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUs');
  };

  const handleNeedHelp = () => {
    navigation.navigate('NeedHelp');
  };

  const handleViewCompletedTasks = () => {
    navigation.navigate('CompletedTasksScreen', { completedTasks });
  };

  const handleViewIncompleteTasks = () => {
    navigation.navigate('UncompletedTasksScreen', { incompleteTasks });
  };

  return (
    <Animated.ScrollView
      style={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    >
      <View style={styles.profileHeader}>
        <Image source={ProfileImage} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.walletContainer}>
        <Text style={styles.coinsText}>My Earnings: {user?.total_amount}</Text>
      </View>
      <View style={styles.horizontalButtons}>
        <TouchableOpacity style={styles.horizontalButton} onPress={handleDailyCheck}>
          <FontAwesome5 name="calendar-check" size={24} color="#1693B8" />
          <Text style={styles.horizontalButtonText}>Daily Check</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horizontalButton} onPress={handleWeekTask}>
          <FontAwesome5 name="tasks" size={24} color="#1693B8" />
          <Text style={styles.horizontalButtonText}>Week Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horizontalButton} onPress={handleMonthTask}>
          <FontAwesome5 name="tasks" size={24} color="#1693B8" />
          <Text style={styles.horizontalButtonText}>Month Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleViewCompletedTasks}>
          <FontAwesome5 name="check-circle" size={24} color="#1693B8" />
          <Text style={styles.actionButtonText}>Completed Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleViewIncompleteTasks}>
          <FontAwesome5 name="times-circle" size={24} color="#E94F4F" />
          <Text style={styles.actionButtonText}>Incomplete Tasks</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileDetails}>
        <TouchableOpacity style={styles.profileItem} onPress={handleNeedHelp}>
          <FontAwesome5 name="question-circle" size={24} color="#333" />
          <Text style={styles.profileItemText}>Need Help?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileItem} onPress={handleContactUs}>
          <FontAwesome5 name="phone" size={24} color="#333" />
          <Text style={styles.profileItemText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileItem} onPress={() => navigation.navigate('Tutorial')}>
          <FontAwesome5 name="chalkboard-teacher" size={24} color="#333" />
          <Text style={styles.profileItemText}>Tutorial</Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5D9EF',
    padding: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center', // Center profile header content horizontally
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center', // Center profile info content horizontally
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center', // Center text within profileName
  },
  profileEmail: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center', // Center text within profileEmail
  },
  walletContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  coinsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#02505A',
    textAlign: 'center', // Center text within coinsText
  },
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  horizontalButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  horizontalButtonText: {
    fontSize: 16,
    color: '#02505A',
    marginTop: 10,
    textAlign: 'center', // Center text within horizontalButtonText
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#02505A',
    marginTop: 10,
    textAlign: 'center', // Center text within actionButtonText
  },
  profileDetails: {
    marginTop: 20,
    width: '100%',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#02505A',
    textAlign: 'center', // Center text within profileItemText
  },
});

export default TaskScreen;
