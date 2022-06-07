import { Position } from './../../../../services/admin/alertify.service';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'description','photo','edit','delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(spinner: NgxSpinnerService, private productService: ProductService,
    private alertifyService: AlertifyService, private dialogService: DialogService) {
    super(spinner)
  }


  async ngOnInit() {
    await this.getProducts();
  }
 async pageChanged(){
    await this.getProducts();
  }



  async getProducts() {
    this.showSpinner(SpinnerType.BallSpin);
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 10, () => this.hideSpinner(SpinnerType.BallSpin), errorMessage => this.alertifyService.message(errorMessage, {
      messageType: MessageType.Error,
      messagePosition: Position.TopRight
    }))

    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length= allProducts.totalCount;
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1000px"
      }

    });
  }

}

