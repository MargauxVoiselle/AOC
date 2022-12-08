import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const isVisible = (input, row, column) => {
    let visible = true;
    if (row === 0 || row === input.length || column === 0 || column === input[0].length) return true;
    for (let i = 0; i < row; i++) {
        if (input[i][column] >= input[row][column]) visible = false;
    }
    if (visible) return true;
    visible = true;
    for (let i = row + 1; i < input.length; i++) {
        if (input[i][column] >= input[row][column]) visible = false;
    }
    if (visible) return true;
    visible = true;
    for (let j = 0; j < column; j++) {
        if (input[row][j] >= input[row][column]) visible = false;
    }
    if (visible) return true;
    visible = true;
    for (let j = column + 1; j < input[0].length; j++) {
        if (input[row][j] >= input[row][column]) visible = false;
    }
    if (visible) return true;
    return false;
};

const partOne = (input) => {
    let result = 0;
    for (let row = 0; row < input.length; row++) {
        for (let column = 0; column < input[0].length; column++) {
            if (isVisible(input, row, column)) result++;
        }
    }
    return result;
};

const countVisible = (input, row, column) => {
    if (row === 0 || row === input.length || column === 0 || column === input[0].length) return 0;
    let treesVisibleUp = 1;
    let i = 1;
    while (i < row + 1 && input[row - i][column] < input[row][column]) {
        treesVisibleUp++;
        i++;
    }
    if (i === row + 1) treesVisibleUp--;

    let treesVisibleDown = 1;
    i = row + 1;
    while (i < input.length && input[i][column] < input[row][column]) {
        treesVisibleDown++;
        i++;
    }
    if (i === input.length) treesVisibleDown--;

    let treesVisibleLeft = 1;
    let j = 1;
    while (j < column + 1 && input[row][column - j] < input[row][column]) {
        treesVisibleLeft++;
        j++;
    }
    if (j === column + 1) treesVisibleLeft--;

    let treesVisibleRight = 1;
    j = column + 1;
    while (j < input[0].length && input[row][j] < input[row][column]) {
        treesVisibleRight++;
        j++;
    }
    if (j === input[0].length) treesVisibleRight--;
    return treesVisibleDown * treesVisibleLeft * treesVisibleRight * treesVisibleUp;
};

const partTwo = (input) => {
    let highestScore = 0;
    for (let row = 0; row < input.length; row++) {
        for (let column = 0; column < input[0].length; column++) {
            highestScore = Math.max(highestScore, countVisible(input, row, column));
        }
    }
    return highestScore;
};

['example8.txt', 'puzzle8.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
