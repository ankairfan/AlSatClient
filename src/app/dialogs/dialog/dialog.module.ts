import { FileUploadDialogComponent } from './../file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DeleteDialogComponent, FileUploadDialogComponent],

  imports: [
    CommonModule,
    MatDialogModule

  ]
})
export class DialogModule { }
