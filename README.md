# nativescript-sms-receiver

This is simple library for receiving sms in android with new SMS Retriever API.

## Requirements
Minimum sdk is 21.

## Installation

```javascript
tns plugin add nativescript-sms-receiver
```

## Usage
### Step 1. Register SMSBroadcastReceiver in manifest file

Add below code to {your-app-module}/App_Resources/Android/src/main/AndroidManifest.xml
```
<receiver android:name="com.pravinkumarputta.android.smsreceiver.SMSBroadcastReceiver" android:exported="true">
	<intent-filter>
		<action android:name="com.google.android.gms.auth.api.phone.SMS_RETRIEVED"/>
	</intent-filter>
</receiver>
```
### Step 2. Import SmsReceiver
```
import { SmsReceiver } from 'nativescript-sms-receiver';
```
### Step 3. Instantiate SmsReceiver
Call this method once before starting SMS listener
```
SmsReceiver.getInstance();
```
Note: Call above method only after page loaded.
### Step 4. Start SMS listening
```
// register Sms Listener to get SMS callbacks
SmsReceiver.getInstance().registerListeners(
    function () {
        // onSMSReceiverStarted
        ...
    }.bind(this),
    function (exception) {
        // onSMSReceiverFailed
        ...
    }.bind(this),
    function (message) {
        // onSMSReceived
        ...
            // handle sms here
        ...

        // deregister Sms Listener to avoid invalid operations
        SmsReceiver.getInstance().deregisterListeners();
    }.bind(this),
    function () {
        // onSMSReceiverTimeOut
        ...
    }.bind(this)
);

// start sms receiver for single message
SmsReceiver.getInstance().startReceiver();
```
## Construct a verification message
The verification message that you will send to the user's device. This message must:

 - Be no longer than 140 bytes
 - Begin with the prefix <#>
 - Contain a one-time code that the client sends back to your server to complete the verification flow (see Generating a one-time code)
 - End with an 11-character hash string that identifies your app (see Computing your app's hash string)

Otherwise, the contents of the verification message can be whatever you choose. It is helpful to create a message from which you can easily extract the one-time code later on. For example, a valid verification message might look like the following:
```
<#> Your ExampleApp code is: 123ABC78
FA+9qCX9VSu
```

(For more information visit [__here__](https://developers.google.com/identity/sms-retriever/verify))
## Generating 11-character hash string for your app
After instantiating SMSReceiver access hash string using:
```
SmsReceiver.getInstance().getHashString() // After instantiating SmsReceiver othersise it returns empty string
```

## Used libraries
 * [__smsreceiver__](https://github.com/pravinkumarputta/smsreceiver)
    
## License

Apache License Version 2.0, January 2004
