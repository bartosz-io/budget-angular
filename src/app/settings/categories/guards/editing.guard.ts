import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";

import { CategoriesComponent } from "../container/categories.component";
import { EditingDialogComponent } from "../components/editing-dialog/editing-dialog.component";

@Injectable()
export class EditingGuard  {
  constructor(private dialog: MatDialog) {}

  canDeactivate(categoriesComponent: CategoriesComponent): Observable<boolean> {
    if (categoriesComponent.isAnyFormDirty()) {
      const editingDialog = this.dialog.open(EditingDialogComponent);
      return editingDialog.afterClosed();
    }
    return of(true);
  }
}
