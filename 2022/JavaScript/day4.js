import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    return input.filter(
        (pairs) => (pairs[0] >= pairs[2] && pairs[1] <= pairs[3]) || (pairs[2] >= pairs[0] && pairs[3] <= pairs[1])
    ).length;
};

const partTwo = (input) => {
    return input.filter(
        (pairs) =>
            (pairs[0] >= pairs[2] && pairs[0] <= pairs[3]) ||
            (pairs[1] >= pairs[2] && pairs[1] <= pairs[3]) ||
            (pairs[2] >= pairs[0] && pairs[2] <= pairs[1]) ||
            (pairs[3] >= pairs[0] && pairs[3] <= pairs[1])
    ).length;
};

['example4.txt', 'puzzle4.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((pairs) => pairs.split(/-|,/))
        .map((pairs) => pairs.map((ID) => Number(ID)));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
