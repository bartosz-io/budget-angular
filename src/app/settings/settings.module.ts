import { EditingGuard } from './guards/editing.guard';
import { SharedModule } from './../shared/shared.module';
import { ExpenseCategoryResolver } from './resolvers/expenseCategory.resolver';
import { SettingsFacade } from './settings.facade';
import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './containers/settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoriesComponent } from './containers/categories/categories.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { EditingDialogComponent } from './components/editing-dialog/editing-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsState } from './settings.state';

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule
  ],
  declarations: [
    SettingsComponent,
    CategoriesComponent,
    CategoryFormComponent,
    CategoryListComponent,
    EditingDialogComponent
  ],
  providers: [
    SettingsFacade,
    SettingsState,
    ExpenseCategoryResolver,
    EditingGuard
  ],
  entryComponents: [EditingDialogComponent]
})
export class SettingsModule { }
