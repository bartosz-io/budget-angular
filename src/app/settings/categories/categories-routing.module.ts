import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './container/categories.component';
import { EditingGuard } from './guards/editing.guard';
import { ExpenseCategoryResolver } from './resolvers/expenseCategory.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    canDeactivate: [EditingGuard],
    resolve: {
      expenseCategories: ExpenseCategoryResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
