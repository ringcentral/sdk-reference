module RC.http {

    export declare class Request extends Headers {

        private method:string;
        private url:string;
        private query:any;
        private body:any;

        constructor(method:string, url:string, query?:string, body?:any);

        isPost():boolean;

        isGet():boolean;

        isDelete():boolean;

        isPut():boolean;

        isLoaded():boolean;

        getMethod():string;

        setMethod(method:string):Request;

        getUrl():string;

        setUrl(url:string):Request;

        getQuery():any;

        setQuery(query:any):Request;

        getBody();

        setBody(body:any):Request;

        /**
         * @throws RC.http.HttpException
         */
        send():Response;

        private getEncodedBody();

        private getUrlWithQuery();

    }

}