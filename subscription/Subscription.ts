module RC.subscription {

    declare interface IDeliveryMode {
        transportType: string;
        encryption: boolean;
        address: string;
        subscriberKey: string;
        secretKey: string;
    }

    declare interface ISubscription {
        eventFilters: string[];
        expirationTime: string;
        expiresIn: number;
        deliveryMode: IDeliveryMode;
        id: string;
        creationTime: string;
        status: string;
        uri: string;
    }

    declare class PUBNUB {

        constructor(subscribeKey:string);

    }

    declare interface IOptions {
        events: string[];
    }

    declare class Subscription {

        private platform:RC.platform.Platform;
        private pubnub:PUBNUB;
        private eventFilters:string[];
        private subscription:ISubscription;

        constructor(platform:RC.platform.Platform);

        addEvents(events:string[]):Subscription;

        setEvents(events:string[]):Subscription;

        register(options?:IOptions):RC.http.Response;

        renew(options?:IOptions):RC.http.Response;

        subscribe(options?:IOptions):RC.http.Response;

        remove(options?:IOptions):RC.http.Response;

        isSubscribed():boolean;

        on(event:string, callback:(...args)=>void):Subscription;

        off(event:string, callback:(...args)=>void):Subscription;

        emit(event:string):any;

        private getFullEventFilters():string[];

        private updateSubscription(subscription:ISubscription);

        private unsubscribe();

        private subscribeAtPubnub();

        private notify();

    }

}