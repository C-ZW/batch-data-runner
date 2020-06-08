/**
 *
 * git remote add origin, when buffer size is granther than limit or interval time is triggerd.
 */
export default class BatchDataRunner<T> {
    private buffer;
    private emitter;
    private sizeLimit;
    private callback;
    private timeout;
    /**
     * 1. If timeInterval = -1, mean no timeInterval.
     * 2. If sizeLimit = -1, mean no size limit.
     *
     * @param timeInterval milisecond
     * @param sizeLimit integer
     * @param callback
     */
    constructor(timeInterval: number, sizeLimit: number, callback: (data: T[]) => void);
    /**
     * add data to buffer
     * @param data
     */
    add(data: T): void;
    /**
     * current support 'error', 'result' event.
     * @param event
     * @param listener
     */
    on(event: 'error' | 'result', listener: (...args: any[]) => void): void;
    /**
     * clear buffer and interval
     */
    exit(): void;
    private timer;
    private run;
}
