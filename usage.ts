var sdk = new RingCentral.ReferenceSDK.SDK('appKey', 'appSecret', 'server'),
    platform = sdk.platform();

// Auth

platform.authorize('123', null, 'P@assW0rd');

// Auth get/set

var authData = platform.auth().data();
platform.auth().setData(authData);

// Call

var req = new RingCentral.ReferenceSDK.native.Request('POST', '/foo');
platform.send(req).json();

// Simple get

var extension = platform.get('/account/~/extension/~').getJson();
console.log(extension.name);

// Subscription

sdk.createSubscription()
    .setEvents(['/account/~/extension/~/presence'])
    .addEvents(['/account/~/extension/~/presence'])
    .on('notification', function(msg) {
        console.log(msg);
    })
    .register();

// Post data

platform
    .post('/account/~/extension/~/sms', {
        from: {phoneNumber: '...'},
        to: [{phoneNumber: '...'}],
        text: '...'
    })
    .json();

// Multipart

platform.get('/account/~/extension/1,2,3/presence').multipart()[0].json();
platform.get('/account/~/extension/1,2,3/presence').multipart()[0].response().status();
platform.get('/account/~/extension/1,2,3/presence').multipart()[0].response().statusText();