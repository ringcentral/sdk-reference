/// <reference path="./externals/index.ts" />

module RingCentral.ReferenceSDK {

    export class SDK {

        static version:string = '2.0.0';

        static server = {
            production: 'https://platform.ringcentral.com',
            sandbox: 'https://platform.devtest.ringcentral.com'
        };

        private _platform:platform.Platform;
        private _pubnubFactory:PubnubFactory;
        private _httpClient:HttpClient;
        private _client:http.Client;

        /**
         * SDK expects all external dependencies to be DI'ed, this allows to separately configure mocking and inject
         * them safely into SDK
         *
         * @param appKey
         * @param appSecret
         * @param server
         * @param [appName]
         * @param [appVersion]
         * @param [httpClient] Optionally SDK users can supply a custom HttpClient, for example for tests (Guzzle Mock in PHP, Fetch Mock in JS, etc.)
         * @param [PubnubFactory] All other external dependencies can be optionally injected too if needed, decision has to be based on language specifics
         */
        constructor(appKey:string,
                    appSecret:string,
                    server:string,
                    appName?:string,
                    appVersion?:string,
                    httpClient?:HttpClient,
                    PubnubFactory?:PubnubFactory) {

            this._pubnubFactory = PubnubFactory;
            this._httpClient = httpClient;
            this._client = new http.Client(httpClient);
            this._platform = new platform.Platform(this._client, appKey, appSecret, server);

        }

        platform():platform.Platform {
            return this._platform;
        }

        createSubscription():subscription.Subscription {
            return new subscription.Subscription(this._platform, this._pubnubFactory);
        }

    }
}