module RingCentral.ReferenceSDK.mocks {

    export class Mock {

        protected _json:string;
        protected _status:string;
        protected _statusText:string;
        protected _path:string;
        protected _method:string;

        constructor(method:string, path:string, json?:any, status?:number, statusText?:string);

        path() {
            return this._path;
        }

        method() {
            return this._method;
        }

        test(request:native.Request) {
            return request.url.indexOf(this._path) > -1 &&
                   request.method.toUpperCase() == this._method;
        }

        response(request:native.Request):native.Response;

    }

}