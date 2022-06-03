import { AlertifyService, MessageType, Position } from './../../services/admin/alertify.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private alertify:AlertifyService) { }

  ngOnInit(): void {
// this.alertify.message("Merhaba ey fani!", {
//   messageType:MessageType.Success,
//   messagePosition:Position.TopCenter,
//   delay:2
// })


  }

}
