import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/auth'; 
import { useRoute, useNavigation, RouteProp, useFocusEffect } from '@react-navigation/native';
import FooterMenu from '../components/FooterMenu';
import { useUser } from '../contexts/UserContext';
import Icon from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
type BudgetDetailsRouteProp = RouteProp<RootStackParamList, 'BudgetDetails'>;
type BudgetDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BudgetDetails'>;

const BudgetDetailsScreen: React.FC = () => {
  const { user, reloadUserContext } = useUser();
  const route = useRoute<BudgetDetailsRouteProp>();
  const navigation = useNavigation<BudgetDetailsNavigationProp>();
  const userId = user?.id;

   // Original budget passed via route param
   const { budget: initialBudget } = route.params;

   // State to hold fresh budget data from context
   const [budget, setBudget] = useState(initialBudget);

   const deleteBudget = async (budgetId: number) => {
      try {
        await axios.delete(`http://10.0.2.2:8080/api/delete/budget/${budgetId}`);
        return true;
      } catch (error) {
        console.error('Failed to delete budget:', error);
        return false;
      }
    };
 
   useFocusEffect(
    useCallback(() => {
      if (!user?.id) return;
      reloadUserContext(user.id); // Reload user context to get updated budget details
    }, [reloadUserContext, user?.id])
  );
 
   useEffect(() => {
     if (!user?.budgets) return;
 
     // Find the updated budget by id from user.budgets
     const updatedBudget = user.budgets.find(b => b.id === initialBudget.id);
     if (updatedBudget) {
       setBudget(updatedBudget);
     }
   }, [user?.budgets, initialBudget.id]);
  
  useLayoutEffect(() => {
    //navigation.setOptions({ title: budget.name });
    navigation.setOptions({
      title: budget.name,
      headerRight: () => (
      <View style={{ flexDirection: 'row', gap: 15, marginRight: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserContribution', { budget })}
        >
          <Icon name="user" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this budget?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async () => {
                    const success = await deleteBudget(budget.id);
                    if (success) {
                      
                      navigation.goBack();
                    } else {
                      Alert.alert('Error', 'Failed to delete budget.');
                    }
                  },
                },
              ]
            );
          }}
        >
          <Icon name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      ),
    });
  }, [navigation, budget.name]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Details</Text>
      <Text>Name: {budget.name}</Text>
      <Text>Total Amount: {budget.totalAmount ?? 'N/A'}</Text>
      <Text>Created By: {budget.createdBy.username}</Text>

      <Text style={styles.sectionTitle}>Expenses</Text>
      {budget.expenses.length === 0 ? (
        <Text>No expenses found.</Text>
      ) : (
        <FlatList
          data={budget.expenses}
          keyExtractor={item => item.expenseId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.expenseItem}
              onPress={() => navigation.navigate('ExpenseDetails', { expense: item })}
            >
              <Text>{item.description}</Text>
              <Text>Amount: {item.amount}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('AddExpense', { budget: budget})}
        activeOpacity={0.7}
      >
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>
      <FooterMenu />
    </View>
  );
};

export default BudgetDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { marginTop: 20, fontWeight: 'bold', fontSize: 18 },
  expenseItem: {
    padding: 12,
    backgroundColor: '#eef',
    borderRadius: 8,
    marginBottom: 10,
  },
  createButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  createButtonText: {
    fontSize: 32,
    color: '#fff',
    lineHeight: 32,
  },
  contributionButton: {
    marginRight: 10,
  },
  contributionButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});
