module RingCentral.ReferenceSDK.pubnub {

    export class PUBNUB {
        constructor(subscribeKey:string);

        subscribe(options:any) {}
    }

    export class PUBNUBMock extends PUBNUB {
        constructor(subscribeKey:string) {
            super(subscribeKey);
        }
    }

    export class PubnubFactory {

        private _useMock:boolean;

        constructor(useMock?:boolean) {
            this._useMock = !!useMock;
        }

        getPubnub():PUBNUB {
            if (this._useMock) return this.getPubnubMock();
            return this.getPubnubReal();
        }

        private getPubnubReal():PUBNUB;

        private getPubnubMock():PUBNUBMock;

    }

}