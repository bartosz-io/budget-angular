import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CategoriesComponent } from '../categories/categories.component';
import { SettingsFacade } from './../../settings.facade';
import { ExpenseCategory } from '@models/expenseCategory';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent {

  forms: FormGroup[] = [];
  expenseCategories$: Observable<ExpenseCategory[]>;

  @ViewChild(CategoriesComponent)
  categoriesComponent: CategoriesComponent;

  constructor(settingsFacade: SettingsFacade) {
    this.expenseCategories$ = settingsFacade.getExpenseCategories$();
  }

  isAnyFormDirty() {
    return this.categoriesComponent.isAnyFormDirty();
  }

}
