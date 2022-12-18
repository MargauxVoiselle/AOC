import * as fs from 'fs';

const timer = (script, input, numberRock) => {
    let start = performance.now();
    script(input, numberRock);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const toString = (number) => {
    return number[0] + ',' + number[1];
};

const toNumber = (string) => {
    const number = string.split(',');
    return [Number(number[0]), Number(number[1])];
};

const rocks = [
    [['#', '#', '#', '#']],
    [
        ['.', '#', '.'],
        ['#', '#', '#'],
        ['.', '#', '.'],
    ],
    [
        ['.', '.', '#'],
        ['.', '.', '#'],
        ['#', '#', '#'],
    ],
    [['#'], ['#'], ['#'], ['#']],
    [
        ['#', '#'],
        ['#', '#'],
    ],
];

const getHeight = (chamber) => {
    return (
        [...chamber].map((coord) => toNumber(coord)[1]).reduce((maxHeight, height) => Math.max(maxHeight, height), -1) +
        1
    );
};

const moveRock = (input, moveIndex, currentRock, width, chamber) => {
    while (true) {
        let move = input[moveIndex] === '>' ? 1 : -1;
        moveIndex = (moveIndex + 1) % input.length;

        let xCollision = false;
        for (let y = 0; y < rocks[currentRock.type].length; y++) {
            for (let x = 0; x < rocks[currentRock.type][y].length; x++) {
                if (rocks[currentRock.type][y][x] !== '#') continue;
                if (
                    currentRock.position.x + x + move < 0 ||
                    currentRock.position.x + x + move >= width ||
                    chamber.has(toString([currentRock.position.x + x + move, currentRock.position.y - y]))
                )
                    xCollision = true;
            }
        }
        if (!xCollision) currentRock.position.x += move;
        let yCollision = false;
        for (let y = 0; y < rocks[currentRock.type].length; y++) {
            for (let x = 0; x < rocks[currentRock.type][y].length; x++) {
                if (rocks[currentRock.type][y][x] !== '#') continue;
                if (
                    currentRock.position.y - y - 1 < 0 ||
                    chamber.has(toString([currentRock.position.x + x, currentRock.position.y - y - 1]))
                )
                    yCollision = true;
            }
        }
        if (yCollision) break;
        else currentRock.position.y--;
    }
    return [currentRock, moveIndex];
};

const solvePart = (input, numberRocks) => {
    let currentRock = { position: { x: 0, y: 0 }, type: -1 };
    let count = 0,
        moveIndex = 0,
        chamber = new Set(),
        width = 7,
        pastStates = {},
        extraHeight = 0;
    while (count != numberRocks) {
        currentRock.type = (currentRock.type + 1) % rocks.length;
        let highest = getHeight(chamber);
        currentRock.position = { x: 2, y: highest + 3 + rocks[currentRock.type].length - 1 };
        [currentRock, moveIndex] = moveRock(input, moveIndex, currentRock, width, chamber);

        for (let y = 0; y < rocks[currentRock.type].length; y++) {
            for (let x = 0; x < rocks[currentRock.type][y].length; x++) {
                if (rocks[currentRock.type][y][x] !== '#') continue;
                chamber.add(toString([currentRock.position.x + x, currentRock.position.y - y]));
            }
        }

        if (numberRocks === 1000000000000) {
            let state = toString([moveIndex, currentRock.type]) + ',';
            for (let y = highest; y >= highest - 10; y--) {
                let lineState = '';
                for (let x = 0; x < width; x++) lineState += chamber.has(toString([x, y])) ? '#' : '.';
                state += lineState + ',';
            }
            if (pastStates[state] != null) {
                let changedRockCount = count - pastStates[state].count;
                let changedHeight = getHeight(chamber) - pastStates[state].height;
                let pattern = Math.floor((numberRocks - pastStates[state].count) / changedRockCount) - 1;
                extraHeight += pattern * changedHeight;
                count += pattern * changedRockCount;
            } else {
                pastStates[state] = { height: getHeight(chamber), count };
            }
        }
        count++;
    }
    return extraHeight + getHeight(chamber);
};

['example17.txt', 'puzzle17.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('');
    console.log(
        `Result of part one for ${file} : ` +
            solvePart(input, 2022) +
            ` (executed in ${timer(solvePart, input, 2022)} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` +
            solvePart(input, 1000000000000) +
            ` (executed in ${timer(solvePart, input, 1000000000000)} ms)`
    );
});
