import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Expense } from './expense.model';
import { ExpenseData } from './expense.actions';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private http = inject(HttpClient);
  private expenseUrl = 'http://localhost:3000/expenses';

  // getExp
  getExpenses(): Observable<Expense[]> {
    return this.http
      .get<Expense[]>(this.expenseUrl)
      .pipe(catchError(this.handleError));
  }

  // addExp
  addExpense(expenseData: ExpenseData): Observable<Expense> {
    const newExpense: Expense = {
      id: uuidv4(),
      ...expenseData,
    };
    return this.http
      .post<Expense>(this.expenseUrl, newExpense)
      .pipe(catchError(this.handleError));
  }

  //   update
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http
      .patch<Expense>(`${this.expenseUrl}/${expense.id}`, expense)
      .pipe(catchError(this.handleError));
  }

  //   delete
  deleteExpense(expenseId: string): Observable<{}> {
    return this.http
      .delete<{}>(`${this.expenseUrl}/${expenseId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => Error('An error occured in the expense service.'));
  }
}
