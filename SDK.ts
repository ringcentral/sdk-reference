module RingCentral.ReferenceSDK {

    export class SDK {

        static version:string = '1.0.0';

        static server = {
            production: 'https://platform.ringcentral.com',
            sandbox: 'https://platform.devtest.ringcentral.com'
        };

        private _platform:platform.Platform;
        private _pubnubFactory:pubnub.PubnubFactory;
        private _client:http.Client;
        private _mockRegistry:mocks.Registry;

        constructor(appKey:string,
                    appSecret:string,
                    server:string,
                    appName?:string,
                    appVersion?:string,
                    useHttpMock?:boolean,
                    usePubnubMock?:boolean) {

            this._mockRegistry = new mocks.Registry();

            this._pubnubFactory = new pubnub.PubnubFactory(usePubnubMock);

            //TODO Allow to pass external client
            this._client = useHttpMock ? new mocks.Client(this._mockRegistry) : new http.Client();

            this._platform = new platform.Platform(this._client, appKey, appSecret, server);

        }

        mockRegistry():mocks.Registry;

        platform():platform.Platform;

        createSubscription():subscription.Subscription {
            return new subscription.Subscription(this._platform, this._pubnubFactory);
        }

    }
}