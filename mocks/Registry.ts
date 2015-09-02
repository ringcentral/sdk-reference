module RingCentral.ReferenceSDK.mocks {

    export class Registry {

        _mocks:Mock[] = [];

        add(mock:Mock) {
            this._mocks.push(mock);
            return this;
        }

        clear() {
            this._mocks = [];
            return this;
        }

        find(request:native.Request):Mock {

            var mock = this._mocks.shift();

            if (!mock) throw new Error('No mock in registry for request ' + request.method + ' ' + request.url);

            if (!mock.test(request)) throw new Error('Wrong request ' + request.method + ' ' + request.url +
                                                     ' for expected mock ' + mock.method() + ' ' + mock.path());

            return mock;

        }

    }

}