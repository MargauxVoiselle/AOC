import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const sumCalories = (input) => {
    return input.map((list) => {
        return list.reduce((acc, curr) => acc + curr, 0);
    });
};

const partOne = (input) => {
    return Math.max(...sumCalories(input));
};

const partTwo = (input) => {
    const calories = sumCalories(input);
    const topElves = [];
    for (let i = 0; i < 3; i++) {
        topElves.push(Math.max(...calories));
        calories.splice(calories.indexOf(topElves[i]), 1);
    }
    return topElves.reduce((acc, cur) => acc + cur, 0);
};

['example1.txt', 'puzzle1.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n\n')
        .map((list) => list.split('\n'))
        .map((list) => list.map((calories) => Number(calories)));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
