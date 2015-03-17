module RC.platform {

    export declare interface IOptions {
        method?: string;
        url?: string;
        query?: any;
        headers?: RC.http.IHeadersObject;
        body?: any;
    }

    export declare interface IUrlOptions {
        addServer?: boolean;
        addToken?: boolean;
        addMethod?: boolean;
    }

    export declare class Platform {

        private auth:Auth;
        private server:string;
        private appKey:string;
        private appSecret:string;

        constructor(appKey:string, appSecret:string, server:string);

        getAuthData():IAuthData;

        setAuthData(data:IAuthData):Platform;

        isTokenValid();

        isAuthorized(refresh:boolean = true);

        apiUrl(url:string, options?:IUrlOptions):string;

        authorize(username:string, extension:string, password:string, remember?:boolean):RC.http.Response;

        refresh():RC.http.Response;

        logout():RC.http.Response;

        apiCall(options:IOptions):RC.http.Response;

        authCall(options:IOptions):RC.http.Response;

        get(url:string, options?:IOptions):RC.http.Response;

        post(url:string, options:IOptions):RC.http.Response;

        put(url:string, options:IOptions):RC.http.Response;

        remove(url:string, options?:IOptions):RC.http.Response; // Could be also delete, but it is a reserved word

    }

}