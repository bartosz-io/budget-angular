import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "./../../shared/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./container/categories.component";
import { CategoryFormComponent } from "./components/category-form/category-form.component";
import { CategoryListComponent } from "./components/category-list/category-list.component";
import { EditingDialogComponent } from "./components/editing-dialog/editing-dialog.component";
import { ExpenseCategoryResolver } from "./resolvers/expenseCategory.resolver";
import { CategoriesFacade } from "./categories.facade";
import { CategoriesState } from "./categories.state";
import { EditingGuard } from "./guards/editing.guard";

@NgModule({
    imports: [SharedModule, CategoriesRoutingModule, ReactiveFormsModule],
    declarations: [
        CategoriesComponent,
        CategoryFormComponent,
        CategoryListComponent,
        EditingDialogComponent,
    ],
    providers: [
        ExpenseCategoryResolver,
        CategoriesFacade,
        CategoriesState,
        EditingGuard,
    ]
})
export class CategoriesModule {}
