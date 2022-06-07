import { FileUploadOptions } from './../../../../services/common/file-upload/file-upload.component';
import { Position } from './../../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductCreateViewModel } from './../../../../contracts/ProductCreateViewModel';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner:NgxSpinnerService, private prooductService: ProductService, private alertify: AlertifyService) {
    super(spiner)
   }

  ngOnInit(): void {
  }

  @Output() createdProduct: EventEmitter<ProductCreateViewModel>= new EventEmitter();


  create(txtName: HTMLInputElement, txtStock: HTMLInputElement, txtPrice: HTMLInputElement, txtDescription: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallSpin);
    const productCreateViewModel: ProductCreateViewModel = new ProductCreateViewModel();
    productCreateViewModel.name= txtName.value;
    productCreateViewModel.stock= parseInt(txtStock.value);
    productCreateViewModel.price= parseFloat(txtPrice.value);
    productCreateViewModel.description= txtDescription.value;

    this.prooductService.create(productCreateViewModel, ()=>{
      this.hideSpinner(SpinnerType.BallSpin);
      if(!txtName.value)
      this.alertify.message("Ürün başarıyla eklenmiştir",{
        messageType:MessageType.Success,
        messagePosition:Position.TopRight,
        delay:2
      });
      this.createdProduct.emit(productCreateViewModel);

    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          messageType: MessageType.Error,
          messagePosition:Position.TopRight,
          delay:2

        });
    });
  }
}
