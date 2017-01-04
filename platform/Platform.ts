/// <reference path="../externals/index.ts" />

module RingCentral.ReferenceSDK.platform {

    export declare interface ICallOptions {
        skipAuthCheck?: boolean;
    }

    export class Platform extends EventEmitter {

        private _auth:Auth;
        private _server:string;
        private _appKey:string;
        private _appSecret:string;
        private _client:http.Client;

        constructor(client:http.Client, appKey:string, appSecret:string, server:string);

        /**
         * Assembles the fully qualified URL of the resource by adding server, /restapi/ and version to provided path
         * @param path
         * @param options
         */
        createUrl(path:string, options?:{addServer?: boolean; addToken?: boolean; addMethod?: boolean}):string;

        auth():Auth {
            return this._auth;
        }

        loggedIn() {
            try {
                if (this._auth.accessTokenValid() || this.refresh()) return true;
            } catch (e) {
                return false;
            }
        }

        /**
         * @throws ApiException
         */
        login(username:string, extension:string, password:string):http.ApiResponse {
            return this.requestToken('', {});
        }

        /**
         * Returns null if nothing needs to be done or refresh has occured in other tab
         * If refresh has been performed then ApiResponse will be returned
         * This method should be synchronized, e.g. only one refresh can be in progress
         * @throws ApiException
         */
        refresh():http.ApiResponse {

            if (!this._auth.refreshTokenValid()) {
                throw new http.ApiException(null, new Error('Refresh Token is not valid'));
            }

            //do refresh
            return this.requestToken('', {});

        }

        /**
         * @throws ApiException
         */
        logout():http.ApiResponse {
            return this.requestToken('', {});
        }

        /**
         * Convenience helper used for processing requests (even externally created)
         * Performs access token refresh if needed
         * Then adds Authorization header and API server to URI
         * @throws ApiException
         */
        inflateRequest(request:Request, options?:ICallOptions):Request {
            if (!options.skipAuthCheck) {
                this.ensureAuthentication();
                request.headers['Authorization'] = this.authHeader();
            }
            request.headers['User-Agent'] = '...';
            return request;
        }

        /**
         * Method sends the request (even externally created) to API server using client
         * @throws ApiException
         */
        sendRequest(request:Request, options?:ICallOptions):http.ApiResponse {
            return this._client.sendRequest(this.inflateRequest(request, options));
        }

        /**
         * The order of arguments is dictated by how frequently they are used
         * @throws ApiException
         */
        get(url:string, query?:any, headers?:any, options?:ICallOptions):http.ApiResponse {
            return this.sendRequest(this._client.createRequest('GET', url, query, null, headers), options);
        }

        /**
         * The order of arguments is dictated by how frequently they are used
         * @throws ApiException
         */
        post(url:string, body?:any, query?:any, headers?:any, options?:ICallOptions):http.ApiResponse {
            return this.sendRequest(this._client.createRequest('GET', url, query, body, headers), options);
        }

        /**
         * The order of arguments is dictated by how frequently they are used
         * @throws ApiException
         */
        put(url:string, body?:any, query?:any, headers?:any, options?:ICallOptions):http.ApiResponse {
            return this.sendRequest(this._client.createRequest('GET', url, query, body, headers), options);
        }

        /**
         * The order of arguments is dictated by how frequently they are used
         * @throws ApiException
         */
        'delete'(url:string, query?:any, headers?:any, options?:ICallOptions):http.ApiResponse {
            return this.sendRequest(this._client.createRequest('GET', url, query, null, headers), options);
        }

        protected ensureAuthentication() {
            if (!this._auth.accessTokenValid()) this.refresh();
        }

        /**
         * @throws ApiException
         */
        protected requestToken(path:string, body:any):http.ApiResponse {
            var req = this._client.createRequest('POST', path, null, body, {'Authorization': 'Basic ' + this.apiKey()});
            return this.sendRequest(req, {skipAuthCheck: true});
        }

        protected apiKey():string {
            return btoa(this._appKey + ':' + this._appSecret);
        }

        protected authHeader():string {
            return this._auth.tokenType() + ' ' + this._auth.accessToken();
        }

    }

}