/// <reference path="../externals/index.ts" />

module RingCentral.ReferenceSDK.http {

    export class Client {

        _httpClient:HttpClient;

        constructor(httpClient:HttpClient){
            this._httpClient = httpClient;
        };

        /**
         * This is the public method
         * @throws ApiException
         * @param request
         */
        sendRequest(request:Request):ApiResponse {

            var apiResponse:ApiResponse;

            try {

                var response = this.loadResponse(request);

                // Wrap both req and res with ApiResponse
                apiResponse = new ApiResponse(request, response);

                // Check the HTTP status
                if (apiResponse.ok()) {

                    return apiResponse;

                } else {

                    throw new Error('Response has unsuccessful status');

                }

            } catch (e) {

                if (!apiResponse) apiResponse = new ApiResponse(request, null);

                throw new ApiException(apiResponse, e);

            }

        }

        /**
         * Creates a native Request object using provided parts, used by sendRequest() method of Platform
         * @param method
         * @param url
         * @param queryParams
         * @param body
         * @param headers
         */
        createRequest(method:string, url:string, queryParams?:any, body?:any, headers?:IHeadersObject):Request {
            return new Request(method, url, queryParams, body, headers);
        }

        /**
         * This is the internal method that actually sends the request and loads response
         */
        protected loadResponse(request:Request):Response {
            return this._httpClient.send(request);

        }

    }

}