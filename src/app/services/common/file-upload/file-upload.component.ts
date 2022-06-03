import { FileUploadDialogComponent, FileUploadDialogState } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from './../../admin/alertify.service';
import { HttpClientService } from './../http-client.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService,private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    openDialog(afterClosed: any): void {
      const dialogRef = this.dialog.open(FileUploadDialogComponent, {
        width: '250px',
        data: FileUploadDialogState.Yes
      }),

      dialogRef.afterClosed().subscribe(result => {
        if (result == FileUploadDialogState.Yes) {
          afterClosed();

        }
      })
    }

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }


    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(data => {

      this.alertifyService.message("Dosyalar başarıyla yüklenmiştir.", {
        messageType: MessageType.Success,
        messagePosition: Position.TopRight
      })

    }, (errorResponse: HttpErrorResponse) => {

      this.alertifyService.message("Dosyalar yüklenirken beklenmeyen bir hata oluştu.", {
        messageType: MessageType.Error,
        messagePosition: Position.TopRight
      })
    });

  }
}


export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;


}


