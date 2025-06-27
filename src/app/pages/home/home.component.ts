import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Expense, ExpenseCategory } from '../../store/expense.model';
import * as ExpenseSelectors from '../../store/expense.selectors';
import * as ExpenseActions from '../../store/expense.actions';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private store = inject(Store);

  allExpenses$!: Observable<Expense[]>;
  isLoading$!: Observable<boolean>;
  totalIncome$!: Observable<number>;
  totalExpenses$!: Observable<number>;
  netBalance$!: Observable<number>;

  // form properties
  isEditing = false;
  expenseCategories: ExpenseCategory[] = Object.values(ExpenseCategory);

  formModel: Omit<Expense, 'id'> & { id?: string } = {
    description: '',
    amount: 0,
    category: ExpenseCategory.OTHER,
    date: new Date().toISOString().split('T')[0],
  };

  constructor() {
    this.allExpenses$ = this.store.select(ExpenseSelectors.selectAllExpenses);
    this.isLoading$ = this.store.select(ExpenseSelectors.selectExpensesLoading);
    this.totalIncome$ = this.store.select(ExpenseSelectors.selectTotalIncome);
    this.totalExpenses$ = this.store.select(
      ExpenseSelectors.selectTotalExpense
    );
    this.netBalance$ = this.store.select(ExpenseSelectors.selectNetBalance);
  }

  ngOnInit(): void {
    this.store.dispatch(ExpenseActions.loadExpenses());
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    if (this.isEditing && this.formModel.id) {
      this.store.dispatch(
        ExpenseActions.updateExpense({ expense: this.formModel as Expense })
      );
    } else {
      const expenseData: ExpenseActions.ExpenseData = {
        description: this.formModel.description,
        amount: this.formModel.amount,
        category: this.formModel.category,
        date: new Date(this.formModel.date).toISOString(),
      };

      this.store.dispatch(ExpenseActions.addExpense({ expenseData }));
    }

    form.resetForm();
    this.resetForm();
  }

  onDelete(expenseId: string) {
    if (confirm('Are you sure, you want to delete this transaction?')) {
      this.store.dispatch(ExpenseActions.deleteExpense({ expenseId }));
    }
  }

  onEdit(expense: Expense) {
    this.isEditing = true;
    this.formModel = {
      ...expense,
      date: new Date(expense.date).toISOString().split('T')[0],
    };
    window.scrollTo(0, 0);
  }

  onCancelEdit(form: NgForm) {
    form.resetForm();
    this.resetForm();
  }

  private resetForm(): void {
    this.isEditing = false;
    this.formModel = {
      description: '',
      amount: 0,
      category: ExpenseCategory.OTHER,
      date: new Date().toISOString().split('T')[0],
    };
  }
}
