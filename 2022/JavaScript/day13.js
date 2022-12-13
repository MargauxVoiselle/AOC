import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const compare = (left, right) => {
    let i = 0;
    while (i < left.length && i < right.length) {
        if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
            if (left[i] === right[i]) i++;
            else return left[i] - right[i];
        } else {
            let result = compare([left[i]].flat(), [right[i]].flat());
            if (result === 0) i++;
            else return result;
        }
    }
    return left.length - right.length;
};

const partOne = (input) => {
    let result = 0;
    input.forEach((pairs, i) => {
        if (compare(pairs[0], pairs[1]) < 0) {
            result += i + 1;
        }
    });
    return result;
};

const partTwo = (input) => {
    const dividers = [[[2]], [[6]]];
    let pairs = [...input.flat(), ...dividers];
    pairs = pairs.sort((a, b) => compare(a, b));
    return (pairs.indexOf(dividers[0]) + 1) * (pairs.indexOf(dividers[1]) + 1);
};

['example13.txt', 'puzzle13.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .split('\n\n')
        .map((pairs) => pairs.split('\n').map((pair) => eval(pair)));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
