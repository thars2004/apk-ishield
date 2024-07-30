import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import TaskScreen from './components/TaskScreen';
import WalletScreen from './components/WalletScreen';
import WithdrawalScreen from './components/WithdrawalScreen';
import ProfileScreen from './components/ProfileScreen';
import ProfileEditScreen from './components/ProfileEditScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';
import LogoutScreen from './components/LogoutScreen';
import LoginScreen from './components/LoginScreen';
import PinLockScreen from './components/PinLockScreen'; 
import CreateaccountScreen from './components/CreateaccountScreen';
import WeekTask from './components/WeekTask';
import MonthTask from './components/MonthTask';
import CompletedTasksScreen from './components/CompletedTasksScreen';
import UncompletedTasksScreen from './components/UncompletedTasksScreen';
import ContactUs from './components/ContactUs';
import NeedHelp from './components/NeedHelp';
import Tutorial from './components/Tutorial';
import { AuthProvider, useAuth } from './AuthContext';
import TransactionHistoryScreen from './TransactionHistoryScreen';
import AccountSettingsScreen from './AccountSettingsScreen';
import HelpSupportScreen from './HelpSupportScreen';
import ActivationPlanScreen from './components/ActivationPlanScreen';
import UpiPaymentAppsScreen from './components/UpiPaymentAppsScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const WalletStack = createNativeStackNavigator();

// const WalletStackScreen = () => {
//   return(
//   <WalletStack.Navigator>
//     <WalletStack.Screen
//       name="Wallet"
//       component={WalletScreen}
//       options={{ headerShown: false }} // Hide the header
//     />
//     <WalletStack.Screen
//       name="Withdrawal"
//       component={WithdrawalScreen}
//     />
//   </WalletStack.Navigator>
  
// )};

const IShield = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Task') {
            iconName = 'checkmark-done';
          } else if (route.name === 'Wallet') {
            iconName = 'wallet';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
         headerShown: false 
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Task" component={TaskScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Createaccount" component={CreateaccountScreen} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="IShield">
      <Drawer.Screen name="IShield" component={IShield} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Task" component={TaskScreen} />
      <Drawer.Screen name="Wallet" component={WalletScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Change Password" component={ChangePasswordScreen} />
      <Drawer.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Drawer.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Drawer.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const { isLoggedIn, user } = useAuth(); // Ensure `user` is provided by AuthContext

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
          </>
        ) : !user?.activation_plan ? (
          <>
              <Stack.Screen name="PinLockScreen" component={PinLockScreen} options={{ headerShown: false }} />
              <Stack.Screen name="MainApp" component={ActivationPlanScreen} options={{ headerShown: false }} />
              {/* The MainApp and HomeScreen should be pushed after activation */}
              <Stack.Screen name="Navi" component={DrawerNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            </>
        ) : (
          <>
            <Stack.Screen name="PinLockScreen" component={PinLockScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          </>
        )}
        <Stack.Screen name="WeekTask" component={WeekTask} />
        <Stack.Screen name="MonthTask" component={MonthTask} />
        <Stack.Screen name="CompletedTasksScreen" component={CompletedTasksScreen} />
        <Stack.Screen name="UncompletedTasksScreen" component={UncompletedTasksScreen} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="NeedHelp" component={NeedHelp} />
        <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
