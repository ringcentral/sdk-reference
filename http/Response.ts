module RC.http {

    export declare class Response extends Headers {

        private status:number;
        private statusText:string;
        private body:string;

        constructor(status:number, statusText:string, body:string, headers?:IHeadersObject);

        checkStatus();

        getBody():string;

        /**
         * Generic method that returns decoded result based on a Content-Type
         * This method comes from JS SDK where it was historically done this way
         * TODO Remove from JS SDK
         */
        getData():any; // JS object or array or dict if JSON
        getData():Response[]; // array of responses if Multipart/Mixed
        getData():string; // plain text body if else

        getJson(asObject:boolean = true):any;

        getResponses():Response[];

        getStatus():number;

        getStatusText():string;

        getError():string;

    }

}