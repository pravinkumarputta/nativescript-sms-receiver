let apiInstance: SmsReceiver;
export class SmsReceiver {

    constructor() { }

    static getInstance(): SmsReceiver {
        if (apiInstance != null) {
            return apiInstance;
        }
        apiInstance = new SmsReceiver();
        return apiInstance;
    }

    registerListeners(onSMSReceiverStarted: Function, onSMSReceiverFailed: Function, onSMSReceived: Function, onSMSReceiverTimeOut: Function) { }

    deregisterListeners() { }

    startReceiver() { }

    getHashString(): string {
        return "";
    }
}
