import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/auth'; // Adjust import path
import { useUser } from '../contexts/UserContext';

type AddExpenseRouteProp = RouteProp<RootStackParamList, 'AddExpense'>;
type AddExpenseNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;

const AddExpenseScreen: React.FC = () => {
  const route = useRoute<AddExpenseRouteProp>();
  const navigation = useNavigation<AddExpenseNavigationProp>();

  const { budget } = route.params; // Pass selected budget from previous screen
  const { user } = useUser();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Users to assign are the assignedUsers from the budget
  const allUsers = budget.assignedUsers || [];

  // Filter users by mobile number using search term
  const filteredUsers = allUsers.filter(user =>
    user.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleAddExpense = async () => {
    if (!description.trim() || !amount || selectedUserIds.length === 0) {
      Alert.alert('Error', 'Please fill all fields and select at least one user');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid positive amount');
      return;
    }


    const payload = {
      description: description.trim(),
      amount: parsedAmount,
      budgetId: budget.id,
      createdBy: user?.id,
      userIds: selectedUserIds,
    };

    try {
      const response = await fetch('http://10.0.2.2:8080/api/expense/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || 'Something went wrong');
      }

      Alert.alert('Success', responseText);
      navigation.navigate('BudgetDetails',{ budget: budget}); // go back after successful add
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  const renderUser = ({ item }: { item: typeof allUsers[0] }) => {
    const selected = selectedUserIds.includes(item.id);
    return (
      <TouchableOpacity
        key={item.id}
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add Expense</Text>

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* New Search Bar */}
        <TextInput
          style={styles.input}
          placeholder="Search users by mobile number"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <Text style={styles.subHeading}>Assign Users</Text>

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          extraData={selectedUserIds}
          scrollEnabled={false}
          style={{ marginBottom: 20 }}
          ListEmptyComponent={<Text>No users found matching your search.</Text>}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  userItem: {
    padding: 10,
    backgroundColor: '#eee',
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
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
