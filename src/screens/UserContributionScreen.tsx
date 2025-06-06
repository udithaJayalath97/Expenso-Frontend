import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/auth';
import FooterMenu from '../components/FooterMenu';
import { AssignedUser, Expense } from '../contexts/UserContext';


type UserContributionRouteProp = RouteProp<RootStackParamList, 'UserContribution'>;
type UserContributionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserContribution'>;

const UserContributionScreen: React.FC = () => {
  const route = useRoute<UserContributionRouteProp>();
  const navigation = useNavigation<UserContributionNavigationProp>();
  
  const { budget } = route.params; // Get the budget passed from the previous screen
  const [userContributions, setUserContributions] = useState<{ user: any; contribution: number }[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      if (!budget) return;
      const contributionsMap: { [key: number]: number } = {};

      // Loop through all the expenses and calculate contributions for each user
      budget.expenses.forEach((expense: Expense) => {
        expense.assignedUsers.forEach((assignedUser: AssignedUser) => {
          if (assignedUser.splitAmount) {
            if (!contributionsMap[assignedUser.id]) {
              contributionsMap[assignedUser.id] = 0;
            }
            contributionsMap[assignedUser.id] += assignedUser.splitAmount;
          }
        });
      });

      const contributionsArray = budget.assignedUsers.map((user: AssignedUser) => ({
        user,
        contribution: parseFloat((contributionsMap[user.id] || 0).toFixed(2)),
      }));

      setUserContributions(contributionsArray);
    }, [budget])
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={userContributions}
        keyExtractor={(item) => item.user.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.username}>{item.user.username}</Text>
            <View style={styles.contributionRow}>
              <Text style={styles.contributionText}>Amount to Pay:</Text>
              <Text style={styles.contributionAmount}>{item.contribution}</Text>
            </View>
            
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No users found in this budget.</Text>}
      />
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 8,
  },
  contributionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contributionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  contributionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaa',
  },
});

export default UserContributionScreen;
