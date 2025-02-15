export interface Bank {
    id: string;
    country_code: string;
    display_name: string;
    name: string;
    icon_logo: string;
}

export interface Account {
  id: string;
  link: string;
  type: string;
  public_identification_name: string;
  public_identification_value: string;
  name: string;
};


export interface Transaccion {
  id: string;
  category: string;
  type: string;
  status: string;
  balance: string;
  amount: string;
  value_date: string;
};
