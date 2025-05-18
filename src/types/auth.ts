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
  };