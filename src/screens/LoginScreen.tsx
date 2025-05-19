import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/auth';
import { useUser, UserData } from '../contexts/UserContext';

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  
  const handleLogin = async () => {
    try {
    
      const res = await fetch('http://10.0.2.2:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, password }),
      });
  
      if (!res.ok) {
        // Response not OK - get error text and show alert
        const errorText = await res.text();
        Alert.alert('Login Failed', errorText);
        return;
      }

      // Try parse JSON user data
      const data: UserData = await res.json();

      // Save user data to context
      setUser(data);

      Alert.alert('Login Successful', `Welcome, ${data.username}!`);

      // Navigate to home or dashboard screen
      navigation.navigate('Home');
    } catch (err: any) {
      Alert.alert('Login Error', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  signUpText: { marginTop: 20, textAlign: 'center', color: '#007bff' },
});
