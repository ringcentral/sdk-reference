var sdk = new RC.SDK('appKey', 'appSecret', 'server'),
    platform = sdk.getPlatform();

// Auth

platform.authorize('123', null, 'P@assW0rd');

// Simple get

var extension = platform.get('/account/~/extension/~').getJson();
console.log(extension.name);

// Subscription

var subscription = sdk.getSubscription();

subscription
    .addEvents(['/account/~/extension/~/presence'])
    .on('notification', function (msg) {
            console.log(msg);
        })
    .register();

// Post data

var sms = platform.post('/account/~/extension/~/sms', {
    body: {
        from: {phoneNumber: '...'},
        to: [{phoneNumber: '...'}],
        text: '...'
    }
}).getJson();

// Multipart

var multiparts = platform.get('/account/~/extension/1,2,3/presence').getResponses();
console.log(multiparts[0].getJson());
console.log(multiparts[1].getJson());