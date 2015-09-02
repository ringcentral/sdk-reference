module RingCentral.ReferenceSDK.native {

    export declare class Response extends Headers {

        constructor(status:number, statusText:string, body:string, headers?:IHeadersObject);

        body:string;
        status:number;
        statusText:string;

    }

}