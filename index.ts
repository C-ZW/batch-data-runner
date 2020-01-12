import { EventEmitter } from 'events'

function paramCheck(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

/**
 * 
 * git remote add origin, when buffer size is granther than limit or interval time is triggerd.
 */
export default class BatchDataRunner<T> {
    private buffer: T[];
    private emitter: EventEmitter
    private timeInterval: number
    private sizeLimit: number;
    private callback: (data: T[]) => void;

    private timeout: NodeJS.Timeout | undefined;

    /**
     * 1. If timeInterval = -1, mean no timeInterval.
     * 2. If sizeLimit = -1, mean no size limit.
     * 
     * @param timeInterval milisecond
     * @param sizeLimit integer
     * @param callback 
     */
    constructor(timeInterval: number, sizeLimit: number, callback: (data: T[]) => void) {
        paramCheck(timeInterval >= -1, 'timeInterval must >= -1');
        paramCheck(sizeLimit >= -1, 'timeInterval must >= -1');
        paramCheck(callback !== undefined && callback !== null, 'callback must defined');

        this.buffer = [];
        this.emitter = new EventEmitter();
        this.sizeLimit = sizeLimit;
        this.timeInterval = timeInterval;
        this.callback = callback;

        if (timeInterval >= 0) {
            this.timer();
        }
    }

    /**
     * add data to buffer
     * @param data 
     */
    public add(data: T) {
        this.buffer.push(data);
        if (this.buffer.length >= this.sizeLimit) {
            this.run();
        }
    }

    /**
     * current support 'error', 'result' event.
     * @param event 
     * @param listener 
     */
    public on(event: 'error' | 'result', listener: (...args: any[]) => void) {
        this.emitter.on(event, listener);
    }

    /**
     * clear buffer and interval
     */
    public exit() {
        this.buffer.length = 0;
        this.emitter.removeAllListeners();
        if (this.timeout !== undefined) {
            clearInterval(this.timeout);
        }
    }

    private timer() {
        this.timeout = setInterval(() => {
            if (this.buffer.length !== 0) {
                this.run();
            }
        }, this.timeInterval);
    }

    private run() {
        try {
            let batchData = this.buffer;
            this.buffer = [];
            this.emitter.emit('result', this.callback(batchData));
        } catch (err) {
            this.emitter.emit('error', err);
        }
    }
}