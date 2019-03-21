var SmsReceiver = require("nativescript-sms-receiver").SmsReceiver;
var smsReceiver = new SmsReceiver();

describe("greet function", function() {
    it("exists", function() {
        expect(smsReceiver.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(smsReceiver.greet()).toEqual("Hello, NS");
    });
});