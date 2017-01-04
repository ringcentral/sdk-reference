module RingCentral.ReferenceSDK.subscription {

    export declare interface IDeliveryMode {
        transportType: string;
        encryption: boolean;
        address: string;
        subscriberKey: string;
        secretKey: string;
    }

    export declare interface ISubscription {
        eventFilters: string[];
        expirationTime: string;
        expiresIn: number;
        deliveryMode: IDeliveryMode;
        id: string;
        creationTime: string;
        status: string;
        uri: string;
    }

    export declare interface IOptions {
        events: string[];
    }

    export class Subscription {

        private _platform:platform.Platform;
        private _pubnubFactory:PubnubFactory;
        private _eventFilters:string[];
        private _subscription:ISubscription;

        constructor(platform:platform.Platform, pubnubFactory:PubnubFactory) {
            this._platform = platform;
            this._pubnubFactory = pubnubFactory;
        }

        // Working with events

        /**
         * Append more events to existing array
         */
        addEvents(events:string[]):Subscription {
            this._eventFilters = this._eventFilters.concat(events);
            return this;
        }

        /**
         * Replace the whole events array with a new one
         */
        setEvents(events:string[]):Subscription {
            this._eventFilters = events;
            return this;
        }

        // Lifecycle

        /**
         * Must verify that this._subscription object exists and has all the required fields: id, deliveryMode, etc.
         */
        alive():boolean {
            return this._subscription &&
                   this._subscription.id &&
                   this._subscription.deliveryMode &&
                   this._subscription.deliveryMode.subscriberKey &&
                   this._subscription.deliveryMode.address;
        }

        /**
         * If options.event were provided it must replace existing events
         */
        register(options?:IOptions):http.ApiResponse {
            if (this.alive()) {
                return this.renew(options);
            } else {
                return this.subscribe(options);
            }
        }

        /**
         * If options.event were provided it must replace existing events
         */
        subscribe(options?:IOptions):http.ApiResponse;

        /**
         * If options.event were provided it must replace existing events
         */
        renew(options?:IOptions):http.ApiResponse;

        remove():http.ApiResponse;

        /**
         * This must be called by subscribe() and renew() in order to start renew timer and subscribe at PUBNUB
         * Client must call register afterwards
         * Should also update local eventFilters to actual eventFilters
         * @param subscription
         */
        setSubscription(subscription:ISubscription);

        /**
         * Must reset subscription object and disconnect from PUBNUB
         * This method resets subscription at client side but backend is not notified
         */
        reset();

        /**
         * Returns current subscription data
         */
        subscription():ISubscription;

        // Observable

        /**
         * This should follow language convention -- e.g. addListener in PHP
         */
        on(event:string, callback:(...args)=>void):Subscription;

        /**
         * This should follow language convention -- e.g. addListener in PHP
         */
        off(event:string, callback:(...args)=>void):Subscription;

        /**
         * This should follow language convention -- e.g. addListener in PHP
         */
        emit(event:string, ...args):any;

        /**
         *
         * @return {string[]}
         */
        private createFullUrlsFromEventFilters():string[] {
            return this._eventFilters.map((event) => {
                return this._platform.createUrl(event);
            });
        }

        private subscribeAtPubnub() {
            this._pubnubFactory.init().subscribe(this._subscription);
        }

        /**
         * Must decode the AES-encrypted message (128-bit, mode ECB, padding PKCS7) and return it as JSON object
         * It could be useful to use PUBNUB to decrypt
         */
        private decrypt(message:string):any;

        /**
         * Internal method provided to PUBNUB as a callback
         * Must emit decrypted message
         */
        private notify(pubnubMessage) {
            this.emit('notification', this.decrypt(pubnubMessage));
        }

    }

}