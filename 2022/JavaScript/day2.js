import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    let result = 0;
    const score = { X: 1, Y: 2, Z: 3 };
    for (let list of input) {
        if (
            (list[0] === 'A' && list[1] === 'X') ||
            (list[0] === 'B' && list[1] === 'Y') ||
            (list[0] === 'C' && list[1] === 'Z')
        ) {
            result += 3;
        } else if (
            (list[0] === 'C' && list[1] === 'X') ||
            (list[0] === 'B' && list[1] === 'Z') ||
            (list[0] === 'A' && list[1] === 'Y')
        ) {
            result += 6;
        }
        result += score[list[1]];
    }
    return result;
};

const partTwo = (input) => {
    let result = 0;
    const score = {
        X: { A: 3, B: 1, C: 2 },
        Y: { A: 4, B: 5, C: 6 },
        Z: { A: 8, B: 9, C: 7 },
    };
    for (let list of input) {
        result += score[list[1]][list[0]];
    }
    return result;
};

['example2.txt', 'puzzle2.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((list) => list.split(' '));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
