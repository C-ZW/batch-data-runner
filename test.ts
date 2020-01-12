import BatchDataRunner from '.'

let bdr = new BatchDataRunner<number>(-1, 2, (data) => {
    return data.reduce((prev, cur) => prev + cur);
});

bdr.on('error', (err) => {
    console.error(err);
});

bdr.on('result', (result) => {
    console.log(result);
})

bdr.add(1)
bdr.add(2)
bdr.add(3)
bdr.add(4)
bdr.add(5)
bdr.add(6)
bdr.add(7)

bdr.exit();