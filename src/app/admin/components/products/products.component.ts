import { ListComponent } from './list/list.component';
import { ProductCreateViewModel } from './../../../contracts/ProductCreateViewModel';
import { HttpClientService } from './../../../services/common/http-client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) { super(spinner) }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpin);
  }


 @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(createdProduct: ProductCreateViewModel) {
    this.listComponents.getProducts();
  }

}


