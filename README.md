# Batch Data Runner

Collect data to do the batch operation, when buffer size is greather than limit or interval timer is triggerd.

## Installation
> npm install batch-data-runner

## Usage
```
// 1. If timeInterval = -1, mean no timeInterval.
// 2. If sizeLimit = -1, mean no size limit.
constructor(timeInterval: number, sizeLimit: number, callback: (data: T[]) => void)

add(data: T) 
on(event: 'error' | 'result', listener: (...args: any[]) => void)
```

## Examples
> Summation example

### Set time interval and size limit both
```ts
// run every 100 milisecond or size greater than 2.
let batchRunner = new BatchDataRunner<number>(100, 2, (data) => {
    return data.reduce((prev, cur) => prev + cur);
});
```

### Set time Interval only
```ts
// run every 100 milisecond.
let batchRunner = new BatchDataRunner<number>(100, -1, (data) => {
    return data.reduce((prev, cur) => prev + cur);
});
```

### Set size limit only
```ts
// run when size greater than 2.
let batchRunner = new BatchDataRunner<number>(-1, 2, (data) => {
    return data.reduce((prev, cur) => prev + cur);
});
```

### Add data 
```ts
batchRunner.add(1)
batchRunner.add(2)
batchRunner.add(3)
batchRunner.add(4)
batchRunner.add(5)
batchRunner.add(6)
batchRunner.add(7)
```

### Clear runner
```ts
batchRunner.exit();
```

### Result Handle
```ts
batchRunner.on('result', (result) => {
    console.log(result);
})
```

### Error Handle
```ts
batchRunner.on('error', (err) => {
    console.error(err);
});
```

### Output
```ts
3
7
11
```

### Async Task
> Add async await key word
```ts
let batchRunner = new BatchDataRunner<number>(-1, 2, async (data) => {
    return data.reduce((prev, cur) => prev + cur);
});

batchRunner.on('result', async (result) => {
    console.log(await result);
})
```