import * as fs from 'fs';

const timer = (script: Function, input: number[]) => {
    var start: number = performance.now();
    script(input);
    var end: number = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input: number[]): number => {
    const result: number[] = input.filter((x) => input.includes(2020 - x));
    return result[0] * result[1];
};

const partTwo = (input: number[]) => {
    return input
        .flatMap((i) => input.flatMap((j) => input.map((k) => [i, j, k])))
        .filter((x) => x[0] + x[1] + x[2] === 2020)
        .flatMap((x) => x[0] * x[1] * x[2])[0];
};

['example1.txt', 'puzzle1.txt'].forEach((file) => {
    const input: number[] = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n').map(Number);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
