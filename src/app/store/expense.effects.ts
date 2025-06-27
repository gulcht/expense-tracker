import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpenseService } from './expense.service';
import * as ExpenseActions from './expense.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
@Injectable()
export class ExpenseEffects {
  private actions$ = inject(Actions);
  private expenseService = inject(ExpenseService);

  // loadExpenses
  loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.loadExpenses),
      exhaustMap(() =>
        this.expenseService.getExpenses().pipe(
          map((expenses) =>
            ExpenseActions.loadExpensesSuccess({
              expenses,
            })
          ),
          catchError((error) =>
            of(ExpenseActions.loadExpensesFailure({ error }))
          )
        )
      )
    )
  );

  // addExpense
  addExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.addExpense),
      exhaustMap((action) =>
        this.expenseService.addExpense(action.expenseData).pipe(
          map((expense) =>
            ExpenseActions.addExpenseSuccess({
              expense,
            })
          ),
          catchError((error) => of(ExpenseActions.addExpenseFailure({ error })))
        )
      )
    )
  );

  // updateExpenses
  updateExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.updateExpense),
      exhaustMap((action) =>
        this.expenseService.updateExpense(action.expense).pipe(
          map((expense) =>
            ExpenseActions.updateExpenseSuccess({
              expense,
            })
          ),
          catchError((error) =>
            of(ExpenseActions.updateExpenseFailure({ error }))
          )
        )
      )
    )
  );

  deleteExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.deleteExpense),
      exhaustMap((action) =>
        this.expenseService.deleteExpense(action.expenseId).pipe(
          map(() =>
            ExpenseActions.deleteExpenseSuccess({ expenseId: action.expenseId })
          ),
          catchError((error) =>
            of(ExpenseActions.deleteExpenseFailure({ error }))
          )
        )
      )
    )
  );
}
