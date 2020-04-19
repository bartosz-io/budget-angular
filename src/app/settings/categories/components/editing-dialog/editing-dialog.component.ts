
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'editing-dialog',
  templateUrl: './editing-dialog.component.html',
  styleUrls: ['./editing-dialog.component.scss']
})
export class EditingDialogComponent {

  constructor(private dialogRef: MatDialogRef<EditingDialogComponent>) { }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}

