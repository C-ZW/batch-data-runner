"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
function paramCheck(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
/**
 *
 * git remote add origin, when buffer size is granther than limit or interval time is triggerd.
 */
class BatchDataRunner {
    /**
     * 1. If timeInterval = -1, mean no timeInterval.
     * 2. If sizeLimit = -1, mean no size limit.
     *
     * @param timeInterval milisecond
     * @param sizeLimit integer
     * @param callback
     */
    constructor(timeInterval, sizeLimit, callback) {
        paramCheck(timeInterval >= -1, 'timeInterval must >= -1');
        paramCheck(sizeLimit >= -1, 'timeInterval must >= -1');
        paramCheck(callback !== undefined && callback !== null, 'callback must defined');
        this.buffer = [];
        this.emitter = new events_1.EventEmitter();
        this.sizeLimit = sizeLimit;
        this.callback = callback;
        if (timeInterval >= 0) {
            this.timer(timeInterval);
        }
    }
    /**
     * add data to buffer
     * @param data
     */
    add(data) {
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
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    /**
     * clear buffer and interval
     */
    exit() {
        this.buffer.length = 0;
        this.emitter.removeAllListeners();
        if (this.timeout !== undefined) {
            clearInterval(this.timeout);
        }
    }
    timer(timeInterval) {
        this.timeout = setInterval(() => {
            if (this.buffer.length !== 0) {
                this.run();
            }
        }, timeInterval);
    }
    run() {
        try {
            let batchData = this.buffer;
            this.buffer = [];
            this.emitter.emit('result', this.callback(batchData));
        }
        catch (err) {
            this.emitter.emit('error', err);
        }
    }
}
exports.default = BatchDataRunner;
//# sourceMappingURL=index.js.map