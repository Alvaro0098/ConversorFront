export interface Currency {
  id: number;
  code: string;
  symbol: string;
  ic: number;
  description: string;
}

export interface CreateCurrency {
  code: string;
  symbol: string;
  ic: number;
  description: string;
}
