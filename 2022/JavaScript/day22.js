import * as fs from 'fs';

const timer = (script, input, inputType) => {
    let start = performance.now();
    if (inputType !== undefined) script(input, inputType);
    else script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const toString = (number) => {
    return number[0] + ',' + number[1];
};

const dirs = { right: { x: 1, y: 0 }, left: { x: -1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 } };
const facing = { right: 0, down: 1, left: 2, up: 3 };
const cubes = {
    example: {
        one: { x_min: 8, x_max: 11, y_min: 0, y_max: 3 },
        two: { x_min: 0, x_max: 3, y_min: 4, y_max: 7 },
        three: { x_min: 4, x_max: 7, y_min: 4, y_max: 7 },
        four: { x_min: 8, x_max: 11, y_min: 4, y_max: 7 },
        five: { x_min: 8, x_max: 11, y_min: 8, y_max: 11 },
        six: { x_min: 12, x_max: 15, y_min: 8, y_max: 11 },
    },
    puzzle: {
        one: { x_min: 50, x_max: 99, y_min: 0, y_max: 49 },
        two: { x_min: 100, x_max: 149, y_min: 0, y_max: 49 },
        three: { x_min: 50, x_max: 99, y_min: 50, y_max: 99 },
        four: { x_min: 0, x_max: 49, y_min: 100, y_max: 149 },
        five: { x_min: 50, x_max: 99, y_min: 100, y_max: 149 },
        six: { x_min: 0, x_max: 49, y_min: 150, y_max: 199 },
    },
};

const parse = (input) => {
    const instructions = input[1]
        .match(/[0-9]+|R|L/g)
        .map((instruction) => (instruction === 'R' || instruction === 'L' ? instruction : Number(instruction)));
    const map = new Map();
    let start = 0,
        found = false;
    let x_max = 0,
        y_max = 0;
    input[0].forEach((line, y) => {
        y_max = Math.max(y_max, y);
        line.forEach((element, x) => {
            x_max = Math.max(x_max, x);
            if (element !== ' ') {
                map.set(toString([y, x]), element);
                if (!found) {
                    start = [y, x];
                    found = true;
                }
            }
        });
    });
    return [start, instructions, map, x_max, y_max];
};

const changeDirection = (direction, instruction) => {
    switch (direction) {
        case 'right':
            return instruction === 'R' ? 'down' : 'up';
        case 'left':
            return instruction === 'R' ? 'up' : 'down';
        case 'up':
            return instruction === 'R' ? 'right' : 'left';
        case 'down':
            return instruction === 'R' ? 'left' : 'right';
    }
};

const partOne = (input) => {
    const [start, instructions, map, x_max, y_max] = parse(input);
    let direction = 'right';
    let current = start;
    instructions.forEach((instruction) => {
        if (!Number.isInteger(instruction)) {
            direction = changeDirection(direction, instruction);
        } else {
            for (let i = 0; i < instruction; i++) {
                let next = [current[0] + dirs[direction].y, current[1] + dirs[direction].x];
                if (map.get(toString(next)) === '.') current = next;
                else if (map.get(toString(next)) === '#') break;
                else {
                    let x, y;
                    switch (direction) {
                        case 'right':
                            (x = 0), (y = current[0]);
                            while (!map.has(toString([y, x]))) x++;
                            if (map.get(toString([y, x])) === '.') current = [y, x];
                            break;
                        case 'left':
                            (x = x_max), (y = current[0]);
                            while (!map.has(toString([y, x]))) x--;
                            if (map.get(toString([y, x])) === '.') current = [y, x];
                            break;
                        case 'up':
                            (x = current[1]), (y = y_max);
                            while (!map.has(toString([y, x]))) y--;
                            if (map.get(toString([y, x])) === '.') current = [y, x];
                            break;
                        case 'down':
                            (x = current[1]), (y = 0);
                            while (!map.has(toString([y, x]))) y++;
                            if (map.get(toString([y, x])) === '.') current = [y, x];
                            break;
                    }
                }
            }
        }
    });
    return 1000 * (current[0] + 1) + 4 * (current[1] + 1) + facing[direction];
};

const findCube = (inputType, x, y) => {
    if (
        cubes[inputType].one.x_min <= x &&
        x <= cubes[inputType].one.x_max &&
        cubes[inputType].one.y_min <= y &&
        y <= cubes[inputType].one.y_max
    )
        return 'one';
    if (
        cubes[inputType].two.x_min <= x &&
        x <= cubes[inputType].two.x_max &&
        cubes[inputType].two.y_min <= y &&
        y <= cubes[inputType].two.y_max
    )
        return 'two';
    if (
        cubes[inputType].three.x_min <= x &&
        x <= cubes[inputType].three.x_max &&
        cubes[inputType].three.y_min <= y &&
        y <= cubes[inputType].three.y_max
    )
        return 'three';
    if (
        cubes[inputType].four.x_min <= x &&
        x <= cubes[inputType].four.x_max &&
        cubes[inputType].four.y_min <= y &&
        y <= cubes[inputType].four.y_max
    )
        return 'four';
    if (
        cubes[inputType].five.x_min <= x &&
        x <= cubes[inputType].five.x_max &&
        cubes[inputType].five.y_min <= y &&
        y <= cubes[inputType].five.y_max
    )
        return 'five';
    if (
        cubes[inputType].six.x_min <= x &&
        x <= cubes[inputType].six.x_max &&
        cubes[inputType].six.y_min <= y &&
        y <= cubes[inputType].six.y_max
    )
        return 'six';
};

const partTwo = (input, inputType) => {
    const [start, instructions, map, x_max, y_max] = parse(input);
    let direction = 'right';
    let current = start;
    instructions.forEach((instruction) => {
        if (!Number.isInteger(instruction)) {
            direction = changeDirection(direction, instruction);
        } else {
            for (let i = 0; i < instruction; i++) {
                let next = [current[0] + dirs[direction].y, current[1] + dirs[direction].x];
                if (map.get(toString(next)) === '.') {
                    current = next;
                } else if (map.get(toString(next)) === '#') break;
                else {
                    let x, y, currentCube;
                    switch (direction) {
                        case 'right':
                            currentCube = findCube(inputType, current[1], current[0]);
                            if (inputType === 'example') {
                                switch (currentCube) {
                                    case 'one':
                                        (x = cubes[inputType].six.x_max),
                                            (y =
                                                cubes[inputType].six.y_min + (cubes[inputType].one.y_max - current[0]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'left';
                                        }
                                        break;
                                    case 'four':
                                        (x = cubes[inputType].six.x_min + (cubes[inputType].four.y_max - current[0])),
                                            (y = cubes[inputType].six.y_min);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'down';
                                        }
                                        break;
                                    case 'six':
                                        (x = cubes[inputType].one.x_max),
                                            (y =
                                                cubes[inputType].one.y_min + (cubes[inputType].six.y_max - current[0]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'left';
                                        }
                                        break;
                                }
                            } else {
                                switch (currentCube) {
                                    case 'two':
                                        (x = cubes[inputType].five.x_max),
                                            (y =
                                                cubes[inputType].five.y_min +
                                                (cubes[inputType].two.y_max - current[0]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'left';
                                        }
                                        break;
                                    case 'three':
                                        (x = cubes[inputType].two.x_max - (cubes[inputType].three.y_max - current[0])),
                                            (y = cubes[inputType].two.y_max);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'up';
                                        }
                                        break;
                                    case 'five':
                                        (x = cubes[inputType].two.x_max),
                                            (y =
                                                cubes[inputType].two.y_min +
                                                (cubes[inputType].five.y_max - current[0]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'left';
                                        }
                                        break;
                                    case 'six':
                                        (x = cubes[inputType].five.x_max - (cubes[inputType].six.y_max - current[0])),
                                            (y = cubes[inputType].five.y_max);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'up';
                                        }
                                        break;
                                }
                            }
                            break;
                        case 'left':
                            currentCube = findCube(inputType, current[1], current[0]);
                            if (inputType === 'example') {
                                switch (currentCube) {
                                    case 'one':
                                        (x = cubes[inputType].three.x_min + (cubes[inputType].one.y_max - current[0])),
                                            (y = cubes[inputType].three.y_min);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'down';
                                        }
                                        break;
                                    case 'two':
                                        (x = cubes[inputType].six.x_max),
                                            (y =
                                                cubes[inputType].six.y_min + (cubes[inputType].two.y_max - current[0]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'up';
                                        }
                                        break;
                                    case 'five':
                                        (x = cubes[inputType].three.x_min + (cubes[inputType].five.y_max - current[0])),
                                            (y = cubes[inputType].three.y_max);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'up';
                                        }
                                        break;
                                }
                            } else {
                                switch (currentCube) {
                                    case 'one':
                                        (x = cubes[inputType].four.x_min),
                                            (y =
                                                cubes[inputType].four.y_min +
                                                (cubes[inputType].one.y_max - current[0]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'right';
                                        }
                                        break;
                                    case 'three':
                                        (x = cubes[inputType].four.x_max - (cubes[inputType].three.y_max - current[0])),
                                            (y = cubes[inputType].four.y_min);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'down';
                                        }
                                        break;
                                    case 'four':
                                        (x = cubes[inputType].one.x_min),
                                            (y =
                                                cubes[inputType].one.y_min +
                                                (cubes[inputType].four.y_max - current[0]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'right';
                                        }
                                        break;
                                    case 'six':
                                        (x = cubes[inputType].one.x_max - (cubes[inputType].six.y_max - current[0])),
                                            (y = cubes[inputType].one.y_min);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'down';
                                        }
                                        break;
                                }
                            }
                            break;
                        case 'up':
                            currentCube = findCube(inputType, current[1], current[0]);
                            if (inputType === 'example') {
                                switch (currentCube) {
                                    case 'one':
                                        (x = cubes[inputType].two.x_max + (current[1] - cubes[inputType].one.x_min)),
                                            (y = cubes[inputType].two.y_min);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'down';
                                        }
                                        break;
                                    case 'two':
                                        (x = cubes[inputType].one.x_max - (current[1] - cubes[inputType].two.x_min)),
                                            (y = cubes[inputType].one.y_min);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'down';
                                        }
                                        break;
                                    case 'three':
                                        (x = cubes[inputType].one.x_min),
                                            (y =
                                                cubes[inputType].one.y_min +
                                                (current[1] - cubes[inputType].three.x_min));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'left';
                                        }
                                        break;
                                    case 'six':
                                        (x = cubes[inputType].four.y_min + (cubes[inputType].six.y_max - current[0])),
                                            (y = cubes[inputType].four.y_max);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'left';
                                        }
                                        break;
                                }
                            } else {
                                switch (currentCube) {
                                    case 'one':
                                        (x = cubes[inputType].six.x_min),
                                            (y =
                                                cubes[inputType].six.y_max - (cubes[inputType].one.x_max - current[1]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'right';
                                        }
                                        break;
                                    case 'two':
                                        (x = cubes[inputType].six.x_max - (cubes[inputType].two.x_max - current[1])),
                                            (y = cubes[inputType].six.y_max);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'up';
                                        }
                                        break;
                                    case 'four':
                                        (x = cubes[inputType].three.x_min),
                                            (y =
                                                cubes[inputType].three.y_max -
                                                (cubes[inputType].four.x_max - current[1]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'right';
                                        }
                                        break;
                                }
                            }
                            break;
                        case 'down':
                            currentCube = findCube(inputType, current[1], current[0]);
                            if (inputType === 'example') {
                                switch (currentCube) {
                                    case 'two':
                                        (x = cubes[inputType].five.x_max - (current[1] - cubes[inputType].two)),
                                            (y = cubes[inputType].five.y_max);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'up';
                                        }
                                        break;
                                    case 'three':
                                        (x = cubes[inputType].five.x_min),
                                            (y =
                                                cubes[inputType].five.y_min +
                                                (cubes[inputType].three.x_max - current[1]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'right';
                                        }
                                        break;
                                    case 'five':
                                        (x = cubes[inputType].two.x_min + (cubes[inputType].five.x_max - current[1])),
                                            (y = cubes[inputType].two.y_max);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'up';
                                        }
                                        break;
                                    case 'six':
                                        (x = cubes[inputType].two.x_min),
                                            (y = cubes[inputType].two.y_min + cubes[inputType].six.x_max - current[1]);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'right';
                                        }
                                        break;
                                }
                            } else {
                                switch (currentCube) {
                                    case 'two':
                                        (x = cubes[inputType].three.x_max),
                                            (y =
                                                cubes[inputType].three.y_max -
                                                (cubes[inputType].two.x_max - current[1]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'left';
                                        }
                                        break;
                                    case 'five':
                                        (x = cubes[inputType].six.x_max),
                                            (y =
                                                cubes[inputType].six.y_max -
                                                (cubes[inputType].five.x_max - current[1]));
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'left';
                                        }
                                        break;
                                    case 'six':
                                        (x = cubes[inputType].two.x_max - (cubes[inputType].six.x_max - current[1])),
                                            (y = cubes[inputType].two.y_min);
                                        if (map.get(toString([y, x])) === '.') {
                                            current = [y, x];
                                            direction = 'down';
                                        }
                                        break;
                                }
                            }
                            break;
                    }
                }
            }
        }
    });
    return 1000 * (current[0] + 1) + 4 * (current[1] + 1) + facing[direction];
};

['example22.txt', 'puzzle22.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').split('\n\n');
    input[0] = input[0].split('\n').map((line) => line.split(''));
    const inputType = { 'example22.txt': 'example', 'puzzle22.txt': 'puzzle' };
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(
        `Result of part two for ${file} : ` +
            partTwo(input, inputType[file]) +
            ` (executed in ${timer(partTwo, input, inputType[file])} ms)`
    );
});
