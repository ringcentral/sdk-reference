/// <reference path="../externals/index.ts" />

module RingCentral.ReferenceSDK.platform {

    export declare interface IAuthData {
        remember:boolean;
        token_type:string;
        access_token:string;
        expires_in:number;
        refresh_token:string;
        refresh_token_expires_in:number;
        scope:string;
        owner_id:string;
    }

    export declare class Auth {

        private _data:IAuthData;

        constructor();

        data():IAuthData;

        setData(data:IAuthData):Auth;

        reset():Auth;

        tokenType():string;

        accessToken():string;

        accessTokenValid():boolean;

        refreshToken():string;

        refreshTokenValid():boolean;

        /**
         * This is used in JS SDK to store Access/Refresh tokens TTL setting
         */
        remember():boolean;

        setRemember(remember?:boolean):Auth;

    }

}