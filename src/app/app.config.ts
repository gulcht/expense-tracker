import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { ActionReducer, provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import * as fromExpenses from './store/expense.reducer';
import { ExpenseEffects } from './store/expense.effects';

import { localStorageSync } from 'ngrx-store-localstorage';
import { provideHttpClient } from '@angular/common/http';

function expenseLocalStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [fromExpenses.expensesFeatureKey],
    rehydrate: true,
    storage: window.localStorage,
  })(reducer);
}

const metaReducers = [expenseLocalStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideStore({}, { metaReducers }),
    provideState(fromExpenses.expensesFeatureKey, fromExpenses.expenseReducer),
    provideEffects([ExpenseEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
