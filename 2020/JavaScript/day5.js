import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const determinateSeat = (input) => {
    let currentSeatID;
    return input.map((list) => {
        let row = [0, 127];
        let column = [0, 7];
        Array.from(list, (v, i) => {
            if (v === 'F') {
                if (i === 6) {
                    row = row[0];
                } else {
                    row[1] = Math.floor(row[1] - (row[1] - row[0]) / 2);
                }
            } else if (v === 'B') {
                if (i === 6) {
                    row = row[1];
                } else {
                    row[0] = Math.ceil(row[0] + (row[1] - row[0]) / 2);
                }
            } else if (v === 'L') {
                if (i === 9) {
                    column = column[0];
                } else {
                    column[1] = Math.floor(column[1] - (column[1] - column[0]) / 2);
                }
            } else if (v === 'R') {
                if (i === 9) {
                    column = column[1];
                } else {
                    column[0] = Math.ceil(column[0] + (column[1] - column[0]) / 2);
                }
            }
        });
        return row * 8 + column;
    });
};

const partOne = (input) => {
    return Math.max(...determinateSeat(input));
};

const partTwo = (input) => {
    let seatID = determinateSeat(input);
    return seatID.filter((x) => !seatID.includes(x + 1) && seatID.includes(x + 2))[0] + 1;
};

['example5.txt', 'puzzle5.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((list) => list.split(''));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
