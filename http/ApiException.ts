/// <reference path="../externals/index.ts" />

module RingCentral.ReferenceSDK.http {

    export class ApiException {

        private _previous: Error;
        private _apiResponse: ApiResponse;

        constructor(apiResponse: ApiResponse, previous?: Error) {
            this._apiResponse = apiResponse;
            this._previous = previous;
        }

        apiResponse(): ApiResponse {
            return this._apiResponse;
        }

        /**
         * In JS or other language where error message is just a property but not a method,
         * this should be a part of constructor and result should be assigned to message property
         * @return {string}
         */
        getMessage(): string {
            return (this._apiResponse ? this._apiResponse.error() : this._previous.message);
        }

    }

}