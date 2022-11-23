import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const result = input.filter((x) => input.includes(2020 - x));
    return result[0] * result[1];
};

const partTwo = (input) => {
    const combination = input.flatMap((i) => input.flatMap((j) => input.map((k) => [i, j, k])));
    const result = combination.filter((x) => x[0] + x[1] + x[2] === 2020);
    return result.flatMap((x) => x[0] * x[1] * x[2])[0];
};

['example1.txt', 'puzzle1.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n').map(Number);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
