import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { ExpenseCategory, ExpenseState } from './expense.model';
import * as fromExpenses from './expense.reducer';

export const selectExpenseState = createFeatureSelector<ExpenseState>(
  fromExpenses.expensesFeatureKey
);

// basic selectors

export const selectAllExpenses = createSelector(
  selectExpenseState,
  (state) => state.items
);

export const selectExpensesLoading = createSelector(
  selectExpenseState,
  (state) => state.loading
);

export const selectExpensesError = createSelector(
  selectExpenseState,
  (state) => state.error
);

export const selectIncomeItems = createSelector(selectAllExpenses, (expenses) =>
  expenses.filter((expense) => expense.category === ExpenseCategory.INCOME)
);

export const selectExpenseItems = createSelector(
  selectAllExpenses,
  (expenses) =>
    expenses.filter((expense) => expense.category !== ExpenseCategory.INCOME)
);

export const selectTotalIncome = createSelector(
  selectIncomeItems,
  (incomeItems) => incomeItems.reduce((total, item) => total + item.amount, 0)
);

export const selectTotalExpense = createSelector(
  selectExpenseItems,
  (expenseItems) => expenseItems.reduce((total, item) => total + item.amount, 0)
);

export const selectNetBalance = createSelector(
  selectTotalIncome,
  selectTotalExpense,
  (totalIncome, totalExpense) => totalIncome - totalExpense
);
