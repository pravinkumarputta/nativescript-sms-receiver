import * as application from "tns-core-modules/application";

let apiInstance: SmsReceiver;
export class SmsReceiver {
    private onSMSReceiverStarted: Function = null;
    private onSMSReceiverFailed: Function = null;
    private onSMSReceived: Function = null;
    private onSMSReceiverTimeOut: Function = null;
    private smsReceiver: any = null;
    private hashKey: string = "";

    constructor() {
        let scope = this;
        let SmsReceiverCallbackListener = java.lang.Object["extend"]({
            interfaces: [
                com["pravinkumarputta"].android.smsreceiver.SMSBroadcastReceiver
                    .OTPReceiveListener
            ],
            onSMSReceiverStarted: function () {
                if (scope.onSMSReceiverStarted != null) {
                    scope.onSMSReceiverStarted();
                }
            },
            onSMSReceiverFailed: function (exception) {
                if (scope.onSMSReceiverFailed != null) {
                    scope.onSMSReceiverFailed(exception);
                }
            },
            onSMSReceived: function (message) {
                if (scope.onSMSReceived != null) {
                    scope.onSMSReceived(message);
                }
            },
            onSMSReceiverTimeOut: function () {
                if (scope.onSMSReceiverTimeOut != null) {
                    scope.onSMSReceiverTimeOut();
                }
            }
        });
        let smsReceiverCallback = new SmsReceiverCallbackListener();

        this.smsReceiver = new com["pravinkumarputta"].android.smsreceiver.SMSReceiver(
            application.android.foregroundActivity,
            smsReceiverCallback
        );

        // get app hash string
        this.hashKey = com["pravinkumarputta"].android.smsreceiver.SMSReceiver.hashKey;
    }

    static getInstance(): SmsReceiver {
        if (apiInstance != null) {
            return apiInstance;
        }
        apiInstance = new SmsReceiver();
        return apiInstance;
    }

    registerListeners(onSMSReceiverStarted: Function, onSMSReceiverFailed: Function, onSMSReceived: Function, onSMSReceiverTimeOut: Function) {
        this.onSMSReceiverStarted = onSMSReceiverStarted;
        this.onSMSReceiverFailed = onSMSReceiverFailed;
        this.onSMSReceived = onSMSReceived;
        this.onSMSReceiverTimeOut = onSMSReceiverTimeOut;
    }

    deregisterListeners() {
        this.onSMSReceiverStarted = null;
        this.onSMSReceiverFailed = null;
        this.onSMSReceived = null;
        this.onSMSReceiverTimeOut = null;
    }

    startReceiver() {
        this.smsReceiver.startSmsListener();
    }

    getHashString(): string {
        return this.hashKey;
    }
}
