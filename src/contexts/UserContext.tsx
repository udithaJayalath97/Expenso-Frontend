import React, { createContext, useState, useContext, ReactNode } from 'react';

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

export interface UserData {
  id: number;
  username: string;
  mobileNumber: string;
  budgets: Budget[];
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};