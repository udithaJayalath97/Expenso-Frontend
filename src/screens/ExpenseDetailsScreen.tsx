import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/auth'; // Adjust this import path as needed
import FooterMenu from '../components/FooterMenu';

type ExpenseDetailsRouteProp = RouteProp<RootStackParamList, 'ExpenseDetails'>;
type ExpenseDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExpenseDetails'>;

const ExpenseDetailsScreen: React.FC = () => {
  const route = useRoute<ExpenseDetailsRouteProp>();
  const navigation = useNavigation<ExpenseDetailsNavigationProp>();

  const { expense } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: expense.description });
  }, [navigation, expense.description]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Details</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{expense.description}</Text>

      <Text style={styles.label}>Amount:</Text>
      <Text style={styles.value}>{expense.amount}</Text>

      <Text style={styles.label}>Assigned Users:</Text>
      {expense.assignedUsers?.length ? (
        <FlatList
          data={expense.assignedUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text>{item.username} ({item.mobileNumber})</Text>
              <Text>Split Amount: {item.splitAmount}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No assigned users.</Text>
      )}
      <FooterMenu />
    </View>
  );
};

export default ExpenseDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  value: { fontSize: 16, marginBottom: 10 },
  userItem: {
    padding: 10,
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    marginBottom: 10,
  },
});
