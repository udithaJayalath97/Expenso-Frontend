import { Budget } from '../contexts/UserContext';
import { Expense} from '../contexts/UserContext';
export interface LoginRequest {
    mobile: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: {
      id: number;
      name: string;
      mobile: string;
    };
  }

  export interface ExpensePayload{
    description: string;
    amount: number;
    budgetId: number;
    createdBy: number | undefined;
    userIds: number[];
    receipt?: {
      uri: string;
      type: string;
      name: string;
    };
    [key: string]: any;
  }
  
  export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined; 
    Persons: undefined;
    Activity: undefined;
    Account: undefined;
    Budgets: undefined;
    AddBudgets: undefined;
    Notifications: undefined;
    AddExpense: { budget: Budget };
    BudgetDetails: { budget: Budget };
    ExpenseDetails: { expense: Expense };
    UserContribution: { budget: Budget };
  };