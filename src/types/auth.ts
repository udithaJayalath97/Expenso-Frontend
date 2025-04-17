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
  