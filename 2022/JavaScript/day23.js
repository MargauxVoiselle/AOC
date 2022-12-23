import * as fs from 'fs';

const timer = (script, input, round) => {
    let start = performance.now();
    script(input, round);
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

const dirs = new Map([
    ['north', { x: 0, y: -1 }],
    ['northEast', { x: 1, y: -1 }],
    ['east', { x: 1, y: 0 }],
    ['southEast', { x: 1, y: 1 }],
    ['south', { x: 0, y: 1 }],
    ['southWest', { x: -1, y: 1 }],
    ['west', { x: -1, y: 0 }],
    ['northWest', { x: -1, y: -1 }],
]);
const north = new Set(['north', 'northEast', 'northWest']);
const south = new Set(['south', 'southEast', 'southWest']);
const west = new Set(['west', 'northWest', 'southWest']);
const east = new Set(['east', 'northEast', 'southEast']);
const check = [
    ['north', north],
    ['south', south],
    ['west', west],
    ['east', east],
];

const parse = (input) => {
    const elves = new Set();
    input.forEach((line, y) => {
        line.forEach((element, x) => {
            if (element === '#') {
                elves.add(toString([y, x]));
            }
        });
    });
    return elves;
};

const findExtremum = (elves) => {
    let x_min = 100,
        x_max = 0,
        y_min = 100,
        y_max = 0;
    elves.forEach((coords) => {
        let elf = toNumber(coords);
        (x_min = Math.min(x_min, elf[1])),
            (x_max = Math.max(x_max, elf[1])),
            (y_min = Math.min(y_min, elf[0], (y_max = Math.max(y_max, elf[0]))));
    });
    return [x_min, x_max, y_min, y_max];
};

const calculateGround = (elves) => {
    const [x_min, x_max, y_min, y_max] = findExtremum(elves);
    let result = 0;
    for (let y = y_min; y <= y_max; y++) {
        for (let x = x_min; x <= x_max; x++) {
            if (!elves.has(toString([y, x]))) result++;
        }
    }
    return result;
};

const contain = (container, content) => {
    let result = true;
    content.forEach((element) => {
        if (!container.includes(element)) result = false;
    });
    return result;
};

const solveParts = (input, part, round) => {
    const elves = parse(input);
    let count = 0,
        found = false;
    while ((count < round && part === 1) || (!found && part === 2)) {
        // First part of the round (observe). List proposal = [[initialPos, finalPos]]
        const proposal = [];
        const destination = [];
        elves.forEach((coords) => {
            let elf = toNumber(coords);
            const free = [];
            for (const [direction, value] of dirs) {
                if (!elves.has(toString([elf[0] + value.y, elf[1] + value.x]))) {
                    free.push(direction);
                }
            }
            if (free.length === 8) return;
            let next;
            if (contain(free, check[0][1])) {
                next = [elf[0] + dirs.get(check[0][0]).y, elf[1] + dirs.get(check[0][0]).x];
                proposal.push([elf, next]);
                destination.push(toString(next));
                return;
            }
            if (contain(free, check[1][1])) {
                next = [elf[0] + dirs.get(check[1][0]).y, elf[1] + dirs.get(check[1][0]).x];
                proposal.push([elf, next]);
                destination.push(toString(next));
                return;
            }
            if (contain(free, check[2][1])) {
                next = [elf[0] + dirs.get(check[2][0]).y, elf[1] + dirs.get(check[2][0]).x];
                proposal.push([elf, next]);
                destination.push(toString(next));
                return;
            }
            if (contain(free, check[3][1])) {
                next = [elf[0] + dirs.get(check[3][0]).y, elf[1] + dirs.get(check[3][0]).x];
                proposal.push([elf, next]);
                destination.push(toString(next));
                return;
            }
        });
        // Second part of the round (move or not)
        const duplicates = destination.filter((dest, index) => destination.indexOf(dest) !== index);
        found = true;
        for (let [initialPos, finalPos] of proposal) {
            if (!duplicates.includes(toString(finalPos))) {
                found = false;
                elves.delete(toString(initialPos));
                elves.add(toString(finalPos));
            }
        }
        // Change order
        let direction = check.shift();
        check.push(direction);
        count++;
    }
    if (part === 1) return calculateGround(elves);
    else return count;
};

['example23.txt', 'puzzle23.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .split('\n')
        .map((line) => line.split(''));
    console.log(
        `Result of part one for ${file} : ` +
            solveParts(input, 1, 10) +
            ` (executed in ${timer(solveParts, input, 1, 10)} ms)`
    );
    console.log(
        `Result of part one for ${file} : ` + solveParts(input, 2) + ` (executed in ${timer(solveParts, input, 2)} ms)`
    );
});
