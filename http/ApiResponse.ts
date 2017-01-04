/// <reference path="../externals/index.ts" />

module RingCentral.ReferenceSDK.http {

    export class ApiResponse {

        private _request: Request;
        private _response: Response;

        /**
         * @param request
         * @param response
         */
        constructor(request: Request, response: Response) {
            this._request = request;
            this._response = response;
        }

        /**
         * Note: IE may have weird non-standard HTTP 240 status
         * @return {boolean}
         */
        ok(): boolean {
            return (this._response.status >= 200 && this._response.status < 300);
        }

        /**
         * Returns whatever was returned by HTTP backend, as is, e.g. body, body w/headers, anything w/o any type
         * conversion, in binary format if needed
         */
        raw(): Blob|string|any {
            return this._response.body;
        }

        /**
         * Body only in binary format if needed
         */
        body(): Blob|string|any {
            return this._response.body;
        }

        /**
         * String representation of body
         */
        text(): string {
            return this._response.body.toString();
        }

        /**
         * In languages like PHP or Python native object should be returned (for example stdClass)
         */
        json(): any {
            return JSON.parse(this._response.body);
        }

        /**
         * In languages like PHP or Python a data structure like array or dict should be returned
         * For JS this function does not make sense
         * Other languages may have their own methods with meaningful names
         * For each langauge decision must have an appropriate justification
         */
        jsonArray(): any {
            return JSON.parse(this._response.body);
        }

        /**
         * Parses multipart response body as an array of Transaction objects
         */
        multipart(): ApiResponse[];

        /**
         * Returns a meaningful error message, null if no error
         *
         * Reference script:
         * 1. If no response -> null
         * 2. If response is OK -> null
         * 3. Try to assemble error message from HTTP Status and StatusText
         * 4. Try to look into error_description, message and description properties of this.json()
         * 5. Return either 3 or 4 depending on what has been found
         */
        error(): string;

        /**
         * This should be the native implementation of Request object or a simple data structure
         * - PSR-7 for PHP
         * - DOM Request for JS
         */
        request(): Request {
            return this._request;
        }

        /**
         * This should be the native implementation of Response object or a simple data structure
         * - PSR-7 for PHP
         * - DOM Request for JS
         * - Response in Python
         */
        response(): Response {
            return this._response;
        }

    }

}