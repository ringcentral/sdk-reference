module RC.http {

    export declare interface IHeadersObject {
        [name: string]: string;
    }

    export declare class Headers {

        private headers:IHeadersObject;

        hasHeader(name:string):boolean;

        getHeader(name:string):string;

        setHeader(name:string, value:string):Headers;

        setHeaders(headers:IHeadersObject):Headers;

        getHeaders():IHeadersObject;

        getHeadersArray():string[];

        getContentType():string;

        setContentType(contentType:string):Headers;

        isContentType(contentType:string):boolean;

        isJson():boolean;

        isMultipart():boolean;

        isUrlEncoded():boolean;

    }

}