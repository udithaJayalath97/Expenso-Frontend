import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/auth'

const SignInScreen: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUser] = useState('');
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSignIn = async () => {
    try {
      const payload = {
        username: userName,
        password: password,
        mobileNumber: mobile,
      };
  
      const response = await fetch('http://10.0.2.2:8080/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const contentType = response.headers.get('content-type');

    let message;
    if (contentType && contentType.includes('application/json')) {
      const resData = await response.json();
      message = resData.message || 'Registered successfully';
    } else {
      message = await response.text(); // Plain text like 'User registered successfully'
    }

      Alert.alert('Success', message);
      navigation.navigate('Login'); // Navigate to Login screen after successful registration
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="default"
        value={userName}
        onChangeText={setUser}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: '#333',
    },
    input: {
      height: 50,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 20,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007BFF',
      paddingVertical: 14,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  

export default SignInScreen;
