import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddBudgetScreen = () => {
  const [budgetName, setBudgetName] = useState('');

  const handleCreateBudget = () => {
    if (budgetName.trim() === '') {
      Alert.alert('Validation', 'Please enter a budget name.');
      return;
    }
    // Add your budget creation logic here (API call, state update, etc.)
    fetch('http://10.0.2.2:8080/api/budget/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: budgetName }),
      })
      .then(response => response.json())
      .then(data => console.log(data));
    Alert.alert('Success', `Budget "${budgetName}" created!`);
    setBudgetName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Budget</Text>
      <TextInput
        style={styles.input}
        placeholder="Budget Name"
        value={budgetName}
        onChangeText={setBudgetName}
      />
      <Button title="Create Budget" onPress={handleCreateBudget} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default AddBudgetScreen;
