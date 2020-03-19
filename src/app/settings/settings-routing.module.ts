import { EditingGuard } from './guards/editing.guard';
import { ExpenseCategoryResolver } from './resolvers/expenseCategory.resolver';
import { SettingsComponent } from './containers/settings/settings.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '',
    component: SettingsComponent,
    resolve: {
      expenseCategories: ExpenseCategoryResolver
    },
    canDeactivate: [EditingGuard]
  },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class SettingsRoutingModule { }
