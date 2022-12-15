import * as fs from 'fs';

const timer = (script, input, param) => {
    let start = performance.now();
    script(input, param);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const parse = (input) => {
    const data = new Set();
    for (const pairs of input) {
        data.add({
            sensor: { x: pairs[0][0], y: pairs[0][1] },
            beacon: { x: pairs[1][0], y: pairs[1][1] },
            dist: distanceManhattan({ x: pairs[0][0], y: pairs[0][1] }, { x: pairs[1][0], y: pairs[1][1] }),
        });
    }
    return data;
};

const distanceManhattan = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const partOne = (input, ord) => {
    const data = parse(input);
    let noBeaconsPositions = new Set();
    let beaconsPositions = new Set();
    for (const { sensor, beacon, dist } of data) {
        if (beacon.y === ord) {
            beaconsPositions.add(beacon.x);
        }
        const minDistance = distanceManhattan(sensor, { x: sensor.x, y: ord });
        if (minDistance <= dist) {
            const extraDist = dist - minDistance;
            for (let x = sensor.x - extraDist; x <= sensor.x + extraDist; x++) {
                noBeaconsPositions.add(x);
            }
        }
    }
    return noBeaconsPositions.size - beaconsPositions.size;
};

const manhattanCircle = (center, radius) => {
    let circles = [];
    for (let i = 0; i < radius; i++) {
        circles.push({ x: center.x - radius + i, y: center.y + i });
        circles.push({ x: center.x - i, y: center.y - radius + i });
        circles.push({ x: center.x + radius - i, y: center.y - i });
        circles.push({ x: center.x + i, y: center.y + radius - i });
    }
    return circles;
};

const partTwo = (input, maxCoordinate) => {
    const data = parse(input);
    for (const { sensor, dist } of data) {
        let circles = manhattanCircle(sensor, dist + 1);
        for (const point of circles) {
            if (point.x > maxCoordinate || point.y > maxCoordinate || point.x < 0 || point.y < 0) continue;
            let count = 0;
            for (const { sensor, dist } of data) {
                let distance = distanceManhattan(point, sensor);
                if (distance > dist) count++;
            }
            if (count === data.size) return point.x * 4000000 + point.y;
        }
    }
};

['example15.txt', 'puzzle15.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .split('\n')
        .map((line) => {
            let parsedLine;
            parsedLine = line
                .replace('Sensor at x=', '')
                .replace(' y=', '')
                .replace(' closest beacon is at x=', '')
                .replace(' y=', '');
            return parsedLine;
        })
        .map((line) => line.split(':'))
        .map((line) => line.map((coords) => coords.split(',').map((coord) => Number(coord))));
    const ord = { 'example15.txt': 10, 'puzzle15.txt': 2000000 };
    const maxCoordinate = { 'example15.txt': 20, 'puzzle15.txt': 4000000 };
    console.log(
        `Result of part one for ${file} : ` +
            partOne(input, ord[file]) +
            ` (executed in ${timer(partOne, input, ord[file])} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` +
            partTwo(input, maxCoordinate[file]) +
            ` (executed in ${timer(partTwo, input, maxCoordinate[file])} ms)`
    );
});
