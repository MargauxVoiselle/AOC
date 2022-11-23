import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const move = (input, right, down) => {
    let i = 0;
    return input.filter((line) => {
        if (input.indexOf(line) === 0) {
            i += right;
            return false;
        } else if (input.indexOf(line) % 2 === 1 && down === 2) {
            return false;
        } else {
            if (i >= line.length) {
                i -= line.length;
            }
            i += right;
            return line[i - right] === '#';
        }
    }).length;
};

const partOne = (input) => {
    return move(input, 3, 1);
};

const partTwo = (input) => {
    return move(input, 1, 1) * move(input, 3, 1) * move(input, 5, 1) * move(input, 7, 1) * move(input, 1, 2);
};

['example3.txt', 'puzzle3.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((list) => list.split(''));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
