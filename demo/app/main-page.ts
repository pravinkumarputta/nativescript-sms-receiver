import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { Button } from "tns-core-modules/ui/button";
import { TextView } from "tns-core-modules/ui/text-view";
import { Label } from "tns-core-modules/ui/label";
import { getViewById } from 'tns-core-modules/ui/page';
import { SmsReceiver } from 'nativescript-sms-receiver';

let page;
let btStartReceiver: Button;
let tvHashString: TextView;
let tvSampleMessage: TextView;
let lblResponseMessage: Label;
// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;

    // get all control references
    btStartReceiver = <Button>getViewById(page, "btStartReceiver");
    tvHashString = <TextView>getViewById(page, "tvHashString");
    tvSampleMessage = <TextView>getViewById(page, "tvSampleMessage");
    lblResponseMessage = <Label>getViewById(page, "lblResponseMessage");

    // first-time initialisation
    SmsReceiver.getInstance();

    // get hash String
    tvHashString.text = SmsReceiver.getInstance().getHashString();

    // generate dummy message to test
    tvSampleMessage.text =
        "<#> One time password is 12345678\n" + SmsReceiver.getInstance().getHashString();
}

export function startReceiver() {
    // register Sms Listener to get SMS callbacks
    SmsReceiver.getInstance().registerListeners(
        function () {
            // onSMSReceiverStarted
            btStartReceiver.isEnabled = false;
            lblResponseMessage.text = "Waiting for the OTP";
        }.bind(this),
        function (exception) {
            // onSMSReceiverFailed
            btStartReceiver.isEnabled = true;
            lblResponseMessage.text = "Failed to Start SMS Retriever";
        }.bind(this),
        function (message) {
            // onSMSReceived
            btStartReceiver.isEnabled = true;
            lblResponseMessage.text = message;

            // deregister Sms Listener to avoid invalid operations
            SmsReceiver.getInstance().deregisterListeners();
        }.bind(this),
        function () {
            // onSMSReceiverTimeOut
            btStartReceiver.isEnabled = true;
            lblResponseMessage.text = "Sms receiver is expired";
        }.bind(this)
    );

    // start sms receiver for single message
    SmsReceiver.getInstance().startReceiver();
}
