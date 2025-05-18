import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FooterMenu from '../components/FooterMenu';
import { RootStackParamList } from '../types/auth'; // Adjust the import path as necessary

const HomeScreen = () => {
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Welcome.png')}  // Adjust the path according to your folder structure
        style={styles.image}
      />
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Budgets')}>
          <Text style={styles.buttonText}>Budgets</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>My Budgets</Text>
        </TouchableOpacity>
        
      </View>
      <FooterMenu />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#007bff',        // Black border color
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginVertical: 10,
    width: 220,
    alignItems: 'center',
    elevation: 2, // For subtle shadow on Android
  },
  buttonText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: 200, // You can adjust the width and height based on your image
    height: 200,
    marginBottom: 20,
  },
});
