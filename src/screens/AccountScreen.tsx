import React, {useState} from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import FooterMenu from '../components/FooterMenu';
import { useUser, Budget, UserData } from '../contexts/UserContext';

const AccountScreen = () => {
  const { user } = useUser();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!user) {
    return <Text>Loading user data...</Text>;
  }

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    // Call backend API to change password here
    // Example:
    // changePasswordApi({ currentPassword, newPassword })
    //   .then(() => Alert.alert('Success', 'Password changed successfully'))
    //   .catch(err => Alert.alert('Error', err.message));

    Alert.alert('Info', 'Password change feature not implemented yet.');
  };

  const renderBudget = ({ item }: { item: Budget }) => (
    <View style={styles.budgetItem}>
      <Text style={styles.budgetName}>{item.name}</Text>
      <Text>Total Amount: {item.totalAmount ?? 'N/A'}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
      {/* User info */}
      <View style={styles.userInfo}>
        <Image
          source={
            // Replace with user.photoUrl if available
            require('../../assets/Welcome.png')
          }
          style={styles.userPhoto}
        />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      {/* Budgets */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Budgets</Text>
        {user.budgets.length === 0 ? (
          <Text>You have no budgets.</Text>
        ) : (
          <FlatList
            data={user.budgets}
            keyExtractor={item => item.id.toString()}
            renderItem={renderBudget}
            scrollEnabled={false} // disable scrolling inside ScrollView
          />
        )}
      </View>

      
    </ScrollView>

    <FooterMenu />
    </View>
    
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  userInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  budgetItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  budgetName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});