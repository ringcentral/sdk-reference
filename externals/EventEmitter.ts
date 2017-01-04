declare class EventEmitter {

    constructor();

    /**
     * This should follow language convention -- e.g. addListener in PHP
     */
    on(event: string, callback: (...args)=>void);

    /**
     * This should follow language convention -- e.g. removeListener in PHP
     */
    off(event: string, callback: (...args)=>void);

    /**
     * This should follow language convention -- e.g. dispatch in PHP
     */
    emit(event: string, ...args): any;

}