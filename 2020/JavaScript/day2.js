import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    return input.filter(
        (list) =>
            Number(list[0]) <= [...list[3]].filter((char) => char === list[2]).length &&
            [...list[3]].filter((char) => char === list[2]).length <= Number(list[1])
    ).length;
};

const partTwo = (input) => {
    return input.filter(
        (list) =>
            (list[3][Number(list[0]) - 1] === list[2] && list[3][Number(list[1]) - 1] != list[2]) ||
            (list[3][Number(list[0]) - 1] != list[2] && list[3][Number(list[1]) - 1] === list[2])
    ).length;
};

['example2.txt', 'puzzle2.txt'].forEach((file) => {
    const regularExp = /\-|\:\s|\s/;
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((list) => list.split(regularExp));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
