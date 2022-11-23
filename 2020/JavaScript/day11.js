import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const countOccupiedSeat = (input) => {
    return input.flat(1).filter((x) => x === '#').length;
};

const seatVisibleIsOccupied = (input, direction, i, j, isAdjacent) => {
    switch (direction) {
        case 'north':
            i = i - 1;
            if (isAdjacent) {
                if (input[i][j] === '#') return true;
                else return false;
            }
            while (input[i][j] === '.' && 0 < i && i <= input.length - 1 && 0 <= j && j <= input[0].length - 1) {
                i = i - 1;
            }
            if (input[i][j] === '#') return true;
            else return false;
        case 'south':
            i = i + 1;
            if (isAdjacent) {
                if (input[i][j] === '#') return true;
                else return false;
            }
            while (input[i][j] === '.' && 0 <= i && i < input.length - 1 && 0 <= j && j <= input[0].length - 1) {
                i = i + 1;
            }
            if (input[i][j] === '#') return true;
            else return false;
        case 'east':
            j = j + 1;
            if (isAdjacent) {
                if (input[i][j] === '#') return true;
                else return false;
            }
            while (input[i][j] === '.' && 0 <= i && i <= input.length - 1 && 0 <= j && j < input[0].length - 1) {
                j = j + 1;
            }
            if (input[i][j] === '#') return true;
            else return false;
        case 'west':
            j = j - 1;
            if (isAdjacent) {
                if (input[i][j] === '#') return true;
                else return false;
            }
            while (input[i][j] === '.' && 0 <= i && i <= input.length - 1 && 0 < j && j <= input[0].length - 1) {
                j = j - 1;
            }
            if (input[i][j] === '#') return true;
            else return false;
        case 'northWest':
            i = i - 1;
            j = j - 1;
            if (isAdjacent) {
                if (input[i][j] === '#') return true;
                else return false;
            }
            while (input[i][j] === '.' && 0 < i && i <= input.length - 1 && 0 < j && j <= input[0].length - 1) {
                i = i - 1;
                j = j - 1;
            }
            if (input[i][j] === '#') return true;
            else return false;
        case 'northEast':
            i = i - 1;
            j = j + 1;
            if (isAdjacent) {
                if (input[i][j] === '#') return true;
                else return false;
            }
            while (input[i][j] === '.' && 0 < i && i <= input.length - 1 && 0 <= j && j < input[0].length - 1) {
                i = i - 1;
                j = j + 1;
            }
            if (input[i][j] === '#') return true;
            else return false;
        case 'southWest':
            i = i + 1;
            j = j - 1;
            if (isAdjacent) {
                if (input[i][j] === '#') return true;
                else return false;
            }
            while (input[i][j] === '.' && 0 <= i && i < input.length - 1 && 0 < j && j <= input[0].length - 1) {
                i = i + 1;
                j = j - 1;
            }
            if (input[i][j] === '#') return true;
            else return false;
        case 'southEast':
            i = i + 1;
            j = j + 1;
            if (isAdjacent) {
                if (input[i][j] === '#') return true;
                else return false;
            }
            while (input[i][j] === '.' && 0 <= i && i < input.length - 1 && 0 <= j && j < input[0].length - 1) {
                i = i + 1;
                j = j + 1;
            }
            if (input[i][j] === '#') return true;
            else return false;
    }
};

const findOccupied = (input, i, j, isAdjacent) => {
    let result = 0;
    if (i === 0) {
        if (j === 0) {
            if (seatVisibleIsOccupied(input, 'east', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'south', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'southEast', i, j, isAdjacent)) result++;
        } else if (j === input[0].length - 1) {
            if (seatVisibleIsOccupied(input, 'west', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'south', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'southWest', i, j, isAdjacent)) result++;
        } else {
            if (seatVisibleIsOccupied(input, 'west', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'east', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'south', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'southEast', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'southWest', i, j, isAdjacent)) result++;
        }
    } else if (i === input.length - 1) {
        if (j === 0) {
            if (seatVisibleIsOccupied(input, 'north', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'east', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'northEast', i, j, isAdjacent)) result++;
        } else if (j === input[0].length - 1) {
            if (seatVisibleIsOccupied(input, 'north', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'west', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'northWest', i, j, isAdjacent)) result++;
        } else {
            if (seatVisibleIsOccupied(input, 'west', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'east', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'north', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'northEast', i, j, isAdjacent)) result++;
            if (seatVisibleIsOccupied(input, 'northWest', i, j, isAdjacent)) result++;
        }
    } else if (j === 0 && i > 0) {
        if (seatVisibleIsOccupied(input, 'north', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'east', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'south', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'northEast', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'southEast', i, j, isAdjacent)) result++;
    } else if (j === input[0].length - 1 && i > 0) {
        if (seatVisibleIsOccupied(input, 'north', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'west', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'south', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'northWest', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'southWest', i, j, isAdjacent)) result++;
    } else {
        if (seatVisibleIsOccupied(input, 'west', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'east', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'north', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'northEast', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'northWest', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'south', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'southEast', i, j, isAdjacent)) result++;
        if (seatVisibleIsOccupied(input, 'southWest', i, j, isAdjacent)) result++;
    }
    return result;
};

const updateSeat = (input, isAdjacent) => {
    const inputUpdated = [];
    for (let list of input) {
        let listUpdated = [];
        for (let element of list) {
            listUpdated.push(element);
        }
        inputUpdated.push(listUpdated);
    }
    let min = 5;
    if (isAdjacent) min = 4;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (input[i][j] == '.') inputUpdated[i][j] = '.';
            if (findOccupied(input, i, j, isAdjacent) === 0 && input[i][j] === 'L') inputUpdated[i][j] = '#';
            else if (findOccupied(input, i, j, isAdjacent) >= min && input[i][j] === '#') inputUpdated[i][j] = 'L';
            else inputUpdated[i][j] = input[i][j];
        }
    }
    return inputUpdated;
};

const partOne = (input) => {
    let inputUpdated = updateSeat(input, true);
    while (input.toString() !== inputUpdated.toString()) {
        input = inputUpdated;
        inputUpdated = updateSeat(input, true);
    }
    return countOccupiedSeat(input);
};

const partTwo = (input) => {
    let inputUpdated = updateSeat(input, false);
    while (input.toString() !== inputUpdated.toString()) {
        input = inputUpdated;
        inputUpdated = updateSeat(input, false);
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
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
