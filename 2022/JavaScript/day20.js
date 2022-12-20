import * as fs from 'fs';

const timer = (script, input, number, part) => {
    let start = performance.now();
    script(input, number, part);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const mixing = (input, number) => {
    const result = input.map((number, index) => [number, index]);
    for (let count = 0; count < number; count++) {
        for (let i = 0; i < result.length; i++) {
            const index = result.findIndex((element) => element[1] === i);
            const number = result[index][0];
            result.splice(index, 1);
            result.splice((index + number) % result.length, 0, [number, i]);
        }
    }
    return result.map((element) => element[0]);
};

const solveParts = (input, number, part) => {
    if (part === 2) input = input.map((number) => number * 811589153);
    const mixedInput = mixing(input, number);
    const index = mixedInput.findIndex((number) => number === 0);
    let result =
        mixedInput[(index + 1000) % mixedInput.length] +
        mixedInput[(index + 2000) % mixedInput.length] +
        mixedInput[(index + 3000) % mixedInput.length];
    return result;
};

['example20.txt', 'puzzle20.txt'].forEach((file) => {
    let input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n').map(Number);
    console.log(
        `Result of part one for ${file} : ` +
            solveParts(input, 1, 1) +
            ` (executed in ${timer(solveParts, input, 1, 1)} ms)`
    );
    console.log(
        `Result of part one for ${file} : ` +
            solveParts(input, 10, 2) +
            ` (executed in ${timer(solveParts, input, 10, 2)} ms)`
    );
});
