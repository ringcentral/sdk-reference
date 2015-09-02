module RingCentral.ReferenceSDK.native {

    export declare class Request extends Headers {

        constructor(method:string, url:string, query?:string, body?:any);

        method:string;
        url:string;
        body:any;

    }

}