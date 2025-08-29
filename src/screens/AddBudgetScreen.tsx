import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useUser } from '../contexts/UserContext';

const AddBudgetScreen = ({ navigation }: any) => {
  const { user } = useUser();
  const [budgetName, setBudgetName] = useState('');
  const [userIds, setUserIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://10.0.2.2:8080/api/users')
      .then(res => res.json())
      .then(data => {
        setAllUsers(data);
        setFilteredUsers(data);
      })
      .catch(err => {
        console.log('Error fetching users:', err);
        setAllUsers([]);
      });
  }, []);

  useEffect(() => {
    if (!Array.isArray(allUsers)) return;

    const filtered = allUsers.filter(user =>
      user.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]);

  const toggleUserSelection = (userId: number) => {
    setUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleAddBudget = async () => {
    if (!budgetName || userIds.length === 0) {
      Alert.alert('Error', 'Please enter budget name and select users');
      return;
    }

    const payload = {
      name: budgetName,
      userId: user?.id,
      userIds,
    };

    try {
      const response = await fetch('http://10.0.2.2:8080/api/budget/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || 'Something went wrong');
      }

      Alert.alert('Success', responseText);
      navigation.navigate('Home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Something went wrong');
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  const renderUser = ({ item }: { item: any }) => {
    const selected = userIds.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.userItem, selected && styles.userItemSelected]}
        onPress={() => toggleUserSelection(item.id)}
      >
        <Text style={selected ? styles.userTextSelected : styles.userText}>
          {item.username} ({item.mobileNumber})
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Budget</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Budget Name"
        value={budgetName}
        onChangeText={setBudgetName}
      />

      <TextInput
        style={styles.input}
        placeholder="Search by mobile number"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <Text style={styles.subHeading}>Select Users</Text>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUser}
        ListEmptyComponent={<Text>No users found</Text>}
        style={styles.userList}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddBudget}>
        <Text style={styles.buttonText}>Add Budget</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBudgetScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subHeading: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  userItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  userItemSelected: {
    backgroundColor: '#007bff',
  },
  userText: {
    fontSize: 16,
  },
  userTextSelected: {
    fontSize: 16,
    color: '#fff',
  },
  userList: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
