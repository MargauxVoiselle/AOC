import * as fs from 'fs';

const timer = (script, input, part) => {
    let start = performance.now();
    script(input, part);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const directions = {
    '^': [-1, 0],
    '>': [0, 1],
    v: [1, 0],
    '<': [0, -1],
};

const movements = [
    [0, 0],
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const isOut = (y, x, map) => {
    return y < 0 || y > map.length - 1 || x < 0 || x > map[0].length - 1;
};

const findNewPos = (y, x, map) => {
    if (!isOut(y, x, map)) {
        return [y, x];
    }
    if (y < 0) y = map.length - 1;
    else if (y > map.length - 1) y = 0;
    else if (x < 0) x = map[0].length - 1;
    else if (x > map[0].length - 1) x = 0;
    return [y, x];
};

const getNextPos = (blizzards, y, x, direction) => {
    const movement = directions[direction];
    do {
        const newPosition = findNewPos(y + movement[0], x + movement[1], blizzards);
        y = newPosition[0];
        x = newPosition[1];
    } while (blizzards[y][x] == '#');
    return [y, x];
};

const updateBlizzards = (blizzards) => {
    const updatedBlizzards = blizzards.map((row) => {
        let line = new Array();
        for (let i = 0; i < row.length; i++) {
            line.push([]);
        }
        return line;
    });

    for (let y = 0; y < blizzards.length; y++) {
        for (let x = 0; x < blizzards[0].length; x++) {
            const content = blizzards[y][x];
            for (let blizzard of content) {
                if (blizzard === '#') {
                    updatedBlizzards[y][x] = ['#'];
                } else {
                    const nextPosition = getNextPos(blizzards, y, x, blizzard);
                    updatedBlizzards[nextPosition[0]][nextPosition[1]] = [
                        ...updatedBlizzards[nextPosition[0]][nextPosition[1]],
                        blizzard,
                    ];
                }
            }
        }
    }
    return updatedBlizzards;
};

const getNext = (blizzards, currentPosition) => {
    const nextPositions = [];
    for (let movement of movements) {
        const y = currentPosition[0] + movement[0];
        const x = currentPosition[1] + movement[1];
        const isNextPositionOutOfBounds = isOut(y, x, blizzards);
        if (isNextPositionOutOfBounds) {
            continue;
        }
        if (blizzards[y][x].length > 0) {
            continue;
        }
        nextPositions.push([y, x]);
    }
    return nextPositions;
};

const arrived = (current, end) => {
    return current[0] == end[0] && current[1] == end[1];
};

const explore = (blizzards, start, end) => {
    let currentPositions = [start];
    let timer = 0;
    while (true) {
        timer++;
        const futureOccupied = blizzards.map((row) => {
            let line = new Array();
            for (let i = 0; i < row.length; i++) {
                line.push(false);
            }
            return line;
        });
        blizzards = updateBlizzards(blizzards);
        for (let currentPosition of currentPositions) {
            const nextPositions = getNext(blizzards, currentPosition);
            if (nextPositions.length !== 0) {
                for (let nextPosition of nextPositions) {
                    futureOccupied[nextPosition[0]][nextPosition[1]] = true;
                }
            }
        }
        const nextPositions = [];
        for (let y = 0; y < blizzards.length; y++) {
            for (let x = 0; x < blizzards[0].length; x++) {
                const current = [y, x];
                if (futureOccupied[y][x]) {
                    if (arrived(current, end)) {
                        return {
                            timer,
                            blizzards,
                        };
                    }
                    nextPositions.push(current);
                }
            }
        }
        currentPositions = nextPositions;
    }
};

const solveParts = (input, part) => {
    let blizzards = input.map((line) => line.split('').map((content) => (content == '.' ? [] : [content])));
    const start = [0, 1];
    const end = [blizzards.length - 1, blizzards[0].length - 2];
    const go = explore(blizzards, start, end);
    blizzards = go.blizzards;
    if (part === 1) {
        return go.timer;
    } else {
        const back = explore(blizzards, end, start);
        blizzards = back.blizzards;
        const final = explore(blizzards, start, end);
        return go.timer + back.timer + final.timer;
    }
};

['example24.txt', 'puzzle24.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n');
    console.log(
        `Result of part one for ${file} : ` + solveParts(input, 1) + ` (executed in ${timer(solveParts, input, 1)} ms)`
    );
    console.log(
        `Result of part one for ${file} : ` + solveParts(input, 2) + ` (executed in ${timer(solveParts, input, 2)} ms)`
    );
});
