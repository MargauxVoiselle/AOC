import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {};

const partTwo = (input) => {};

['example1.txt', 'puzzle1.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n').map(Number);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
