export declare class SmsReceiver {
  private onSMSReceiverStarted;
  private onSMSReceiverFailed;
  private onSMSReceived;
  private onSMSReceiverTimeOut;
  private smsReceiver;
  private hashKey;
  constructor();
  static getInstance(): SmsReceiver;
  registerListeners(onSMSReceiverStarted: Function, onSMSReceiverFailed: Function, onSMSReceived: Function, onSMSReceiverTimeOut: Function): void;
  deregisterListeners(): void;
  startReceiver(): void;
  getHashString(): string;
}
