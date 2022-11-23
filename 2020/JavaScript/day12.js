import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const changeDirection = (facing, directionRotation, valueRotation) => {
    switch (valueRotation) {
        case 90:
            if (directionRotation === 'L') {
                if (facing === 'south') facing = 'east';
                else if (facing === 'north') facing = 'west';
                else if (facing === 'east') facing = 'north';
                else if (facing === 'west') facing = 'south';
                else if (facing === 'northEast') facing = 'northWest';
                else if (facing === 'southEast') facing = 'northEast';
                else if (facing === 'northWest') facing = 'southWest';
                else if (facing === 'southWest') facing = 'southEast';
            } else {
                if (facing === 'south') facing = 'west';
                else if (facing === 'north') facing = 'east';
                else if (facing === 'east') facing = 'south';
                else if (facing === 'west') facing = 'north';
                else if (facing === 'northEast') facing = 'southEast';
                else if (facing === 'southEast') facing = 'southWest';
                else if (facing === 'northWest') facing = 'northEast';
                else if (facing === 'southWest') facing = 'northWest';
            }
            break;
        case 180:
            if (facing === 'south') facing = 'north';
            else if (facing === 'north') facing = 'south';
            else if (facing === 'east') facing = 'west';
            else if (facing === 'west') facing = 'east';
            else if (facing === 'northEast') facing = 'southWest';
            else if (facing === 'southEast') facing = 'northWest';
            else if (facing === 'northWest') facing = 'southEast';
            else if (facing === 'southWest') facing = 'northEast';
            break;
        case 270:
            if (directionRotation === 'L') {
                if (facing === 'south') facing = 'west';
                else if (facing === 'north') facing = 'east';
                else if (facing === 'east') facing = 'south';
                else if (facing === 'west') facing = 'north';
                else if (facing === 'northEast') facing = 'southEast';
                else if (facing === 'southEast') facing = 'southWest';
                else if (facing === 'northWest') facing = 'northEast';
                else if (facing === 'southWest') facing = 'northWest';
            } else {
                if (facing === 'south') facing = 'east';
                else if (facing === 'north') facing = 'west';
                else if (facing === 'east') facing = 'north';
                else if (facing === 'west') facing = 'south';
                else if (facing === 'northEast') facing = 'northWest';
                else if (facing === 'southEast') facing = 'northEast';
                else if (facing === 'northWest') facing = 'southWest';
                else if (facing === 'southWest') facing = 'southEast';
            }
            break;
    }
    return facing;
};

const partOne = (input) => {
    let facing = 'east';
    let vertical = 0;
    let horizontal = 0;
    for (let instruction of input) {
        switch (instruction[0]) {
            case 'N':
                vertical += instruction[1];
                break;
            case 'S':
                vertical -= instruction[1];
                break;
            case 'E':
                horizontal += instruction[1];
                break;
            case 'W':
                horizontal -= instruction[1];
                break;
            case 'L':
                facing = changeDirection(facing, 'L', instruction[1]);
                break;
            case 'R':
                facing = changeDirection(facing, 'R', instruction[1]);
                break;
            case 'F':
                switch (facing) {
                    case 'east':
                        horizontal += instruction[1];
                        break;
                    case 'west':
                        horizontal -= instruction[1];
                        break;
                    case 'north':
                        vertical += instruction[1];
                        break;
                    case 'south':
                        vertical -= instruction[1];
                        break;
                }
                break;
        }
    }
    return Math.abs(vertical) + Math.abs(horizontal);
};

const partTwo = (input) => {
    let facing = 'northEast';
    let newFacing = '';
    let waypoint = [10, 1];
    let vertical = 0;
    let horizontal = 0;
    for (let instruction of input) {
        switch (instruction[0]) {
            case 'N':
                waypoint[1] += instruction[1];
                break;
            case 'S':
                waypoint[1] -= instruction[1];
                break;
            case 'E':
                waypoint[0] += instruction[1];
                break;
            case 'W':
                waypoint[0] -= instruction[1];
                break;
            case 'L':
                newFacing = changeDirection(facing, 'L', instruction[1]);
                if (facing === 'northEast') {
                    if (newFacing === 'northWest') {
                        let stock = waypoint[0];
                        waypoint[0] = -waypoint[1];
                        waypoint[1] = stock;
                    } else if (newFacing === 'southEast') {
                        let stock = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = -stock;
                    } else if (newFacing === 'southWest') {
                        waypoint[0] = -waypoint[0];
                        waypoint[1] = -waypoint[1];
                    }
                } else if (facing === 'northWest') {
                    if (newFacing === 'northEast') {
                        let stock = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = -stock;
                    } else if (newFacing === 'southEast') {
                        waypoint[0] = -waypoint[0];
                        waypoint[1] = -waypoint[1];
                    } else if (newFacing === 'southWest') {
                        let stock = waypoint[0];
                        waypoint[0] = -waypoint[1];
                        waypoint[1] = stock;
                    }
                } else if (facing === 'southEast') {
                    if (newFacing === 'northEast') {
                        let stock = waypoint[0];
                        waypoint[0] = -waypoint[1];
                        waypoint[1] = stock;
                    } else if (newFacing === 'northWest') {
                        waypoint[0] = -waypoint[0];
                        waypoint[1] = -waypoint[1];
                    } else if (newFacing === 'southWest') {
                        let stock = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = -stock;
                    }
                } else if (facing === 'southWest') {
                    if (newFacing === 'northWest') {
                        let stock = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = -stock;
                    } else if (newFacing === 'southEast') {
                        let stock = waypoint[0];
                        waypoint[0] = -waypoint[1];
                        waypoint[1] = stock;
                    } else if (newFacing === 'northEast') {
                        waypoint[0] = -waypoint[0];
                        waypoint[1] = -waypoint[1];
                    }
                }
                facing = newFacing;
                break;
            case 'R':
                newFacing = changeDirection(facing, 'R', instruction[1]);
                if (facing === 'northEast') {
                    if (newFacing === 'northWest') {
                        let stock = waypoint[0];
                        waypoint[0] = -waypoint[1];
                        waypoint[1] = stock;
                    } else if (newFacing === 'southEast') {
                        let stock = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = -stock;
                    } else if (newFacing === 'southWest') {
                        waypoint[0] = -waypoint[0];
                        waypoint[1] = -waypoint[1];
                    }
                } else if (facing === 'northWest') {
                    if (newFacing === 'northEast') {
                        let stock = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = -stock;
                    } else if (newFacing === 'southEast') {
                        waypoint[0] = -waypoint[0];
                        waypoint[1] = -waypoint[1];
                    } else if (newFacing === 'southWest') {
                        let stock = waypoint[0];
                        waypoint[0] = -waypoint[1];
                        waypoint[1] = stock;
                    }
                } else if (facing === 'southEast') {
                    if (newFacing === 'northEast') {
                        let stock = waypoint[0];
                        waypoint[0] = -waypoint[1];
                        waypoint[1] = stock;
                    } else if (newFacing === 'northWest') {
                        waypoint[0] = -waypoint[0];
                        waypoint[1] = -waypoint[1];
                    } else if (newFacing === 'southWest') {
                        let stock = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = -stock;
                    }
                } else if (facing === 'southWest') {
                    if (newFacing === 'northWest') {
                        let stock = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = -stock;
                    } else if (newFacing === 'southEast') {
                        let stock = waypoint[0];
                        waypoint[0] = -waypoint[1];
                        waypoint[1] = stock;
                    } else if (newFacing === 'northEast') {
                        waypoint[0] = -waypoint[0];
                        waypoint[1] = -waypoint[1];
                    }
                }
                facing = newFacing;
                break;
            case 'F':
                vertical += waypoint[1] * instruction[1];
                horizontal += waypoint[0] * instruction[1];
                break;
        }
    }
    return Math.abs(vertical) + Math.abs(horizontal);
};

['example12.txt', 'puzzle12.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((instruction) => [instruction[0], Number(instruction.slice(1))]);
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
