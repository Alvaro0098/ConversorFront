export interface Usuario {
  username: string;
  token: string;
  esAdmin: boolean;
}

export interface UserData {
  userName: string;
  maxTries: number;
  planType: number;
}
