import { createAction, props } from '@ngrx/store';
import { Expense } from './expense.model';

// create type except field [id]
// type ExpensesData = {
//   description: string;
//   amount: number;
//   category: ExpenseCategory;
//   date: string;
// };
export type ExpenseData = Omit<Expense, 'id'>;

// loading
export const loadExpenses = createAction('[Expenses Page] load Expense');
export const loadExpensesSuccess = createAction(
  '[Expenses API] load Expense Success',
  props<{ expenses: Expense[] }>()
);
export const loadExpensesFailure = createAction(
  '[Expenses API] load Expense Failure',
  props<{ error: any }>()
);

// add
export const addExpense = createAction(
  '[Expenses Page] add Expense',
  props<{ expenseData: ExpenseData }>()
);
export const addExpenseSuccess = createAction(
  '[Expenses API] add Expense Success',
  props<{ expense: Expense }>()
);
export const addExpenseFailure = createAction(
  '[Expenses API] add Expense Failure',
  props<{ error: any }>()
);

// update
export const updateExpense = createAction(
  '[Expenses Page] update Expense',
  props<{ expense: Expense }>()
);
export const updateExpenseSuccess = createAction(
  '[Expenses API] update Expense Success',
  props<{ expense: Expense }>()
);
export const updateExpenseFailure = createAction(
  '[Expenses API] update Expense Failure',
  props<{ error: any }>()
);

// delete
export const deleteExpense = createAction(
  '[Expenses Page] delete Expense',
  props<{ expenseId: string }>()
);
export const deleteExpenseSuccess = createAction(
  '[Expenses API] delete Expense Success',
  props<{ expenseId: string }>()
);
export const deleteExpenseFailure = createAction(
  '[Expenses API] delete Expense Failure',
  props<{ error: any }>()
);
