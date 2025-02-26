export interface Login {
  UserName: string;
  Password: string;
}

export interface ResLogin {
  status: string;
  mensaje: string;
  token?: string;
}

export interface LoginDto {
  UserName: string;
  Password: string;
}
