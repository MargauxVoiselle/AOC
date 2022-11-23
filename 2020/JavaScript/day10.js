import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    let currentJoltage = 0;
    let i = 0;
    let result = [0, 0];
    while (input[i] - currentJoltage <= 3) {
        switch (input[i] - currentJoltage) {
            case 1:
                result[0]++;
                break;
            case 3:
                result[1]++;
                break;
            default:
                break;
        }
        currentJoltage = input[i];
        i++;
    }
    return result[0] * result[1];
};

const pathLeft = (input, map, index) => {
    if (map.has(index)) return map.get(index);
    if (index == input.length - 1) return 1;
    const result = [];
    for (let i = index + 1; i <= Math.min(index + 3, input.length - 1); i++) {
        if (input[i] - input[index] <= 3) result.push(pathLeft(input, map, i));
    }
    const sum = result.reduce((acc, cur) => acc + cur, 0);
    map.set(index, sum);
    return sum;
};

const partTwo = (input) => {
    const map = new Map();
    return pathLeft(input, map, 0);
};

['example10.txt', 'puzzle10.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map(Number)
        .sort(function (a, b) {
            return a - b;
        });
    input.unshift(0);
    input.push(input[input.length - 1] + 3);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
