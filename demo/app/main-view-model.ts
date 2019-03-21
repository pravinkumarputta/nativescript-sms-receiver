import { Observable } from 'tns-core-modules/data/observable';
import { SmsReceiver } from 'nativescript-sms-receiver';

export class HelloWorldModel extends Observable {
  public message: string;
  constructor() {
    super();
  }
}
