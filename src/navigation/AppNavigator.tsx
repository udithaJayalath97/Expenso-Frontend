import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ActivityScreen from '../screens/ActivityScreen';
import AccountScreen from '../screens/AccountScreen';
import AddBudgetScreen from '../screens/AddBudgetScreen';
import BudgetDetailsScreen from '../screens/BudgetDetailsScreen'



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="AddBudgets" component={AddBudgetScreen} />
        <Stack.Screen name="BudgetDetails" component={BudgetDetailsScreen} />
        
        
    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
