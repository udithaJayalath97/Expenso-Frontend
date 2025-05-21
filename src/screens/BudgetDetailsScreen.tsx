import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/auth'; 
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

type BudgetDetailsRouteProp = RouteProp<RootStackParamList, 'BudgetDetails'>;
type BudgetDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BudgetDetails'>;

const BudgetDetailsScreen : React.FC = () => {
  const route = useRoute<BudgetDetailsRouteProp>();
  const navigation = useNavigation<BudgetDetailsNavigationProp>();

  const { budget } = route.params;

  // Set screen title dynamically to budget name
  useLayoutEffect(() => {
    navigation.setOptions({ title: budget.name });
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
            <View style={styles.expenseItem}>
              <Text>{item.description}</Text>
              <Text>Amount: {item.amount}</Text>
            </View>
          )}
        />
      )}
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
});
