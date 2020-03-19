import { EditingDialogComponent } from './../components/editing-dialog/editing-dialog.component';
import { Injectable } from '@angular/core';
import { SettingsComponent } from './../containers/settings/settings.component';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class EditingGuard implements CanDeactivate<SettingsComponent> {

  constructor(private dialog: MatDialog) {}

  canDeactivate(settingsComponent: SettingsComponent): Observable<boolean> {
    if (settingsComponent.isAnyFormDirty()) {
      const editingDialog = this.dialog.open(EditingDialogComponent);
      return editingDialog.afterClosed();
    }
    return of(true);
  }

}
