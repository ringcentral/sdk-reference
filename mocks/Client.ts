module RingCentral.ReferenceSDK.mocks {

    export class Client extends http.Client {

        private _registry:Registry;

        constructor(registry:Registry);

        /**
         * For sake of simplicity we don't add all try-catch things from original client
         */
        loadResponse(request:native.Request):native.Response {

            var mock = this._registry.find(request);

            return mock.response(request);

        }

    }

}