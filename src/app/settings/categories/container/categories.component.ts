import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";

import { CategoryFormComponent } from "../components/category-form/category-form.component";
import { CategoryListComponent } from "../components/category-list/category-list.component";
import { CategoriesFacade } from "../categories.facade";
import { ExpenseCategory } from "@models/expenseCategory";

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  newCategory: ExpenseCategory = new ExpenseCategory();
  expenseCategories$: Observable<ExpenseCategory[]>;
  isUpdating$: Observable<boolean>;

  @ViewChild(CategoryFormComponent, { static: false })
  categoryForm: CategoryFormComponent;

  @ViewChild(CategoryListComponent, { static: true })
  categoryList: CategoryListComponent;

  constructor(private categoriesFacade: CategoriesFacade) {
    this.isUpdating$ = categoriesFacade.isUpdating$();
    this.expenseCategories$ = categoriesFacade.getExpenseCategories$();
  }

  addCategory(category: ExpenseCategory) {
    this.categoriesFacade.addExpenseCategory(category);
  }

  updateCategory(category: ExpenseCategory) {
    this.categoriesFacade.updateExpenseCategory(category);
  }

  isAnyFormDirty() {
    return this.categoryForm?.isDirty() || this.categoryList.isAnyFormDirty();
  }
}
