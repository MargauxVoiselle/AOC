import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    input = input.map((rucksacks) => [
        rucksacks.substring(0, rucksacks.length / 2),
        rucksacks.substring(rucksacks.length / 2),
    ]);
    let result = 0;
    for (let rucksacks of input) {
        const itemShared = [];
        for (let item of rucksacks[0]) {
            if (rucksacks[1].includes(item) && !itemShared.includes(item)) {
                itemShared.push(item);
                if (item.charCodeAt() > 96) result += item.charCodeAt() - 96;
                else result += item.charCodeAt() - 38;
            }
        }
    }
    return result;
};

const partTwo = (input) => {
    let result = 0;
    let i = 0;
    while (i < input.length - 2) {
        const itemShared = [];
        for (let item of input[i]) {
            if (input[i + 1].includes(item) && input[i + 2].includes(item) && !itemShared.includes(item)) {
                itemShared.push(item);
                if (item.charCodeAt() > 96) result += item.charCodeAt() - 96;
                else result += item.charCodeAt() - 38;
            }
        }
        i += 3;
    }
    return result;
};

['example3.txt', 'puzzle3.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
