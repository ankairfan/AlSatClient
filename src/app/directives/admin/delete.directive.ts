import { HttpErrorResponse } from '@angular/common/http';
import { AlertifyService, Position, MessageType } from './../../services/admin/alertify.service';
import { HttpClientService } from './../../services/common/http-client.service';
import { Directive, ElementRef, EventEmitter, HostListener, Injectable, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "assets/immage/delete4801.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @HostListener("click")

 async onclick() {
  this.dialogService.openDialog({
    componentType: DeleteDialogComponent,
    data: DeleteState.Yes,
    afterClosed: async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toogle"
        }, 700, () => {
          this.alertifyService.message("Ürün başarıyla silinmiştir.", {
            messageType: MessageType.Success,
            messagePosition: Position.TopRight
          })
        });
      }, (errorResponse: HttpErrorResponse) => {
        this.alertifyService.message("Ürün silinirken beklenmeyen bir hatayla karşılaşıldı.", {
          messageType: MessageType.Error,
          messagePosition: Position.TopRight
        });
      });
    }
  });
}
}




