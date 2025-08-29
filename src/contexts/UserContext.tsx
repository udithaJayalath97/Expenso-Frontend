import React, { createContext, useState,useCallback, useContext, ReactNode } from 'react';

export interface AssignedUser {
  id: number;
  username: string;
  mobileNumber: string;
  splitAmount?: number; // Optional, only for expenses
}

export interface Expense {
  expenseId: number;
  description: string;
  amount: number;
  createdBy: AssignedUser;
  assignedUsers: AssignedUser[];
}

export interface Budget {
  id: number;
  name: string;
  totalAmount: number | null;
  createdBy: AssignedUser;
  assignedUsers: AssignedUser[];
  expenses: Expense[];
}

export interface Activity{
  description: string;
}

export interface Notifications{
  id: number;
  userId: number;
  message: string;
  readStatus: boolean;
  createdAt: Date;
}

export interface UserData {
  id: number;
  username: string;
  mobileNumber: string;
  budgets: Budget[];
  activity: Activity[];
  notifications: Notifications[];
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  reloadUserContext: (userId: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  

  const reloadUserContext = useCallback(async (userId: number) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/${userId}/budgets`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }
      const data: UserData = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error loading user data:', error);
      setUser(null);
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser, reloadUserContext }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};