import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FooterMenu from '../components/FooterMenu';
import { RootStackParamList } from '../types/auth'; 
import { useUser } from '../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Budget } from '../contexts/UserContext';

const HomeScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBudgets, setFilteredBudgets] = useState(user?.budgets || []);


useEffect(() => {
  if (!user?.budgets) return;

  const filtered = user.budgets.filter(budget =>
    budget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredBudgets(filtered);
}, [searchTerm, user?.budgets]);

// Header left: logo (replace with your logo image)
// Header right: menu icon, opens drawer or menu
const onMenuPress = () => {
  // navigation.toggleDrawer(); // if you use drawer navigation
};

const renderBudget = ({ item }: { item: Budget }) => (
  <TouchableOpacity
    style={styles.budgetCard}
    onPress={() => navigation.navigate('BudgetDetails', { budget: item })}
  >
  
    <Text style={styles.budgetTitle}>{item.name}</Text>
    <Text>Total Amount: {item.totalAmount ?? 'N/A'}</Text>
  
    <Text>Assigned Users:</Text>
    <View style={styles.assignedUsersContainer}>
      {item.assignedUsers.map(u => (
        <Text key={u.id} style={styles.assignedUser}>
          {u.username}
        </Text>
      ))}
    </View>
    
  
  </TouchableOpacity>
);

return (
  <View style={styles.container}>
    

    <TextInput
      placeholder="Search Budgets..."
      style={styles.searchBar}
      value={searchTerm}
      onChangeText={setSearchTerm}
    />

    <FlatList
      data={user?.budgets ?? []}
      keyExtractor={item => item.id.toString()}
      renderItem={renderBudget}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListEmptyComponent={<Text>No budgets found.</Text>}
    />
    <FooterMenu />
  </View>
);
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 15, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  logo: {
    width: 120,
    height: 40,
  },
  menuButton: {
    padding: 8,
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  budgetCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  budgetTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  assignedUsersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  assignedUser: {
    backgroundColor: '#ddd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 14,
  },
  expenseItem: {
    backgroundColor: '#eef',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
});

