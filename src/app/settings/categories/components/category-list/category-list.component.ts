import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { CategoryFormComponent } from '../category-form/category-form.component';

import { ExpenseCategory } from '@models/expenseCategory';
import { Observable } from 'rxjs';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent {

  @Input()
  categories$: Observable<ExpenseCategory[]>;

  @Output()
  categoryUpdated: EventEmitter<ExpenseCategory> = new EventEmitter();

  @ViewChildren(CategoryFormComponent)
  categoryForms: QueryList<CategoryFormComponent>;

  updateCategory(category: ExpenseCategory) {
    this.categoryUpdated.emit(category);
  }

  isAnyFormDirty() {
    return this.categoryForms.reduce((reduced, form) => form.isDirty() || reduced, false);
  }

}
