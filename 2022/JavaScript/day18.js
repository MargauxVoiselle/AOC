import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const dirs = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
];

class LavaCube {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    display() {
        return this.x + ',' + this.y + ',' + this.z;
    }
}

const parse = (input) => {
    const map = new Set();
    for (let lavaCube of input) {
        map.add(lavaCube.display());
    }
    return map;
};

const findExtremum = (input) => {
    let max_x = 0,
        min_x = 100,
        max_y = 0,
        min_y = 100,
        max_z = 0,
        min_z = 100;
    for (let lavaCube of input) {
        max_x = Math.max(max_x, lavaCube.x);
        max_y = Math.max(max_y, lavaCube.y);
        max_z = Math.max(max_z, lavaCube.z);
        min_x = Math.min(min_x, lavaCube.x);
        min_y = Math.min(min_y, lavaCube.y);
        min_z = Math.min(min_z, lavaCube.z);
    }
    return [min_x - 1, min_y - 1, min_z - 1, max_x + 1, max_y + 1, max_z + 1];
};

const partOne = (input) => {
    const map = parse(input);
    let result = 0;
    for (let lavaCube of input) {
        result += 6;
        for (let dir of dirs) {
            if (map.has(new LavaCube(lavaCube.x + dir[0], lavaCube.y + dir[1], lavaCube.z + dir[2]).display()))
                result--;
        }
    }
    return result;
};

const isValid = (neighbor, map, min_x, min_y, min_z, max_x, max_y, max_z) => {
    if (map.has(neighbor.display())) return false;
    if (neighbor.x < min_x || neighbor.x > max_x) return false;
    if (neighbor.y < min_y || neighbor.y > max_y) return false;
    if (neighbor.z < min_z || neighbor.z > max_z) return false;
    return true;
};

const BFS = (lavaCube, map, min_x, min_y, min_z, max_x, max_y, max_z) => {
    const visited = new Set().add(lavaCube.display());
    const result = new Set().add(lavaCube);
    const queue = [lavaCube];
    while (queue.length != 0) {
        let current = queue.shift();
        for (let dir of dirs) {
            let neighbor = new LavaCube(current.x + dir[0], current.y + dir[1], current.z + dir[2]);
            if (!visited.has(neighbor.display()) && isValid(neighbor, map, min_x, min_y, min_z, max_x, max_y, max_z)) {
                visited.add(neighbor.display());
                result.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
};

const partTwo = (input) => {
    const [min_x, min_y, min_z, max_x, max_y, max_z] = findExtremum(input);
    const x_range = max_x - min_x + 1,
        y_range = max_y - min_y + 1,
        z_range = max_z - min_z + 1;
    const boxSurface = 2 * (x_range * y_range + z_range * y_range + x_range * z_range);
    const map = parse(input);
    const start = new LavaCube(min_x, min_y, min_z);
    return partOne(BFS(start, map, min_x, min_y, min_z, max_x, max_y, max_z)) - boxSurface;
};

['example18.txt', 'puzzle18.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .split('\n')
        .map((coords) => coords.split(',').map((coord) => Number(coord)))
        .map((coords) => new LavaCube(coords[0], coords[1], coords[2]));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});
