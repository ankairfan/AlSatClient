import { HttpErrorResponse } from '@angular/common/http';
import { AlertifyService, Position, MessageType } from './../../services/admin/alertify.service';
import { HttpClientService } from './../../services/common/http-client.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "assets/img/delete4801.png");
    img.setAttribute("style", "pointer;");
    img.width = 25;
    img.height = 25;

    _renderer.appendChild(element.nativeElement, img)
  }
  @Input() id: string;
  @Input() controller: string;
  @HostListener("click")
 // @Output() callback: EventEmitter<any> = new EventEmitter();

  async onClick() {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {

        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toogle"
        }, 700, () => {
          this.alertifyService.message("Ürün başarıyla silinmiştir.",{
            messagePosition: Position.TopRight,
            messageType: MessageType.Success
          });
         });
      },(errorResponse:HttpErrorResponse)=>{
        this.alertifyService.message("Ürün silinirken beklenmeyen bir hata ile karşılaşılmıştır.",{
          messagePosition:Position.TopRight,
          messageType: MessageType.Error
        })
      });
    });


  }
  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();

      }
    });
  }


}
