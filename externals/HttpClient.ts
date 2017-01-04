declare class HttpClient {
    constructor(subscribeKey: string);

    send(request: Request): Response;
}

declare class Response extends Headers {
    body: string;
    status: number;
    statusText: string;

    constructor(status: number, statusText: string, body: string, headers?: IHeadersObject);
}

declare class Request extends Headers {
    method: string;
    url: string;
    body: any;

    constructor(method: string, url: string, query?: string, body?: any, headers?: IHeadersObject);
}

declare interface IHeadersObject {
    [name: string]: string;
}

declare class Headers {
    headers: IHeadersObject;
}