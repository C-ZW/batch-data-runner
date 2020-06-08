"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
let batchRunner = new _1.default(-1, 2, async (data) => {
    return data.reduce((prev, cur) => prev + cur);
});
batchRunner.on('error', (err) => {
    console.error(err);
});
batchRunner.on('result', async (result) => {
    console.log(await result);
});
batchRunner.add(1);
batchRunner.add(2);
batchRunner.add(3);
batchRunner.add(4);
batchRunner.add(5);
batchRunner.add(6);
batchRunner.add(7);
batchRunner.exit();
//# sourceMappingURL=example.js.map