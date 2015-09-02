module RingCentral.ReferenceSDK.http {

    export class ApiException {

        private _previous:Error;
        private _apiResponse:ApiResponse;

        constructor(apiResponse:ApiResponse, previous?:Error);

        apiResponse():ApiResponse;

        /**
         * In JS or other language where error message is just a property but not a method,
         * this should be a part of constructor and result should be assigned to message property
         * @return {string}
         */
        getMessage():string {
            return (this._apiResponse ? this._apiResponse.error() : this._previous.message);
        }

    }

}