import { Observable } from 'rxjs';
import { SettingsFacade } from './../../settings.facade';
import { ExpenseCategory } from '@models/expenseCategory';
import { Component, Input, ChangeDetectionStrategy, ViewChild, ViewChildren } from '@angular/core';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { CategoryListComponent } from '../../components/category-list/category-list.component';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {

  @Input()
  expenseCategories$: ExpenseCategory[];
  newCategory: ExpenseCategory = new ExpenseCategory();
  isUpdating$: Observable<boolean>;

  @ViewChild(CategoryFormComponent, { static: false })
  categoryForm: CategoryFormComponent;

  @ViewChild(CategoryListComponent, { static: true })
  categoryList: CategoryListComponent;

  constructor(private settingsFacade: SettingsFacade) {
    this.isUpdating$ = settingsFacade.isUpdating$();
  }

  addCategory(category: ExpenseCategory) {
    this.settingsFacade.addExpenseCategory(category);
  }

  updateCategory(category: ExpenseCategory) {
    this.settingsFacade.updateExpenseCategory(category);
  }

  isAnyFormDirty() {
    return this.categoryForm?.isDirty() || this.categoryList.isAnyFormDirty();
  }

}
