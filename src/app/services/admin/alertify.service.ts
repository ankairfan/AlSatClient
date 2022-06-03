import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message: string,options:Partial<AlertifyOptions>) {
    alertify.set('notifier','delay', options.delay);
    alertify.set("notifier","position", options.messagePosition);
    alertify[options.messageType](message);
  }
}
export class AlertifyOptions{
  messageType: MessageType=MessageType.Message;
  messagePosition:Position=Position.TopRight;
  delay:number=2
}
export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}
export enum Position{
  TopCenter="top-center",
  TopLeft="top-left",
  TopRight="top-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left",
  BottomRight="bottom-right"

}
