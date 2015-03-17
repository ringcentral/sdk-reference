module RC.platform {

    export declare interface IAuthData {
        token_type:string;

        access_token:string;
        expires_in:number;
        expire_time:number;

        refresh_token:string;
        refresh_token_expires_in:number;
        refresh_token_expire_time:number;

        scope:string;
        owner_id:string;
    }

    export declare class Auth {

        private remember:boolean;

        private token_type:string;

        private access_token:string;
        private expires_in:number;
        private expire_time:number;

        private refresh_token:string;
        private refresh_token_expires_in:number;
        private refresh_token_expire_time:number;

        private scope:string;
        private owner_id:string;

        constructor();

        setData(data:IAuthData):Auth;

        getData():IAuthData;

        reset():IAuthData;

        getAccessToken():string;

        getRefreshToken():string;

        getTokenType():string;

        isAccessTokenValid():boolean;

        isRefreshTokenValid():boolean;

        setRemember(remember:boolean):Auth;

        isRemember():boolean;

    }

}