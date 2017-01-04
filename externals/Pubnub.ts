declare class PUBNUB {
    constructor(subscribeKey:string);
    subscribe(options:any);
}

declare class PubnubFactory {
    init():PUBNUB;
}
