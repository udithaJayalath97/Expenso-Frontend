import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';


const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide(); // Hide the splash screen when the app is ready
  }, []);

  return (
    <AppNavigator />
  );
};

export default App;