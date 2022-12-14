import * as fs from 'fs';

const timer = (script, input, part) => {
    let start = performance.now();
    script(input, part);
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

const findExtremum = (min_x, max_x, max_y, x, y) => {
    return [min_x > x ? y : min_x, max_x < x ? x : max_x, max_y < y ? y : max_y];
};

const parse = (input) => {
    let min_x = 500,
        max_x = 0,
        max_y = 0;
    const map = new Map();
    for (let line of input) {
        let x = line[0][0],
            y = line[0][1];
        [min_x, max_x, max_y] = findExtremum(min_x, max_x, max_y, line[0][0], line[0][1]);
        for (let i = 1; i < line.length; i++) {
            [min_x, max_x, max_y] = findExtremum(min_x, max_x, max_y, line[i][0], line[i][1]);
            let next_x = line[i][0],
                next_y = line[i][1];
            if (next_x === x) {
                for (let row = Math.min(y, next_y); row <= Math.max(y, next_y); row++) map.set(toString([x, row]), '#');
            } else if (next_y === y) {
                for (let col = Math.min(x, next_x); col <= Math.max(x, next_x); col++) map.set(toString([col, y]), '#');
            }
            (x = next_x), (y = next_y);
        }
    }
    return [map, min_x, max_x, max_y];
};

const solveParts = (input, part) => {
    const [map, min_x, max_x, max_y] = parse(input);
    const floor = max_y + 2;
    let blocked = false,
        infinite = false,
        result = 0;
    const dirs = [
        [0, 1],
        [-1, 1],
        [1, 1],
    ];
    while ((!infinite && part === 1) || (!blocked && part === 2)) {
        let sandPos = [500, 0];
        let isResting = false;
        while (!isResting) {
            let canMove = false;
            for (const dir of dirs) {
                let nextPos = toString([sandPos[0] + dir[0], sandPos[1] + dir[1]]);
                if (!map.has(nextPos)) {
                    sandPos = toNumber(nextPos);
                    canMove = true;
                    break;
                }
            }
            if (!canMove || (part === 2 && canMove && sandPos[1] === floor - 1)) {
                map.set(toString([sandPos[0], sandPos[1]]), 'o');
                isResting = true;
                result++;
            } else if (part === 1 && canMove && (sandPos[0] >= max_x || sandPos[0] <= min_x || sandPos[1] >= max_y)) {
                infinite = true;
                break;
            }
        }
        if (map.has(toString([500, 0])) && part === 2) {
            blocked = true;
        }
    }
    return result;
};

['example14.txt', 'puzzle14.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .split('\n')
        .map((line) => line.split(' -> '))
        .map((line) => line.map((coords) => coords.split(',').map((coord) => Number(coord))));
    console.log(
        `Result of part one for ${file} : ` + solveParts(input, 1) + ` (executed in ${timer(solveParts, input, 1)} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` + solveParts(input, 2) + ` (executed in ${timer(solveParts, input, 2)} ms)`
    );
});
