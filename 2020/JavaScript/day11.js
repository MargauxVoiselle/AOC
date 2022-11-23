import { count } from 'console';
import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const findAdjacentOccupied = (input, i, j) => {
    let result = 0;
    if (i === 0) {
        if (j === 0) {
            if (input[i][j + 1] === '#') result++;
            if (input[i + 1][j] === '#') result++;
            if (input[i + 1][j + 1] === '#') result++;
        } else if (j === input[0].length - 1) {
            if (input[i][j - 1] === '#') result++;
            if (input[i + 1][j - 1] === '#') result++;
            if (input[i + 1][j] === '#') result++;
        } else {
            if (input[i][j - 1] === '#') result++;
            if (input[i][j + 1] === '#') result++;
            if (input[i + 1][j - 1] === '#') result++;
            if (input[i + 1][j] === '#') result++;
            if (input[i + 1][j + 1] === '#') result++;
        }
    } else if (i === input.length - 1) {
        if (j === 0) {
            if (input[i - 1][j] === '#') result++;
            if (input[i - 1][j + 1] === '#') result++;
            if (input[i][j + 1] === '#') result++;
        } else if (j === input[0].length - 1) {
            if (input[i - 1][j - 1] === '#') result++;
            if (input[i - 1][j] === '#') result++;
            if (input[i][j - 1] === '#') result++;
        } else {
            if (input[i - 1][j - 1] === '#') result++;
            if (input[i - 1][j] === '#') result++;
            if (input[i - 1][j + 1] === '#') result++;
            if (input[i][j - 1] === '#') result++;
            if (input[i][j + 1] === '#') result++;
        }
    } else {
        if (input[i - 1][j - 1] === '#') result++;
        if (input[i - 1][j] === '#') result++;
        if (input[i - 1][j + 1] === '#') result++;
        if (input[i][j - 1] === '#') result++;
        if (input[i][j + 1] === '#') result++;
        if (input[i + 1][j - 1] === '#') result++;
        if (input[i + 1][j] === '#') result++;
        if (input[i + 1][j + 1] === '#') result++;
    }
    return result;
};

const updateSeat = (input) => {
    const inputUpdated = [];
    for (let list of input) {
        let listUpdated = [];
        for (let element of list) {
            listUpdated.push(element);
        }
        inputUpdated.push(listUpdated);
    }
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (findAdjacentOccupied(input, i, j) === 0 && input[i][j] === 'L') inputUpdated[i][j] = '#';
            else if (findAdjacentOccupied(input, i, j) >= 4 && input[i][j] === '#') inputUpdated[i][j] = 'L';
            else inputUpdated[i][j] = input[i][j];
        }
    }
    return inputUpdated;
};

const countOccupiedSeat = (input) => {
    return input.flat(1).filter((x) => x === '#').length;
};

const partOne = (input) => {
    let inputUpdated = updateSeat(input);
    while (input.toString() !== inputUpdated.toString()) {
        input = inputUpdated;
        inputUpdated = updateSeat(input);
    }
    return countOccupiedSeat(input);
};

['example11.txt', 'puzzle11.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((list) => list.split(''));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    // console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
