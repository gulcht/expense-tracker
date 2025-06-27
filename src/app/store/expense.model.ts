export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export enum ExpenseCategory {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  SHOPPING = 'Shopping',
  UTILITIES = 'Utilities',
  INCOME = 'Income',
  OTHER = 'Other',
}

export interface ExpenseState {
  items: Expense[];
  loading: boolean;
  error: string | null;
}
