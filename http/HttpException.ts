module RC.http {

    export declare class HttpException {

        constructor(request:Request, response:Response, previuous:Error);

        getResponse():Response;

        getRequest():Request;

    }

}