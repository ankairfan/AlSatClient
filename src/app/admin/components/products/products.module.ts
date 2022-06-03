import { FileUploadModule } from './../../../services/common/file-upload/file-upload.module';
import { DeleteDirective } from './../../../directives/admin/delete.directive';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective,

  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule.forChild([
      {path:"", component:ProductsComponent}
    ]),
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FileUploadModule


  ]
})
export class ProductsModule { }
